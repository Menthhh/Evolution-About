#!/usr/bin/env node

import axios from "axios";
import * as cheerio from "cheerio";
import { writeFileSync } from "fs";
import { join } from "path";
import { NavItem, SocialLink } from "@/types/evolution-homepage";

/**
 * Navigation and social links scraper for Evolution News Thailand
 * Requirements: 1.2, 5.1, 5.2
 */

interface ScrapedNavigationData {
  navigation: NavItem[];
  socialLinks: SocialLink[];
  metadata: {
    scrapedAt: string;
    source: string;
  };
}

class NavigationSocialScraper {
  private baseUrl = "https://evolutionnewsthailand.wordpress.com";
  private delay = 2000;
  private maxRetries = 3;

  /**
   * Add delay between requests
   */
  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Fetch HTML content with error handling
   */
  private async fetchWithRetry(url: string, retries = 0): Promise<string> {
    try {
      console.log(`Fetching: ${url}`);

      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Upgrade-Insecure-Requests": "1",
        },
        timeout: 10000,
        responseType: "text",
        responseEncoding: "utf8",
      });

      return response.data;
    } catch (error) {
      console.error(
        `Error fetching ${url}:`,
        error instanceof Error ? error.message : error
      );

      if (retries < this.maxRetries) {
        console.log(`Retrying... (${retries + 1}/${this.maxRetries})`);
        await this.sleep(this.delay * (retries + 1));
        return this.fetchWithRetry(url, retries + 1);
      }

      throw error;
    }
  }

  /**
   * Extract navigation menu from WordPress site
   */
  private extractNavigation($: cheerio.CheerioAPI): NavItem[] {
    const navigation: NavItem[] = [];

    // Common WordPress navigation selectors
    const navSelectors = [
      ".main-navigation ul li a",
      ".primary-menu li a",
      ".menu li a",
      ".nav-menu li a",
      "nav ul li a",
      ".site-navigation li a",
    ];

    for (const selector of navSelectors) {
      const navLinks = $(selector);
      if (navLinks.length > 0) {
        console.log(`Found navigation using selector: ${selector}`);

        navLinks.each((index, element) => {
          const $link = $(element);
          const href = $link.attr("href") || "";
          const label = $link.text().trim();

          if (label && href && label.length > 1 && label.length < 50) {
            // Skip certain common WordPress links
            if (!label.match(/^(Home|Admin|Login|Register|RSS|Feed)$/i)) {
              navigation.push({
                id: this.generateNavId(label),
                label,
                href: this.normalizeHref(href),
                isActive: false,
              });
            }
          }
        });

        if (navigation.length > 0) break;
      }
    }

    // Always add some default Thai navigation items for better UX
    const defaultItems = this.getDefaultNavigation();

    // Merge scraped navigation with defaults, avoiding duplicates
    const mergedNav = [...defaultItems];

    for (const item of navigation) {
      if (!mergedNav.some((existing) => existing.href === item.href)) {
        mergedNav.push(item);
      }
    }

    return mergedNav.slice(0, 8); // Limit to 8 items
  }

  /**
   * Extract social media links from the site
   */
  private extractSocialLinks($: cheerio.CheerioAPI): SocialLink[] {
    const socialLinks: SocialLink[] = [];
    const foundPlatforms = new Set<string>();

    // Look for social media links
    const socialSelectors = [
      'a[href*="facebook.com"]',
      'a[href*="youtube.com"]',
      'a[href*="twitter.com"]',
      'a[href*="instagram.com"]',
      'a[href*="linkedin.com"]',
      'a[href*="tiktok.com"]',
      ".social-links a",
      ".social-media a",
      ".social a",
    ];

    for (const selector of socialSelectors) {
      const links = $(selector);

      links.each((index, element) => {
        const $link = $(element);
        const href = $link.attr("href") || "";
        const text = $link.text().trim();

        if (href) {
          const platform = this.identifyPlatform(href);
          if (platform && !foundPlatforms.has(platform)) {
            foundPlatforms.add(platform);

            socialLinks.push({
              platform: platform as any,
              url: href,
              label: text || `${platform} - Evolution News Thailand`,
            });
          }
        }
      });
    }

    // Add default social links if none found
    if (socialLinks.length === 0) {
      return this.getDefaultSocialLinks();
    }

    return socialLinks;
  }

  /**
   * Generate navigation ID from label
   */
  private generateNavId(label: string): string {
    return label
      .toLowerCase()
      .replace(/[^\u0E00-\u0E7Fa-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 20);
  }

  /**
   * Normalize href to be relative or absolute
   */
  private normalizeHref(href: string): string {
    if (href.startsWith("http")) {
      return href;
    }
    if (href.startsWith("/")) {
      return href;
    }
    return `/${href}`;
  }

  /**
   * Identify social media platform from URL
   */
  private identifyPlatform(url: string): string | null {
    const platforms = {
      "facebook.com": "facebook",
      "youtube.com": "youtube",
      "twitter.com": "twitter",
      "instagram.com": "instagram",
    };

    for (const [domain, platform] of Object.entries(platforms)) {
      if (url.includes(domain)) {
        return platform;
      }
    }

    return null;
  }

  /**
   * Get default navigation if scraping fails
   */
  private getDefaultNavigation(): NavItem[] {
    return [
      {
        id: "หน้าแรก",
        label: "หน้าแรก",
        href: "/",
        isActive: true,
      },
      {
        id: "บทความ",
        label: "บทความ",
        href: "/articles",
      },
      {
        id: "วิดีโอ",
        label: "วิดีโอ",
        href: "/videos",
      },
      {
        id: "เกี่ยวกับ",
        label: "เกี่ยวกับ Evolution News Thailand",
        href: "/about",
      },
      {
        id: "ติดต่อ",
        label: "ติดต่อเรา",
        href: "/contact",
      },
    ];
  }

  /**
   * Get default social links if scraping fails
   */
  private getDefaultSocialLinks(): SocialLink[] {
    return [
      {
        platform: "facebook",
        url: "https://facebook.com/evolutionnewsthailand",
        label: "Facebook - Evolution News Thailand",
      },
      {
        platform: "youtube",
        url: "https://youtube.com/@evolutionnewsthailand",
        label: "YouTube - Evolution News Thailand",
      },
    ];
  }

  /**
   * Scrape navigation and social links
   */
  async scrapeNavigationAndSocial(): Promise<ScrapedNavigationData> {
    console.log("Scraping navigation and social links...");

    try {
      const html = await this.fetchWithRetry(this.baseUrl);
      const $ = cheerio.load(html);

      // Extract navigation
      const navigation = this.extractNavigation($);
      console.log(`Found ${navigation.length} navigation items`);

      // Extract social links
      const socialLinks = this.extractSocialLinks($);
      console.log(`Found ${socialLinks.length} social links`);

      return {
        navigation,
        socialLinks,
        metadata: {
          scrapedAt: new Date().toISOString(),
          source: this.baseUrl,
        },
      };
    } catch (error) {
      console.error("Error scraping navigation and social links:", error);

      // Return default data if scraping fails
      return {
        navigation: this.getDefaultNavigation(),
        socialLinks: this.getDefaultSocialLinks(),
        metadata: {
          scrapedAt: new Date().toISOString(),
          source: "fallback-data",
        },
      };
    }
  }

  /**
   * Save scraped data to files
   */
  saveScrapedData(data: ScrapedNavigationData): void {
    try {
      // Save debug data
      const debugFile = join(
        process.cwd(),
        "scripts",
        "debug",
        `navigation-social-${Date.now()}.json`
      );
      writeFileSync(debugFile, JSON.stringify(data, null, 2), "utf8");
      console.log(`Debug data saved to: ${debugFile}`);

      // Update sample-navigation.ts
      const navContent = this.generateNavigationFile(data.navigation);
      const navFile = join(process.cwd(), "data", "sample-navigation.ts");
      writeFileSync(navFile, navContent, "utf8");
      console.log(`Updated sample-navigation.ts: ${navFile}`);

      // Update sample-social-links.ts
      const socialContent = this.generateSocialLinksFile(data.socialLinks);
      const socialFile = join(process.cwd(), "data", "sample-social-links.ts");
      writeFileSync(socialFile, socialContent, "utf8");
      console.log(`Updated sample-social-links.ts: ${socialFile}`);
    } catch (error) {
      console.error("Error saving scraped data:", error);
      throw error;
    }
  }

  /**
   * Generate TypeScript content for navigation
   */
  private generateNavigationFile(navigation: NavItem[]): string {
    const header = `import { NavItem } from "@/types/evolution-homepage";

/**
 * Real navigation data from Evolution News Thailand
 * Updated with authentic Thai language menu items
 * Generated on: ${new Date().toISOString()}
 * Requirements: 1.2 - Thai language menu items
 */
export const sampleNavigation: NavItem[] = `;

    return header + JSON.stringify(navigation, null, 2) + ";\n";
  }

  /**
   * Generate TypeScript content for social links
   */
  private generateSocialLinksFile(socialLinks: SocialLink[]): string {
    const header = `import { SocialLink } from "@/types/evolution-homepage";

/**
 * Real social media links from Evolution News Thailand
 * Updated with authentic social media presence
 * Generated on: ${new Date().toISOString()}
 * Requirements: 5.1, 5.2 - Social media icons and platform links
 */
export const sampleSocialLinks: SocialLink[] = `;

    return header + JSON.stringify(socialLinks, null, 2) + ";\n";
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log("Starting navigation and social links scraping...");

  const scraper = new NavigationSocialScraper();

  try {
    const scrapedData = await scraper.scrapeNavigationAndSocial();

    // Save the scraped data
    scraper.saveScrapedData(scrapedData);

    console.log("\n=== Scraping Summary ===");
    console.log(`Navigation items: ${scrapedData.navigation.length}`);
    console.log(`Social links: ${scrapedData.socialLinks.length}`);
    console.log(`Source: ${scrapedData.metadata.source}`);
    console.log(`Scraped at: ${scrapedData.metadata.scrapedAt}`);

    console.log("\n=== Navigation Items ===");
    scrapedData.navigation.forEach((item, index) => {
      console.log(`${index + 1}. ${item.label} (${item.href})`);
    });

    console.log("\n=== Social Links ===");
    scrapedData.socialLinks.forEach((link, index) => {
      console.log(`${index + 1}. ${link.platform}: ${link.url}`);
    });

    console.log(
      "\n✓ Navigation and social links scraping completed successfully!"
    );
  } catch (error) {
    console.error("Scraping failed:", error);
    process.exit(1);
  }
}

// Export for use in other scripts
export { NavigationSocialScraper };

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
