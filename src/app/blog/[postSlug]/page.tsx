import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BlogFooter from '@/components/blog/BlogFooter';
import ArticleReaderClient from '@/components/blog/ArticleReaderClient';
import MdxBody from '@/components/blog/MdxBody';
import ScrollReveal from '@/components/ScrollReveal';
import { getArticle, getBlogContent } from '@/lib/blog';
import { articleJsonLd, contentMetadata, serializeJsonLd } from '@/lib/blog-seo';

export const revalidate = 60;
interface Props { params: Promise<{ postSlug: string }> }
export async function generateStaticParams() { return (await getBlogContent()).articles.map(article => ({ postSlug: article.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getArticle((await params).postSlug);
  if (!data) notFound();
  return contentMetadata(data.article, data.article.description, `/blog/${data.article.slug}`);
}
export default async function ArticlePage({ params }: Props) {
  const data = await getArticle((await params).postSlug);
  if (!data) notFound();
  const { article, body, previousArticle, nextArticle } = data;
  return <>
    <Navbar />
    <main id="main-content" className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd(article, article.description, `/blog/${article.slug}`)) }} />
      <ArticleReaderClient article={article} previousArticle={previousArticle} nextArticle={nextArticle}>
        <MdxBody source={body} />
      </ArticleReaderClient>
    </main>
    <BlogFooter /><ScrollReveal />
  </>;
}
