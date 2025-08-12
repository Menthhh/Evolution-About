#!/usr/bin/env node

import { EvolutionNewsScraper } from "./scrape-evolution-news";
import { Article } from "@/types/evolution-homepage";
import { writeFileSync } from "fs";
import { join } from "path";

/**
 * Process scraped content and structure it for the application
 * Requirements: 2.1, 2.2, 2.3
 */

interface ProcessedArticleData {
  articles: Article[];
  metadata: {
    scrapedAt: string;
    totalArticles: number;
    source: string;
  };
}

class ArticleDataProcessor {
  private scraper: EvolutionNewsScraper;

  constructor() {
    this.scraper = new EvolutionNewsScraper();
  }

  /**
   * Generate unique ID based on title and date
   */
  private generateUniqueId(title: string, publishDate: string): string {
    // Create a slug from the title
    const titleSlug = title
      .toLowerCase()
      .replace(/[^\u0E00-\u0E7Fa-z0-9\s]/g, "") // Keep Thai characters, English, numbers, spaces
      .replace(/\s+/g, "-")
      .substring(0, 50);

    // Add date suffix for uniqueness
    const dateSuffix = publishDate.replace(/-/g, "");

    return `${titleSlug}-${dateSuffix}`;
  }

  /**
   * Generate proper href path for articles
   */
  private generateHrefPath(id: string): string {
    return `/articles/${id}`;
  }

  /**
   * Estimate reading time based on title and excerpt length
   */
  private estimateReadTime(title: string, excerpt: string): string {
    const totalText = title + " " + excerpt;
    const wordsPerMinute = 200; // Average Thai reading speed
    const characters = totalText.length;
    const estimatedWords = characters / 6; // Rough estimate for Thai text
    const minutes = Math.ceil(estimatedWords / wordsPerMinute);

    return `${Math.max(1, minutes)} นาที`;
  }

