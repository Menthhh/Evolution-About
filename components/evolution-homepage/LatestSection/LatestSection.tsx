"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, FileText, Video } from "lucide-react";
import { LatestSectionProps } from "@/types/evolution-homepage";
import { cn } from "@/lib/utils";

/**
 * LatestSection component for recent content in sidebar
 * Requirements: 5.3 - Latest content with timestamps and thumbnails
 */
export function LatestSection({ items }: LatestSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "เมื่อวาน";
    if (diffDays <= 7) return `${diffDays} วันที่แล้ว`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} สัปดาห์ที่แล้ว`;
    return `${Math.ceil(diffDays / 30)} เดือนที่แล้ว`;
  };

  const getContentIcon = (type: "article" | "video") => {
    return type === "video" ? (
      <Video className="w-3 h-3" />
    ) : (
      <FileText className="w-3 h-3" />
    );
  };

  const getContentTypeLabel = (type: "article" | "video") => {
    return type === "video" ? "วิดีโอ" : "บทความ";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">ล่าสุด</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex gap-3 p-2 rounded-md group",
              "hover:bg-muted/50 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
          >
            {/* Thumbnail */}
            <div className="flex-shrink-0 w-12 h-12 relative rounded-md overflow-hidden bg-muted">
              {item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  {getContentIcon(item.type)}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {item.title}
              </h4>

              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                {/* Content type indicator */}
                <div className="flex items-center gap-1">
                  {getContentIcon(item.type)}
                  <span>{getContentTypeLabel(item.type)}</span>
                </div>

                {/* Separator */}
                <span>•</span>

                {/* Timestamp */}
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(item.publishDate)}</span>
                </div>

                {/* Views count if available */}
                {item.views && (
                  <>
                    <span>•</span>
                    <span>{item.views.toLocaleString()} ครั้ง</span>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
