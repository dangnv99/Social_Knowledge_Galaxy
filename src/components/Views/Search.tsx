import React, { useEffect, useState } from "react";
import {
  Search as SearchIcon,
  Filter,
  Star,
  Clock,
  Eye,
  Heart,
} from "lucide-react";
import { useApp } from "../../contexts/AppContext";

export default function Search() {
  const { searchFilters, setSearchFilters, setSelectedDocument } = useApp();

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Gọi API search khi query thay đổi
  useEffect(() => {
    const fetchSearch = async () => {
      if (!searchFilters?.query || !searchFilters.query.trim()) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          "https://ced24b621922.ngrok-free.app/documents/search",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
              "ngrok-skip-browser-warning": "true",
            },
            body: JSON.stringify({ shortName: searchFilters.query }),
          }
        );

        if (!res.ok) throw new Error("Failed to fetch search results");
        const data = await res.json();
        setSearchResults(data);
      } catch (err) {
        console.error("❌ Lỗi gọi API search:", err);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [searchFilters?.query]);

  const handleSearchChange = (value: string) => {
    setSearchFilters({ ...searchFilters, query: value });
  };

  const handleQuickSearch = (query: string) => {
    setSearchFilters({ ...searchFilters, query });
  };

  const formatTimeAgo = (dateString: string) => {
    if (!dateString) return "";
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Hôm nay";
    if (diffDays === 1) return "Hôm qua";
    return `${diffDays} ngày trước`;
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Khám phá Tri thức
        </h1>
        <p className="text-gray-600">
          Tìm kiếm và khám phá kho tri thức của tổ chức
        </p>
      </div>

      {/* Search Interface */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm mb-8">
          <div className="relative mb-6">
            <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu, chủ đề, tác giả... (thử 'ERP', 'bảo mật', hoặc 'onboarding')"
              value={searchFilters?.query || ""}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl py-4 pl-16 pr-6 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                <SearchIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300">
                <Filter className="w-4 h-4" />
                <span>Bộ lọc</span>
              </button>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm border border-blue-200">
                  AI-Powered
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm border border-green-200">
                  Tìm kiếm thông minh
                </span>
              </div>
            </div>

            <div className="text-gray-600 text-sm">
              {loading
                ? "Đang tìm kiếm..."
                : `${searchResults.length} tài liệu tìm thấy`}
            </div>
          </div>
        </div>

        {/* Results */}
        {searchFilters?.query ? (
          loading ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
              ⏳ Đang tải dữ liệu...
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-6xl mb-4">🌌</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Không tìm thấy tài liệu
              </h3>
              <p className="text-gray-600 mb-6">
                Không có tài liệu nào phù hợp với từ khóa tìm kiếm
              </p>
              <button
                onClick={() => handleSearchChange("")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mr-4"
              >
                Xóa tìm kiếm
              </button>
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                🚀 Hãy là người đầu tiên tạo tri thức ở đây
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {searchResults.map((doc) => (
                <div
                  key={doc.documentId}
                  onClick={() => setSelectedDocument(doc)}
                  className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer shadow-sm"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      📄
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                            {doc.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {doc.shortName || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-500 text-sm">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{doc.commentCount}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          ID: {doc.documentId}
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{formatTimeAgo(doc.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="text-6xl mb-4">🌌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Sẵn sàng khám phá?
            </h3>
            <p className="text-gray-600 mb-6">
              Nhập từ khóa tìm kiếm để khám phá kho tri thức
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <button
                onClick={() => handleQuickSearch("ERP")}
                className="p-4 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors border border-blue-200"
              >
                🤖 ERP & Công nghệ
              </button>
              <button
                onClick={() => handleQuickSearch("onboarding")}
                className="p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors border border-green-200"
              >
                🚀 Hướng dẫn mới
              </button>
              <button
                onClick={() => handleQuickSearch("bảo mật")}
                className="p-4 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors border border-purple-200"
              >
                🛡️ Bảo mật
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
