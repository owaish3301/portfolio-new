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
  series: Series[];
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

  const filteredSeries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return series.filter(item => (selectedTag === "All" || selectedTag === "Series") &&
      (!query || item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)));
  }, [series, selectedTag, searchQuery]);

  return (
    <div className="mx-auto w-[92%] max-w-272 min-w-0">
      <BlogHero
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div id="series" className="scroll-mt-28">
        {filteredSeries.map(item => <FeaturedSeriesCard key={item.slug} series={item} />)}
      </div>

      <LatestArticles articles={filteredArticles} />

      {filteredArticles.length === 0 && filteredSeries.length === 0 && (
        <div className="my-16 rounded-3xl border border-dashed border-black/10 bg-white/50 p-12 text-center">
          <p className="text-gray-mid">
            {articles.length === 0 && series.length === 0 ? "No articles published yet." : <>No articles found matching &ldquo;{searchQuery || selectedTag}&rdquo;.</>}
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

      <MoreToExplore onBrowseArticles={() => { setSelectedTag("All"); setSearchQuery(""); }} onBrowseSeries={() => { setSelectedTag("Series"); setSearchQuery(""); }} />
    </div>
  );
}
