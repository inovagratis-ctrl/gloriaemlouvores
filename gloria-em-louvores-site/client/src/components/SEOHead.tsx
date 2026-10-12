import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { isNoIndexForPath } from '@/lib/analytics';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  forceNoIndex?: boolean;
}

const SITE_URL = 'https://gloriaemlouvores.com.br';

export default function SEOHead({
  title,
  description,
  keywords,
  canonicalPath,
  ogType = 'website',
  ogImage = '/images/GL%C3%93RIA_EM_LOUVORES-LOGO.png',
  publishedTime,
  modifiedTime,
  authorName = 'Equipe Editorial Glória em Louvores',
  breadcrumbs,
  faqs,
  forceNoIndex = false,
}: SEOHeadProps) {
  const [location] = useLocation();
  const currentPath = canonicalPath || location || '/';
  const fullUrl = `${SITE_URL}${currentPath === '/' ? '/' : currentPath}`;
  const shouldNoIndex = forceNoIndex || isNoIndexForPath(currentPath);

  useEffect(() => {
    document.title = title.includes('Glória em Louvores') ? title : `${title} | Glória em Louvores`;

    const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    if (keywords) {
      setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    const robotsValue = shouldNoIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    setMeta('meta[name="robots"]', 'name', 'robots', robotsValue);
    setMeta('meta[name="googlebot"]', 'name', 'googlebot', shouldNoIndex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', fullUrl);
    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`);

    // Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', fullUrl);

    // Build Dynamic JSON-LD Graph
    const graph: Record<string, unknown>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Glória em Louvores',
        url: SITE_URL,
        logo: `${SITE_URL}/images/GL%C3%93RIA_EM_LOUVORES-LOGO.png`,
        description:
          'Portal cristão de utilidade prática para oração, devocionais diários, estudos bíblicos contextualizados, plano de leitura bíblica e recursos gratuitos para famílias e igrejas locais.',
        sameAs: ['https://www.youtube.com/@gloriaemlouvores'],
      },
    ];

    if (breadcrumbs && breadcrumbs.length > 0) {
      graph.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: `${SITE_URL}${b.path}`,
        })),
      });
    }

    if (ogType === 'article') {
      graph.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image: ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`,
        datePublished: publishedTime || '2026-10-12',
        dateModified: modifiedTime || publishedTime || '2026-10-12',
        author: {
          '@type': 'Person',
          name: authorName,
          url: `${SITE_URL}/sobre`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Glória em Louvores',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/images/GL%C3%93RIA_EM_LOUVORES-LOGO.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl,
        },
      });
    }

    if (faqs && faqs.length > 0) {
      graph.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }

    let ldScript = document.getElementById('gloria-dynamic-jsonld') as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.id = 'gloria-dynamic-jsonld';
      ldScript.type = 'application/ld+json';
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify(graph);
  }, [title, description, keywords, fullUrl, ogType, ogImage, publishedTime, modifiedTime, authorName, breadcrumbs, faqs, shouldNoIndex]);

  return null;
}
