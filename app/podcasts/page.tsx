import { Metadata } from "next";
import { PodcastsPage } from "@/components/evolution-homepage";
import { samplePodcastEpisodes } from "@/data/sample-podcast-episodes";

export const metadata: Metadata = {
  title: "พอดแคสต์ | Evolution About",
  description:
    "ฟังพอดแคสต์เกี่ยวกับวิวัฒนาการ วิทยาศาสตร์ และธรรมชาติ จากทีม Evolution About",
  keywords: [
    "พอดแคสต์",
    "วิวัฒนาการ",
    "วิทยาศาสตร์",
    "ธรรมชาติ",
    "การศึกษา",
    "Evolution About",
  ],
  openGraph: {
    title: "พอดแคสต์ | Evolution About",
    description:
      "ฟังพอดแคสต์เกี่ยวกับวิวัฒนาการ วิทยาศาสตร์ และธรรมชาติ จากทีม Evolution About",
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "พอดแคสต์ | Evolution About",
    description:
      "ฟังพอดแคสต์เกี่ยวกับวิวัฒนาการ วิทยาศาสตร์ และธรรมชาติ จากทีม Evolution About",
  },
};

export default function PodcastsPageRoute() {
  return <PodcastsPage episodes={samplePodcastEpisodes} />;
}
