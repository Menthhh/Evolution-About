import { notFound } from "next/navigation";
import { sampleVideos } from "@/data/sample-videos";
import Navigation from "@/components/evolution-homepage/Navigation";
import { Button } from "@/components/ui/button";
import { Eye, Clock, ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navigationItems = [
  {
    id: "home",
    label: "หน้าแรก",
    href: "/evolution-homepage",
    isActive: false,
  },
  { id: "articles", label: "บทความ", href: "/articles", isActive: false },
  { id: "books", label: "หนังสือ", href: "/publications", isActive: false },
  { id: "videos", label: "วิดีโอ", href: "/videos", isActive: true },
  { id: "podcasts", label: "พอดแคสต์", href: "/podcasts", isActive: false },
];

interface VideoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;

  // Find video by slug (using youtubeId as slug)
  const video = sampleVideos.find((video) => video.youtubeId === slug);

  if (!video) {
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
        <Navigation items={navigationItems} activeItem="videos" />

        {/* Video Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/videos">
              <Button
                variant="outline"
                className="bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับไปหน้าวิดีโอ
              </Button>
            </Link>
          </div>

          {/* Video Player Section */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-600/40 overflow-hidden">
            {/* YouTube Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                title={video.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <div className="p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {video.title}
              </h1>

              {/* Video Stats */}
              <div className="flex items-center space-x-6 text-gray-300 mb-6">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{video.views?.toLocaleString()} ครั้ง</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{video.duration}</span>
                </div>
              </div>

              {/* Video Description */}
              {video.description && (
                <div className="bg-gray-700/50 rounded-lg p-4 border-l-4 border-yellow-400">
                  <p className="text-gray-300 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              )}

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-600/40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      เกี่ยวกับวิดีโอนี้
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      วิดีโอนี้เป็นส่วนหนึ่งของชุดเนื้อหาเกี่ยวกับวิวัฒนาการและวิทยาศาสตร์
                      ที่นำเสนอมุมมองและข้อมูลที่น่าสนใจจากแหล่งข้อมูลต่างๆ
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      ข้อมูลเพิ่มเติม
                    </h3>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div>YouTube ID: {video.youtubeId}</div>
                      <div>Video ID: {video.id}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Videos Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              วิดีโอที่เกี่ยวข้อง
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleVideos
                .filter((v) => v.id !== video.id)
                .slice(0, 6)
                .map((relatedVideo) => (
                  <Link
                    key={relatedVideo.id}
                    href={`/videos/${relatedVideo.youtubeId}`}
                    className="group"
                  >
                    <div className="bg-gray-800/60 rounded-lg overflow-hidden border border-gray-600/40 hover:border-yellow-400/50 transition-all duration-300 hover:bg-gray-800/80">
                      <div className="relative aspect-video">
                        <Image
                          src={relatedVideo.thumbnail}
                          alt={relatedVideo.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center group-hover:bg-black/80 transition-colors">
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          {relatedVideo.duration}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-yellow-400 transition-colors">
                          {relatedVideo.title}
                        </h3>
                        {relatedVideo.views && (
                          <p className="text-gray-400 text-xs mt-2">
                            {relatedVideo.views.toLocaleString()} ครั้ง
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return sampleVideos.map((video) => ({
    slug: video.youtubeId,
  }));
}

export async function generateMetadata({ params }: VideoPageProps) {
  const { slug } = await params;
  const video = sampleVideos.find((video) => video.youtubeId === slug);

  if (!video) {
    return {
      title: "ไม่พบวิดีโอ - Evolution About",
      description: "ไม่พบวิดีโอที่คุณกำลังมองหา",
    };
  }

  return {
    title: `${video.title} - Evolution About`,
    description: video.description || `วิดีโอเกี่ยวกับวิวัฒนาการและวิทยาศาสตร์`,
  };
}
