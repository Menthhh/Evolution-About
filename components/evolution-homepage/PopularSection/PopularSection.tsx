"use client";

import Link from "next/link";
import Image from "next/image";
import { TrendingUp, Eye, FileText, Video, Flame } from "lucide-react";
import { PopularSectionProps } from "@/types/evolution-homepage";
import { cn } from "@/lib/utils";

/**
 * PopularSection component for popular content in sidebar
 * Requirements: 5.4 - Popular content with view counts and engagement metrics
 */
export function PopularSection({ items }: PopularSectionProps) {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
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

  const getPopularityBadge = (views: number) => {
    if (views >= 10000) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-medium">
          <Flame className="w-3 h-3" />
          <span>ฮิต</span>
        </div>
      );
    }
    if (views >= 5000) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/10 text-orange-500 rounded-full text-xs font-medium">
          <TrendingUp className="w-3 h-3" />
          <span>ยอดนิยม</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">ยอดนิยม</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex gap-3 p-2 rounded-md group",
              "hover:bg-muted/50 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
          >
            {/* Ranking number */}
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              <span
                className={cn(
                  "text-sm font-bold",
                  index === 0 && "text-yellow-500",
                  index === 1 && "text-gray-400",
                  index === 2 && "text-amber-600",
                  index > 2 && "text-muted-foreground"
                )}
              >
                {index + 1}
              </span>
            </div>

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

                {/* Views count */}
                {item.views && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{formatViews(item.views)} ครั้ง</span>
                    </div>
                  </>
                )}
              </div>

              {/* Popularity badge */}
              {item.views && (
                <div className="mt-2">{getPopularityBadge(item.views)}</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
