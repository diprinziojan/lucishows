import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import messages from '@/messages/es.json';


const optionalText = (max: number) => z.string().trim().max(max).optional();
const choice = (values: [string, ...string[]]) => z.enum(values).or(z.literal('')).optional();
const shared = {
  email: z.string().trim().email().max(254),
  locale: z.enum(['es', 'en']).optional(),
  websiteTrap: z.string().max(200).optional(),
};
const contactSchema = z.discriminatedUnion('formType', [
  z.object({ ...shared, formType: z.literal('agency'),
    company: z.string().trim().min(1).max(180), contact: z.string().trim().min(1).max(180),
    sector: optionalText(180), message: optionalText(5000),
    services: z.array(z.enum(['social_media', 'paid_ads', 'seo', 'web_design', 'email_mkt', 'full_service'])).max(6).default([]),
    budget: choice(['under_1000', '1000_3000', '3000_5000', '5000_plus', 'not_sure']),
  }),
  z.object({ ...shared, formType: z.literal('influencer'),
    brand: z.string().trim().min(1).max(180), contact: z.string().trim().min(1).max(180),
    message: optionalText(5000),
    collabType: z.array(z.enum(['feed_post', 'stories', 'reel', 'ugc', 'full_pack'])).max(5).default([]),
    platform: choice(['instagram', 'tiktok', 'facebook', 'multi']),
    budget: choice(['under_500', '500_1000', '1000_3000', '3000_plus', 'not_sure']),
  }),
  z.object({ ...shared, formType: z.literal('proposal'),
    fullName: z.string().trim().min(1).max(180),
    phone: z.string().trim().regex(/^[+\d\s().-]{3,40}$/),
    website: z.string().trim().max(2048).refine(value => !value || /^https?:\/\//i.test(value) && URL.canParse(value)).optional(),
    budget: choice(['under_500', '500_1000', '1000_3000', '3000_5000', '5000_plus', 'not_sure']),
    project: z.string().trim().min(1).max(5000),
  }),
]);
type ContactPayload = z.infer<typeof contactSchema>;
type AgencyPayload = Extract<ContactPayload, { formType: 'agency' }>;
type InfluencerPayload = Extract<ContactPayload, { formType: 'influencer' }>;
type ProposalPayload = Extract<ContactPayload, { formType: 'proposal' }>;
const CONTACT_RECIPIENT = 'lucianalopezfb@gmail.com';

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}
function optionLabel(options: Record<string, string>, value?: string): string {
  return escapeHtml(value ? options[value] ?? value : '');
}

