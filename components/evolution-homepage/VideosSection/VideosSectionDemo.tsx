import React from "react";
import { VideosSection } from "./VideosSection";
import { sampleVideos } from "@/data/sample-videos";

/**
 * VideosSectionDemo Component
 *
 * Demo component to showcase the VideosSection with sample data.
 * Uses the first video as featured and the rest as thumbnails.
 */
export function VideosSectionDemo() {
  const [featuredVideo, ...otherVideos] = sampleVideos;

  if (!featuredVideo) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>ไม่มีข้อมูลวิดีโอสำหรับแสดง</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          ตัวอย่างส่วนวิดีโอ
        </h1>
        <p className="text-muted-foreground">
          แสดงวิดีโอเด่นและวิดีโอย่อยในรูปแบบ thumbnail
        </p>
      </div>

      <VideosSection
        featuredVideo={featuredVideo}
        videos={otherVideos}
        title="วิดีโอ"
      />
    </div>
  );
}
