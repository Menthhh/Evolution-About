import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PodcastDetailPage } from "@/components/evolution-homepage";
import { samplePodcastEpisodes } from "@/data/sample-podcast-episodes";

interface PodcastPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all podcast episodes
export async function generateStaticParams() {
  return samplePodcastEpisodes.map((episode) => ({
    slug: episode.id,
  }));
}

// Generate metadata for each podcast episode
export async function generateMetadata({
  params,
}: PodcastPageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = samplePodcastEpisodes.find((episode) => episode.id === slug);

  if (!episode) {
    return {
      title: "ไม่พบตอนพอดแคสต์ | Evolution About",
    };
  }

  return {
    title: `${episode.title} | Evolution About`,
    description:
      episode.description ||
      `ฟังตอน ${episode.title} จาก Evolution About Podcast`,
    keywords: [
      "พอดแคสต์",
      "วิวัฒนาการ",
      "วิทยาศาสตร์",
      "ธรรมชาติ",
      "Evolution About",
      episode.title,
    ],
    openGraph: {
      title: `${episode.title} | Evolution About`,
      description:
        episode.description ||
        `ฟังตอน ${episode.title} จาก Evolution About Podcast`,
      type: "article",
      locale: "th_TH",
      publishedTime: episode.publishDate,
      images: episode.coverImage ? [episode.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${episode.title} | Evolution About`,
      description:
        episode.description ||
        `ฟังตอน ${episode.title} จาก Evolution About Podcast`,
      images: episode.coverImage ? [episode.coverImage] : undefined,
    },
  };
}

export default async function PodcastPage({ params }: PodcastPageProps) {
  const { slug } = await params;
  const episode = samplePodcastEpisodes.find((episode) => episode.id === slug);

  if (!episode) {
    notFound();
  }

  return (
    <PodcastDetailPage episode={episode} allEpisodes={samplePodcastEpisodes} />
  );
}