function buildAgencyHtml(data: AgencyPayload): string {
  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #ffffff; border-radius: 12px;">
      <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 24px; border-bottom: 2px solid #f0f0f0; padding-bottom: 16px;">
        Nueva solicitud de agencia
      </h1>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px; width: 140px;">Empresa</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${escapeHtml(data.company)}</td></tr>
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Contacto</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${escapeHtml(data.contact)}</td></tr>
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Email</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;"><a href="mailto:${escapeHtml(data.email)}" style="color: #e84d8a;">${escapeHtml(data.email)}</a></td></tr>
        ${data.sector ? `<tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Sector</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${escapeHtml(data.sector)}</td></tr>` : ''}
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Servicios</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${data.services.map(value => optionLabel(messages.contactForms.agency.service_options, value)).join(', ')}</td></tr>
        ${data.budget ? `<tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Presupuesto</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${optionLabel(messages.contactForms.agency.budget_options, data.budget)}</td></tr>` : ''}
      </table>
      ${data.message ? `<div style="margin-top: 20px; padding: 16px; background: #f9f9f9; border-radius: 8px;"><p style="color: #666; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</p><p style="color: #1a1a1a; font-size: 14px; margin: 0; line-height: 1.6;">${escapeHtml(data.message)}</p></div>` : ''}
    </div>
  `;
}

function buildInfluencerHtml(data: InfluencerPayload): string {
  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #ffffff; border-radius: 12px;">
      <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 24px; border-bottom: 2px solid #f0f0f0; padding-bottom: 16px;">
        Nueva solicitud de colaboración
      </h1>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px; width: 140px;">Marca</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${escapeHtml(data.brand)}</td></tr>
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Contacto</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${escapeHtml(data.contact)}</td></tr>
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Email</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;"><a href="mailto:${escapeHtml(data.email)}" style="color: #e84d8a;">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Tipo de colaboración</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${data.collabType.map(value => optionLabel(messages.contactForms.influencer.collab_options, value)).join(', ')}</td></tr>
        ${data.platform ? `<tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Plataforma</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${optionLabel(messages.contactForms.influencer.platform_options, data.platform)}</td></tr>` : ''}
        ${data.budget ? `<tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Presupuesto</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${optionLabel(messages.contactForms.influencer.budget_options, data.budget)}</td></tr>` : ''}
      </table>
      ${data.message ? `<div style="margin-top: 20px; padding: 16px; background: #f9f9f9; border-radius: 8px;"><p style="color: #666; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</p><p style="color: #1a1a1a; font-size: 14px; margin: 0; line-height: 1.6;">${escapeHtml(data.message)}</p></div>` : ''}
    </div>
  `;
}

function buildProposalHtml(data: ProposalPayload): string {
  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #ffffff; border-radius: 12px;">
      <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 24px; border-bottom: 2px solid #f0f0f0; padding-bottom: 16px;">
        Nueva solicitud de propuesta
      </h1>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px; width: 140px;">Nombre</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${escapeHtml(data.fullName)}</td></tr>
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Email</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;"><a href="mailto:${escapeHtml(data.email)}" style="color: #e84d8a;">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Teléfono</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;"><a href="tel:${escapeHtml(data.phone)}" style="color: #e84d8a;">${escapeHtml(data.phone)}</a></td></tr>
        ${data.website ? `<tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Web</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;"><a href="${escapeHtml(data.website)}" style="color: #e84d8a;">${escapeHtml(data.website)}</a></td></tr>` : ''}
        ${data.budget ? `<tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Presupuesto</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${optionLabel(messages.proposal.budget_options, data.budget)}</td></tr>` : ''}
      </table>
      ${data.project ? `<div style="margin-top: 20px; padding: 16px; background: #f9f9f9; border-radius: 8px;"><p style="color: #666; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Sobre el proyecto</p><p style="color: #1a1a1a; font-size: 14px; margin: 0; line-height: 1.6;">${escapeHtml(data.project)}</p></div>` : ''}
    </div>
  `;
}

function buildConfirmationHtml(name: string, locale: string): string {
  const isEs = locale === 'es';
  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #ffffff; border-radius: 12px;">
      <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 16px;">
        ${isEs ? `¡Muchas gracias, ${escapeHtml(name)}!` : `Thank you so much, ${escapeHtml(name)}!`}
      </h1>
      <p style="color: #444; font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
        ${isEs
          ? 'Hemos recibido tu solicitud correctamente. Nuestro equipo la revisará y nos pondremos en contacto contigo a la mayor brevedad posible llamándote al teléfono que nos has indicado.'
          : 'We have received your request successfully. Our team will review it and we will get in touch with you as soon as possible by calling the phone number you provided.'}
      </p>
      <p style="color: #444; font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
        ${isEs
          ? 'Si mientras tanto tienes alguna duda, no dudes en respondernos a este correo.'
          : 'In the meantime, if you have any questions, feel free to reply to this email.'}
      </p>
      <p style="color: #444; font-size: 15px; line-height: 1.7;">
        ${isEs ? 'Un saludo,' : 'Best regards,'}<br/>
        <strong>Luciana López</strong>
      </p>
    </div>
  `;
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    const content = await request.text();
    if (new TextEncoder().encode(content).length > 16000) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }
    raw = JSON.parse(content);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  // The hidden field catches simple automated submissions without sending mail.
  if (raw && typeof raw === 'object' && 'websiteTrap' in raw && typeof raw.websiteTrap === 'string' && raw.websiteTrap.trim()) {
    return NextResponse.json({ success: true });
  }
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid form fields' }, { status: 400 });
  }
  const body = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Contact service is not configured' }, { status: 503 });
  }
  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM_EMAIL || 'Luciana Web <onboarding@resend.dev>';
  const subject = body.formType === 'proposal'
    ? `Nueva solicitud de propuesta — ${body.fullName}`
    : body.formType === 'agency'
      ? `Nueva solicitud de agencia — ${body.company}`
      : `Nueva solicitud de colaboración — ${body.brand}`;
  const html = body.formType === 'proposal' ? buildProposalHtml(body)
    : body.formType === 'agency' ? buildAgencyHtml(body) : buildInfluencerHtml(body);

  try {
    const { error } = await resend.emails.send({
      from,
      to: CONTACT_RECIPIENT,
      replyTo: body.email,
      subject: subject.replace(/[\r\n]/g, ' '),
      html,
    });
    if (error) {
      console.error('Contact email delivery failed:', error.name);
      return NextResponse.json({ error: 'Unable to send request' }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: 'Unable to send request' }, { status: 502 });
  }

  // A production sender must be verified in Resend before emailing visitors.
  // Confirmation is optional: its failure must not report a delivered lead as lost.
  if (body.formType === 'proposal' && process.env.CONTACT_FROM_EMAIL) {
    try {
      const locale = body.locale || 'es';
      const { error } = await resend.emails.send({
        from,
        to: body.email,
        replyTo: CONTACT_RECIPIENT,
        subject: locale === 'es' ? '¡Gracias por tu solicitud! — Luciana López' : 'Thank you for your request! — Luciana López',
        html: buildConfirmationHtml(body.fullName, locale),
      });
      if (error) console.error('Proposal confirmation delivery failed:', error.name);
    } catch {
      console.error('Proposal confirmation delivery failed');
    }
  }
  return NextResponse.json({ success: true });
}