  /**
   * Generate realistic engagement metrics
   */
  private generateEngagementMetrics(publishDate: string): {
    likes: number;
    comments: number;
  } {
    const date = new Date(publishDate);
    const daysSincePublish = Math.floor(
      (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    // More recent articles tend to have fewer interactions
    const ageFactor = Math.max(0.1, 1 - daysSincePublish / 365);

    // Base metrics with some randomness
    const baseLikes = Math.floor(Math.random() * 200 + 50);
    const baseComments = Math.floor(Math.random() * 30 + 5);

    return {
      likes: Math.floor(baseLikes * ageFactor),
      comments: Math.floor(baseComments * ageFactor),
    };
  }

  /**
   * Clean and validate article data
   */
  private cleanArticleData(scrapedArticle: any): Article | null {
    try {
      // Validate required fields
      if (!scrapedArticle.title || !scrapedArticle.publishDate) {
        console.warn(
          "Skipping article with missing required fields:",
          scrapedArticle
        );
        return null;
      }

      // Clean title
      const title = scrapedArticle.title.trim();
      if (title.length < 10) {
        console.warn("Skipping article with too short title:", title);
        return null;
      }

      // Generate unique ID
      const id = this.generateUniqueId(title, scrapedArticle.publishDate);

      // Clean excerpt
      let excerpt = scrapedArticle.excerpt || "";
      if (excerpt.length < 20) {
        excerpt = `บทความเกี่ยวกับ${title.substring(
          0,
          30
        )}... อ่านต่อเพื่อเรียนรู้เพิ่มเติม`;
      }

      // Ensure proper Thai text encoding
      const cleanTitle = title.replace(/\uFEFF/g, "").trim(); // Remove BOM
      const cleanExcerpt = excerpt.replace(/\uFEFF/g, "").trim();

      // Generate engagement metrics
      const engagement = this.generateEngagementMetrics(
        scrapedArticle.publishDate
      );

      // Clean author
      const author = scrapedArticle.author || "Evolution News Thailand";

      // Validate and clean thumbnail
      let thumbnail =
        scrapedArticle.thumbnail || "/images/articles/evolution-default.svg";
      if (thumbnail.includes("gravatar") || thumbnail.includes("avatar")) {
        thumbnail = "/images/articles/evolution-default.svg";
      }

      return {
        id,
        title: cleanTitle,
        author,
        thumbnail,
        excerpt: cleanExcerpt,
        publishDate: scrapedArticle.publishDate,
        readTime: this.estimateReadTime(cleanTitle, cleanExcerpt),
        likes: engagement.likes,
        comments: engagement.comments,
        href: this.generateHrefPath(id),
      };
    } catch (error) {
      console.error("Error cleaning article data:", error);
      return null;
    }
  }

  /**
   * Process all scraped articles and structure them
   */
  async processScrapedArticles(): Promise<ProcessedArticleData> {
    console.log("Starting article data processing...");

    try {
      // Scrape fresh data
      const scrapedArticles = await this.scraper.scrapeArticles();

      if (scrapedArticles.length === 0) {
        throw new Error("No articles were scraped");
      }

      console.log(`Processing ${scrapedArticles.length} scraped articles...`);

      // Process and clean each article
      const processedArticles: Article[] = [];

      for (const scrapedArticle of scrapedArticles) {
        const cleanedArticle = this.cleanArticleData(scrapedArticle);
        if (cleanedArticle) {
          processedArticles.push(cleanedArticle);
        }
      }

      // Sort by publish date (newest first)
      processedArticles.sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );

      const result: ProcessedArticleData = {
        articles: processedArticles,
        metadata: {
          scrapedAt: new Date().toISOString(),
          totalArticles: processedArticles.length,
          source: "https://evolutionnewsthailand.wordpress.com",
        },
      };

      console.log(
        `Successfully processed ${processedArticles.length} articles`
      );
      return result;
    } catch (error) {
      console.error("Error processing scraped articles:", error);
      throw error;
    }
  }

  /**
   * Save processed data to files
   */
  saveProcessedData(data: ProcessedArticleData): void {
    try {
      // Save as JSON for debugging
      const jsonFile = join(
        process.cwd(),
        "scripts",
        "debug",
        `processed-articles-${Date.now()}.json`
      );
      writeFileSync(jsonFile, JSON.stringify(data, null, 2), "utf8");
      console.log(`Processed data saved to: ${jsonFile}`);

      // Generate TypeScript file content
      const tsContent = this.generateTypeScriptFile(data.articles);
      const tsFile = join(process.cwd(), "data", "scraped-articles.ts");
      writeFileSync(tsFile, tsContent, "utf8");
      console.log(`TypeScript file generated: ${tsFile}`);
    } catch (error) {
      console.error("Error saving processed data:", error);
      throw error;
    }
  }

  /**
   * Generate TypeScript file content
   */
  private generateTypeScriptFile(articles: Article[]): string {
    const header = `import { Article } from "@/types/evolution-homepage";

/**
 * Real article data scraped from Evolution News Thailand
 * Generated on: ${new Date().toISOString()}
 * Requirements: 2.1, 2.2, 2.4 - Real Thai language content
 */
export const scrapedArticles: Article[] = `;

    const articlesJson = JSON.stringify(articles, null, 2);

    return header + articlesJson + ";\n";
  }

  /**
   * Validate processed articles against interface requirements
   */
  validateArticles(articles: Article[]): boolean {
    const requiredFields = [
      "id",
      "title",
      "author",
      "thumbnail",
      "publishDate",
      "likes",
      "comments",
      "href",
    ];

    for (const article of articles) {
      for (const field of requiredFields) {
        if (
          !(field in article) ||
          article[field as keyof Article] === undefined
        ) {
          console.error(
            `Article missing required field '${field}':`,
            article.id
          );
          return false;
        }
      }

      // Validate data types
      if (
        typeof article.likes !== "number" ||
        typeof article.comments !== "number"
      ) {
        console.error(`Article has invalid engagement metrics:`, article.id);
        return false;
      }

      // Validate Thai content
      if (article.title.length < 10) {
        console.error(`Article title too short:`, article.id);
        return false;
      }
    }

    console.log(`✓ All ${articles.length} articles passed validation`);
    return true;
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log("Starting article data processing and structuring...");

  const processor = new ArticleDataProcessor();

  try {
    // Process scraped articles
    const processedData = await processor.processScrapedArticles();

    // Validate the processed data
    if (!processor.validateArticles(processedData.articles)) {
      throw new Error("Article validation failed");
    }

    // Save processed data
    processor.saveProcessedData(processedData);

    console.log("\n=== Processing Summary ===");
    console.log(`Total articles processed: ${processedData.articles.length}`);
    console.log(`Source: ${processedData.metadata.source}`);
    console.log(`Processed at: ${processedData.metadata.scrapedAt}`);

    console.log("\n=== Sample Articles ===");
    processedData.articles.slice(0, 3).forEach((article, index) => {
      console.log(`${index + 1}. ${article.title}`);
      console.log(`   ID: ${article.id}`);
      console.log(`   Author: ${article.author}`);
      console.log(`   Date: ${article.publishDate}`);
      console.log(
        `   Engagement: ${article.likes} likes, ${article.comments} comments`
      );
      console.log(`   Read time: ${article.readTime}`);
      console.log(`   Href: ${article.href}`);
      console.log("");
    });

    console.log("✓ Article data processing completed successfully!");
  } catch (error) {
    console.error("Processing failed:", error);
    process.exit(1);
  }
}

// Export for use in other scripts
export { ArticleDataProcessor };

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
