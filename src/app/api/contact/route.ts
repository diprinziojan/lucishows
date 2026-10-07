import { Resend } from 'resend';
import { NextResponse } from 'next/server';


type AgencyPayload = {
  formType: 'agency';
  company: string;
  contact: string;
  email: string;
  sector?: string;
  services: string[];
  budget?: string;
  message?: string;
};

type InfluencerPayload = {
  formType: 'influencer';
  brand: string;
  contact: string;
  email: string;
  collabType: string[];
  platform?: string;
  budget?: string;
  message?: string;
};

type ProposalPayload = {
  formType: 'proposal';
  fullName: string;
  email: string;
  phone: string;
  website?: string;
  budget?: string;
  project?: string;
  locale?: string;
};

type ContactPayload = AgencyPayload | InfluencerPayload | ProposalPayload;

function buildAgencyHtml(data: AgencyPayload): string {
  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #ffffff; border-radius: 12px;">
      <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 24px; border-bottom: 2px solid #f0f0f0; padding-bottom: 16px;">
        Nueva solicitud de agencia
      </h1>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px; width: 140px;">Empresa</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${data.company}</td></tr>
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Contacto</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${data.contact}</td></tr>
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Email</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;"><a href="mailto:${data.email}" style="color: #e84d8a;">${data.email}</a></td></tr>
        ${data.sector ? `<tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Sector</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${data.sector}</td></tr>` : ''}
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Servicios</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${data.services.join(', ')}</td></tr>
        ${data.budget ? `<tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Presupuesto</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${data.budget}</td></tr>` : ''}
      </table>
      ${data.message ? `<div style="margin-top: 20px; padding: 16px; background: #f9f9f9; border-radius: 8px;"><p style="color: #666; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</p><p style="color: #1a1a1a; font-size: 14px; margin: 0; line-height: 1.6;">${data.message}</p></div>` : ''}
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
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px; width: 140px;">Marca</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${data.brand}</td></tr>
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Contacto</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${data.contact}</td></tr>
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Email</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;"><a href="mailto:${data.email}" style="color: #e84d8a;">${data.email}</a></td></tr>
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Tipo de collab</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${data.collabType.join(', ')}</td></tr>
        ${data.platform ? `<tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Plataforma</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${data.platform}</td></tr>` : ''}
        ${data.budget ? `<tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Presupuesto</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${data.budget}</td></tr>` : ''}
      </table>
      ${data.message ? `<div style="margin-top: 20px; padding: 16px; background: #f9f9f9; border-radius: 8px;"><p style="color: #666; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</p><p style="color: #1a1a1a; font-size: 14px; margin: 0; line-height: 1.6;">${data.message}</p></div>` : ''}
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
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px; width: 140px;">Nombre</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${data.fullName}</td></tr>
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Email</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;"><a href="mailto:${data.email}" style="color: #e84d8a;">${data.email}</a></td></tr>
        <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Teléfono</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;"><a href="tel:${data.phone}" style="color: #e84d8a;">${data.phone}</a></td></tr>
        ${data.website ? `<tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Web</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;"><a href="${data.website}" style="color: #e84d8a;">${data.website}</a></td></tr>` : ''}
        ${data.budget ? `<tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Presupuesto</td><td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${data.budget}</td></tr>` : ''}
      </table>
      ${data.project ? `<div style="margin-top: 20px; padding: 16px; background: #f9f9f9; border-radius: 8px;"><p style="color: #666; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Sobre el proyecto</p><p style="color: #1a1a1a; font-size: 14px; margin: 0; line-height: 1.6;">${data.project}</p></div>` : ''}
    </div>
  `;
}

function buildConfirmationHtml(name: string, locale: string): string {
  const isEs = locale === 'es';
  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #ffffff; border-radius: 12px;">
      <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 16px;">
        ${isEs ? `¡Muchas gracias, ${name}!` : `Thank you so much, ${name}!`}
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
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Contact service is not configured' },
        { status: 503 }
      );
    }
    const resend = new Resend(apiKey);
    const body: ContactPayload = await request.json();

    let subject: string;
    let html: string;

    if (body.formType === 'proposal') {
      const data = body as ProposalPayload;
      subject = `Nueva solicitud de propuesta — ${data.fullName}`;
      html = buildProposalHtml(data);
    } else if (body.formType === 'agency') {
      subject = `Nueva solicitud de agencia — ${(body as AgencyPayload).company}`;
      html = buildAgencyHtml(body as AgencyPayload);
    } else {
      subject = `Nueva solicitud de colaboración — ${(body as InfluencerPayload).brand}`;
      html = buildInfluencerHtml(body as InfluencerPayload);
    }

    const { error } = await resend.emails.send({
      from: 'Luciana Web <onboarding@resend.dev>',
      to: 'pedroansiofuentes@gmail.com',
      replyTo: body.email,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send confirmation email to user (proposal form only)
    if (body.formType === 'proposal') {
      const data = body as ProposalPayload;
      const locale = data.locale || 'es';
      const confirmSubject = locale === 'es'
        ? '¡Gracias por tu solicitud! — Luciana López'
        : 'Thank you for your request! — Luciana López';

      await resend.emails.send({
        from: 'Luciana López <onboarding@resend.dev>',
        to: data.email,
        replyTo: 'management@lucishows.com',
        subject: confirmSubject,
        html: buildConfirmationHtml(data.fullName, locale),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    );
  }
}
