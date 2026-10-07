import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata(locale, '/proposal', 'proposal');
}

export default function ProposalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
