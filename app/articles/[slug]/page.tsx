import { notFound } from "next/navigation";
import { sampleArticles } from "@/data/sample-articles";
import Navigation from "@/components/evolution-homepage/Navigation";
import { Heart, MessageCircle, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navigationItems = [
  {
    id: "home",
    label: "หน้าแรก",
    href: "/evolution-homepage",
    isActive: false,
  },
  { id: "articles", label: "บทความ", href: "/articles", isActive: true },
  { id: "books", label: "หนังสือ", href: "/books", isActive: false },
  { id: "videos", label: "วิดีโอ", href: "/videos", isActive: false },
  { id: "podcasts", label: "พอดแคสต์", href: "/podcasts", isActive: false },
];

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  // Find article by slug (extract slug from href)
  const article = sampleArticles.find((article) => {
    const articleSlug = article.href.split("/").pop();
    return articleSlug === slug;
  });

  if (!article) {
    notFound();
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/background-cover.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="min-h-screen bg-black/60">
        {/* Navigation */}
        <Navigation items={navigationItems} activeItem="articles" />

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link
            href="/articles"
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับไปหน้าบทความ</span>
          </Link>

          {/* Article Header */}
          <article className="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-600/40 overflow-hidden">
            {/* Featured Image */}
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Article Meta Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center space-x-4 text-white/80 text-sm mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <time dateTime={article.publishDate}>
                    {new Date(article.publishDate).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {article.title}
                </h1>

                <p className="text-gray-200 mt-4 text-lg">
                  โดย {article.author}
                </p>
              </div>
            </div>

            {/* Article Body */}
            <div className="p-8">
              {/* Article Excerpt */}
              {article.excerpt && (
                <div className="text-gray-300 text-lg leading-relaxed mb-8 p-6 bg-gray-700/50 rounded-lg border-l-4 border-yellow-400">
                  {article.excerpt}
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  บทความนี้กำลังอยู่ระหว่างการพัฒนา
                  เนื้อหาจริงจะถูกเพิ่มเติมในอนาคต
                </p>

                <p className="text-gray-300 leading-relaxed mb-6">
                  ในขณะนี้ คุณสามารถดูข้อมูลพื้นฐานของบทความได้จากส่วนด้านบน
                  รวมถึงชื่อเรื่อง ผู้เขียน วันที่เผยแพร่ และเวลาในการอ่าน
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                  เนื้อหาที่เกี่ยวข้อง
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  บทความนี้เป็นส่วนหนึ่งของชุดเนื้อหาเกี่ยวกับวิวัฒนาการและวิทยาศาสตร์
                  ที่นำเสนอมุมมองและข้อมูลที่น่าสนใจจากแหล่งข้อมูลต่างๆ
                </p>
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-600/40">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Heart className="w-5 h-5" />
                    <span>{article.likes} ถูกใจ</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <MessageCircle className="w-5 h-5" />
                    <span>{article.comments} ความคิดเห็น</span>
                  </div>
                </div>

                <div className="text-sm text-gray-400">Slug: {slug}</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return sampleArticles.map((article) => ({
    slug: article.href.split("/").pop() || article.id,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = sampleArticles.find((article) => {
    const articleSlug = article.href.split("/").pop();
    return articleSlug === slug;
  });

  if (!article) {
    return {
      title: "ไม่พบบทความ - Evolution About",
      description: "ไม่พบบทความที่คุณกำลังมองหา",
    };
  }

  return {
    title: `${article.title} - Evolution About`,
    description: article.excerpt || `บทความโดย ${article.author}`,
  };
}
