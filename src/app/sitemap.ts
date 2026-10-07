import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/proposal', '/privacy', '/terms', '/cookies'];
  return paths.flatMap(path => ['es', 'en'].map(locale => ({
    url: `https://lucianalopez.es/${locale}${path}`,
    alternates: { languages: { es: `https://lucianalopez.es/es${path}`, en: `https://lucianalopez.es/en${path}` } },
  })));
}
