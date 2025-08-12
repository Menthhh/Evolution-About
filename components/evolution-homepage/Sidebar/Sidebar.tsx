import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProps } from "@/types/evolution-homepage";
import SocialLinks from "../SocialLinks/SocialLinks";

const Sidebar: React.FC<SidebarProps> = ({
  socialLinks,
  additionalContent,
}) => {
  return (
    <aside className="w-full lg:w-80 space-y-4 sm:space-y-6">
      {/* Mobile: Horizontal layout for social links, Vertical on larger screens */}
      <div className="lg:space-y-6">
        {/* Social Links Card - optimized for mobile stacking */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 ease-out hover:bg-card/70 hover:shadow-lg hover:-translate-y-1 hover:border-accent/30">
          <CardContent className="p-4 sm:p-6">
            <SocialLinks links={socialLinks} />
          </CardContent>
        </Card>

        {/* Additional Content Card - responsive padding */}
        {additionalContent && (
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 ease-out hover:bg-card/70 hover:shadow-lg hover:-translate-y-1 hover:border-accent/30 mt-4 lg:mt-6 animation-delay-200">
            <CardContent className="p-4 sm:p-6">
              {additionalContent}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Featured Content Card - mobile-optimized layout */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 ease-out hover:bg-card/70 hover:shadow-lg hover:-translate-y-1 hover:border-accent/30 animation-delay-300">
        <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
          <CardTitle className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
            เนื้อหาแนะนำ
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
          {/* Mobile: Single column, Desktop: Maintain layout */}
          <div className="space-y-2 sm:space-y-3">
            <div className="p-2 sm:p-3 rounded-lg bg-muted/50 border border-border/30 transition-all duration-200 hover:bg-muted/70 hover:border-accent/30 cursor-pointer group">
              <h4 className="text-xs sm:text-sm font-medium text-foreground mb-1 group-hover:text-accent transition-colors">
                บทความล่าสุด
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                ค้นพบเนื้อหาวิทยาศาสตร์ใหม่ๆ ที่น่าสนใจ
              </p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-muted/50 border border-border/30 transition-all duration-200 hover:bg-muted/70 hover:border-accent/30 cursor-pointer group animation-delay-100">
              <h4 className="text-xs sm:text-sm font-medium text-foreground mb-1 group-hover:text-accent transition-colors">
                วิดีโอยอดนิยม
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                ชมวิดีโอการศึกษาที่ได้รับความนิยมสูงสุด
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default Sidebar;
