import React from "react";
import { SocialLinksProps } from "@/types/evolution-homepage";
import { ExternalLink } from "lucide-react";

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return (
          <svg
            className="w-full h-full"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "youtube":
        return (
          <svg
            className="w-full h-full"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "twitter":
        return (
          <svg
            className="w-full h-full"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "instagram":
        return (
          <svg
            className="w-full h-full"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.017 0C8.396 0 7.929.01 6.71.048 5.493.085 4.73.204 4.058.388a5.946 5.946 0 0 0-2.15 1.402A5.96 5.96 0 0 0 .388 4.058C.204 4.73.085 5.493.048 6.71.01 7.929 0 8.396 0 12.017c0 3.624.01 4.09.048 5.309.037 1.216.156 1.98.34 2.652a5.946 5.946 0 0 0 1.402 2.15 5.96 5.96 0 0 0 2.15 1.402c.672.184 1.435.303 2.652.34 1.22.038 1.686.048 5.309.048 3.624 0 4.09-.01 5.309-.048 1.216-.037 1.98-.156 2.652-.34a5.946 5.946 0 0 0 2.15-1.402 5.96 5.96 0 0 0 1.402-2.15c.184-.672.303-1.435.34-2.652.038-1.22.048-1.686.048-5.309 0-3.621-.01-4.088-.048-5.307-.037-1.217-.156-1.98-.34-2.653a5.946 5.946 0 0 0-1.402-2.15A5.96 5.96 0 0 0 19.652.388C18.98.204 18.217.085 16.999.048 15.78.01 15.314 0 11.693 0h.324zM12.017 2.162c3.557 0 3.98.01 5.385.048 1.3.06 2.006.276 2.477.458.622.242 1.067.532 1.533.998.466.466.756.911.998 1.533.182.471.398 1.177.458 2.477.038 1.405.048 1.828.048 5.385 0 3.557-.01 3.98-.048 5.385-.06 1.3-.276 2.006-.458 2.477-.242.622-.532 1.067-.998 1.533-.466.466-.911.756-1.533.998-.471.182-1.177.398-2.477.458-1.405.038-1.828.048-5.385.048-3.557 0-3.98-.01-5.385-.048-1.3-.06-2.006-.276-2.477-.458-.622-.242-1.067-.532-1.533-.998-.466-.466-.756-.911-.998-1.533-.182-.471-.398-1.177-.458-2.477-.038-1.405-.048-1.828-.048-5.385 0-3.557.01-3.98.048-5.385.06-1.3.276-2.006.458-2.477.242-.622.532-1.067.998-1.533.466-.466.911-.756 1.533-.998.471-.182 1.177-.398 2.477-.458 1.405-.038 1.828-.048 5.385-.048zm0 3.676a6.179 6.179 0 1 0 0 12.358 6.179 6.179 0 1 0 0-12.358zm0 10.196a4.017 4.017 0 1 1 0-8.034 4.017 4.017 0 0 1 0 8.034zm7.877-10.457a1.444 1.444 0 1 1-2.888 0 1.444 1.444 0 0 1 2.888 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return <ExternalLink className="w-full h-full" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "facebook":
        return "hover:text-blue-500";
      case "youtube":
        return "hover:text-red-500";
      case "twitter":
        return "hover:text-sky-500";
      case "instagram":
        return "hover:text-pink-500";
      default:
        return "hover:text-accent-foreground";
    }
  };

  return (
    <div className="space-y-2 sm:space-y-3">
      <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">
        ติดตามเรา
      </h3>
      {/* Mobile: Horizontal layout with equal spacing, Desktop: Flexible wrap */}
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className={`inline-flex items-center justify-center p-2 sm:p-3 rounded-lg bg-card border border-border text-muted-foreground transition-all duration-300 ease-out hover:bg-accent hover:border-accent-foreground/20 hover:scale-110 hover:shadow-lg hover:shadow-accent/20 active:scale-95 touch-manipulation min-h-[44px] min-w-[44px] group ${getPlatformColor(
              link.platform
            )} animation-delay-${index * 100}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-110">
              {getPlatformIcon(link.platform)}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
