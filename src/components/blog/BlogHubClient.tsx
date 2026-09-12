"use client";

import { useMemo, useState } from "react";
import { BlogPost, FilterTag, Series } from "@/data/blog";
import BlogHero from "./BlogHero";
import FeaturedSeriesCard from "./FeaturedSeriesCard";
import LatestArticles from "./LatestArticles";
import MoreToExplore from "./MoreToExplore";

export default function BlogHubClient({
  series,
  articles,
}: {
  series: Series;
  articles: BlogPost[];
}) {
  const [selectedTag, setSelectedTag] = useState<FilterTag>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTag =
        selectedTag === "All" ||
        article.tags.some(
          (t) => t.toLowerCase() === selectedTag.toLowerCase()
        ) ||
        article.category.toLowerCase() === selectedTag.toLowerCase();

      return matchesSearch && matchesTag;
    });
  }, [articles, selectedTag, searchQuery]);

  const showSeries = useMemo(() => {
    if (selectedTag === "All" || selectedTag === "Series") return true;
    if (searchQuery.trim() !== "") {
      return (
        series.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        series.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return false;
  }, [series, selectedTag, searchQuery]);

  return (
    <div className="mx-auto w-[92%] max-w-272 min-w-0">
      <BlogHero
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {showSeries && <FeaturedSeriesCard series={series} />}

      <LatestArticles articles={filteredArticles} />

      {filteredArticles.length === 0 && (
        <div className="my-16 rounded-3xl border border-dashed border-black/10 bg-white/50 p-12 text-center">
          <p className="text-gray-mid">
            No articles found matching &ldquo;{searchQuery || selectedTag}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedTag("All");
              setSearchQuery("");
            }}
            className="mt-4 inline-block text-xs font-mono uppercase tracking-wider text-accent underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}

      <MoreToExplore />
    </div>
  );
}
