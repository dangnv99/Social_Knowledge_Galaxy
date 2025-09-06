import React, { useState } from 'react';
import { Eye, Star, Clock, Edit, Trash2, Share2, Download, Filter, Search, Plus, Upload, FileText, TrendingUp } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function DocumentList() {
  const { getUserDocuments, setSelectedDocument, user, deleteDocument, setActiveView } = useApp();
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;
  
  const userDocuments = getUserDocuments();

  const filteredAndSortedDocuments = React.useMemo(() => {
    let filtered = userDocuments;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(query) ||
        doc.summary.toLowerCase().includes(query) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by visibility
    if (filterBy !== 'all') {
      filtered = filtered.filter(doc => doc.visibility === filterBy);
    }

    // Sort documents
    switch (sortBy) {
      case 'recent':
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'popular':
        return filtered.sort((a, b) => b.views - a.views);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'title':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [userDocuments, sortBy, filterBy, searchQuery]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, filterBy, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedDocuments.length / documentsPerPage);
  const startIndex = (currentPage - 1) * documentsPerPage;
  const paginatedDocuments = filteredAndSortedDocuments.slice(startIndex, startIndex + documentsPerPage);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    return `${diffDays} ngày trước`;
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'private': return '🔒';
      case 'group': return '👥';
      case 'public': return '🌍';
      default: return '📄';
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'private': return 'from-gray-500 to-slate-600';
      case 'group': return 'from-blue-500 to-indigo-600';
      case 'public': return 'from-green-500 to-emerald-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  const getVisibilityLabel = (visibility: string) => {
    switch (visibility) {
      case 'private': return 'Riêng tư';
      case 'group': return 'Nhóm';
      case 'public': return 'Công khai';
      default: return 'Không xác định';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-400'
        }`}
      />
    ));
  };

  const handleDelete = (docId: string, docTitle: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${docTitle}"?`)) {
      deleteDocument(docId);
    }
  };

  const totalViews = userDocuments.reduce((sum, doc) => sum + doc.views, 0);
  const avgRating = userDocuments.length > 0 
    ? (userDocuments.reduce((sum, doc) => sum + doc.rating, 0) / userDocuments.length).toFixed(1)
    : '0.0';

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thư viện Tài liệu của Tôi</h1>
          <p className="text-gray-600">Quản lý các đóng góp tri thức của bạn</p>
        </div>
        
        {/* Quick Upload Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setActiveView('upload')}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Tải lên Tài liệu Mới</span>
            <Upload className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Tổng tài liệu</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{userDocuments.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Tổng lượt xem</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalViews.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Đánh giá TB</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{avgRating}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Tuần này</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                <option value="public">Công khai</option>
                <option value="group">Nhóm</option>
                <option value="private">Riêng tư</option>
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Mới nhất</option>
              <option value="popular">Phổ biến</option>
              <option value="rating">Đánh giá cao</option>
              <option value="title">Tên A-Z</option>
            </select>
          </div>
        </div>

        {searchQuery && (
          <div className="mt-4 flex items-center space-x-2 text-sm">
            <span className="text-gray-700">
              Tìm thấy {filteredAndSortedDocuments.length} kết quả cho "{searchQuery}"
            </span>
            {filteredAndSortedDocuments.length === 0 && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-600 hover:text-blue-700 underline font-medium"
              >
                Xóa tìm kiếm
              </button>
            )}
          </div>
        )}
      </div>

      {/* Documents Grid */}
      <div className="space-y-6">
        {paginatedDocuments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              {searchQuery ? '🔍' : '📄'}
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              {searchQuery ? 'Không tìm thấy tài liệu' : 'Chưa có tài liệu nào'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery 
                ? `Không có kết quả cho "${searchQuery}". Thử từ khóa khác.`
                : 'Bắt đầu chia sẻ tri thức đầu tiên của bạn với cộng đồng.'
              }
            </p>
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Xóa tìm kiếm
              </button>
            ) : (
              <div className="space-y-6">
                <button
                  onClick={() => window.location.hash = '#upload'}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                >
                  🚀 Upload First Document
                </button>
                <p className="text-gray-500 text-sm">Hoặc kéo thả file vào đây để tải lên</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {paginatedDocuments.map((doc) => (
              <div
                key={doc.id}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getVisibilityColor(doc.visibility)} flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                      {getVisibilityIcon(doc.visibility)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 
                            className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                            onClick={() => setSelectedDocument(doc)}
                          >
                            {doc.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>{getVisibilityLabel(doc.visibility)}</span>
                            <span>•</span>
                            <span>{formatTimeAgo(doc.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedDocument(doc)}
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                            title="Chia sẻ"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Tải xuống"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(doc.id, doc.title)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">{doc.summary}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {doc.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                          {doc.tags.length > 3 && (
                            <span className="text-xs text-gray-500">+{doc.tags.length - 3} thêm</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-gray-500 text-sm">
                          <div className="flex items-center space-x-1">
                            {renderStars(doc.rating)}
                            <span className="ml-1">({doc.totalRatings})</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{doc.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {filteredAndSortedDocuments.length > documentsPerPage && (
          <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-400">
              Hiển thị {startIndex + 1}-{Math.min(startIndex + documentsPerPage, filteredAndSortedDocuments.length)} trong {filteredAndSortedDocuments.length} tài liệu
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Trước
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-colors font-medium ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Tiếp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}