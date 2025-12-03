import {
  BASE_AUTH_API,
  BASE_CAT_API,
  BASE_LEC_API,
  BASE_PLAYLIST_API,
} from "@/public/const/base_api";
import { FilterOption } from "@/components/(organs)/FilterCategory";
import { Category, Lecturer } from "@/types/Article.type";
import { Author } from "@/types/Book.type";
import { useEffect, useState } from "react";

export enum Pages {
  Article = "article",
  Book = "book",
  Media = "media",
}

interface BaseOptionData {
  categories: Array<{ label: string; value: string }>;
}

interface ArticleOptionData extends BaseOptionData {
  lecturers: Array<{ label: string; value: string }>;
}

interface BookOptionData extends BaseOptionData {
  authors: Array<{ label: string; value: string }>;
}

interface MediaOptionData extends BaseOptionData {
  mediaTypes: Array<{ label: string; value: string }>;
  playlists: Array<{ label: string; value: string }>;
}

type OptionData =
  | ArticleOptionData
  | BookOptionData
  | MediaOptionData
  | BaseOptionData;

// Utility function to fetch and transform data from the API
export const fetchOption = async (page: Pages): Promise<OptionData> => {
  try {
    const [catRes, lecRes, authRes, plRes] = await Promise.all([
      fetch(`${BASE_CAT_API}`),
      fetch(`${BASE_LEC_API}`),
      fetch(`${BASE_AUTH_API}`),
      fetch(`${BASE_PLAYLIST_API}`),
    ]);

    const catData = await catRes.json();
    const lecData = await lecRes.json();
    const authData = await authRes.json();
    const playlistData = await plRes.json();

    // Transform categories data (common for all pages)
    const baseData: BaseOptionData = {
      categories: catData.data.map((cat: Category) => ({
        label: cat.catName,
        value: cat._id,
      })),
    };

    // Return page-specific data
    switch (page) {
      case Pages.Article:
        return {
          ...baseData,
          lecturers: lecData.data.map((lec: Lecturer) => ({
            label: lec.lecName,
            value: lec._id,
          })),
        };

      case Pages.Book:
        return {
          ...baseData,
          authors: authData.data.map((auth: Author) => ({
            label: auth.authorName,
            value: auth._id,
          })),
        };

      case Pages.Media:
        return {
          ...baseData,
          mediaTypes: [
            { label: "วิดีโอ", value: "video" },
            { label: "พอดแคสต์", value: "podcast" },
          ],
          playlists: playlistData.data.map((pl: any) => ({
            label: pl.plName,
            value: pl._id,
          })),
        };

      default:
        return baseData;
    }
  } catch (error) {
    console.error("Failed to fetch options:", error);
    return { categories: [] };
  }
};

const useFetchOptions = (page: Pages) => {
  const [filterOption, setFilterOption] = useState<OptionData>({
    categories: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const options = await fetchOption(page);
      setFilterOption(options);
    };
    fetchData();
  }, [page]);

  return filterOption;
};

export default useFetchOptions;
