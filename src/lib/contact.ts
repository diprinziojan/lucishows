export const CONTACT_EMAIL = 'lucianalopezfb@gmail.com';

export function contactEmailDraft(subject: string, fields: [string, string][]) {
  const body = fields.filter(([, value]) => value.trim()).map(([label, value]) => `${label}: ${value}`).join('\n\n');
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function submitContactForm(payload: Record<string, unknown>) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok || result.success !== true) throw new Error('Contact request not delivered');
}
