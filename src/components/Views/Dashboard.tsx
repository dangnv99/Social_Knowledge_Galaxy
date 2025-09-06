import React from 'react';
import { Eye, Star, Clock, TrendingUp, Search, Filter, FileText, Users, Upload, BarChart } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function Dashboard() {
  const { 
    documents, 
    activities, 
    setSelectedDocument, 
    user, 
    searchFilters, 
    setSearchFilters,
    getRecentDocuments,
    getPopularDocuments,
    getUserDocuments
  } = useApp();
  
  const [quickFilter, setQuickFilter] = React.useState('all');

  const recentDocuments = getRecentDocuments();
  const popularDocuments = getPopularDocuments();
  const userDocuments = getUserDocuments();
  const [currentPage, setCurrentPage] = React.useState(1);
  const documentsPerPage = 5;

  const filteredDocuments = React.useMemo(() => {
    let filtered = documents;
    
    if (searchFilters.query.trim()) {
      const query = searchFilters.query.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(query) ||
        doc.content.toLowerCase().includes(query) ||
        doc.summary.toLowerCase().includes(query) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query)) ||
        doc.author.toLowerCase().includes(query)
      );
    }
    
    switch (quickFilter) {
      case 'recent':
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'popular':
        return filtered.sort((a, b) => (b.rating * b.totalRatings + b.views) - (a.rating * a.totalRatings + a.views));
      case 'my':
        return filtered.filter(doc => doc.authorId === user.id);
      default:
        return filtered;
    }
  }, [documents, searchFilters.query, quickFilter, user.id]);

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);
  const startIndex = (currentPage - 1) * documentsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + documentsPerPage);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [quickFilter, searchFilters.query]);

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

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
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

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Chào mừng trở lại, {user.name.split(' ').slice(-2).join(' ')}!
            </h2>
            <p className="text-gray-600 text-lg">
              Sẵn sàng khám phá và chia sẻ tri thức hôm nay?
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800">{userDocuments.length} Tài liệu</span>
              </div>
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-800">{user.role}</span>
              </div>
            </div>
          </div>
          <div className="text-6xl opacity-50">📚</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tổng Tài liệu</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
            </div>
            <div className="text-3xl">📚</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Đóng góp của bạn</p>
              <p className="text-2xl font-bold text-gray-900">{userDocuments.length}</p>
            </div>
            <div className="text-3xl">✨</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tuần này</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="text-3xl">🚀</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Người dùng Hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">47</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filter Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu, chủ đề, hoặc tác giả..."
                value={searchFilters.query}
                onChange={(e) => setSearchFilters({ query: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {searchFilters.query && (
                <button
                  onClick={() => setSearchFilters({ query: '' })}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ×
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              {[
                { id: 'all', label: 'Tất cả', icon: '📚' },
                { id: 'recent', label: 'Gần đây', icon: '🕒' },
                { id: 'popular', label: 'Phổ biến', icon: '🔥' },
                { id: 'my', label: 'Của tôi', icon: '👤' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setQuickFilter(filter.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    quickFilter === filter.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-1">{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-200 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Bộ lọc</span>
            </button>
          </div>
        </div>
        
        {searchFilters.query && (
          <div className="mt-4 flex items-center space-x-2 text-sm">
            <BarChart className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">
              Tìm thấy {filteredDocuments.length} kết quả cho "{searchFilters.query}"
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <span>📄</span>
              <span>Tài liệu Tri thức</span>
            </h3>
            <div className="text-sm text-gray-600">
              <span className="text-gray-500">{filteredDocuments.length} tài liệu</span>
            </div>
          </div>
          
          <div className="grid gap-6">
            {paginatedDocuments.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchFilters.query ? 'Không tìm thấy tài liệu' : 'Không có tài liệu'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchFilters.query 
                    ? `Không tìm thấy kết quả cho "${searchFilters.query}". Thử từ khóa khác.`
                    : 'Bắt đầu bằng cách tải lên tài liệu đầu tiên vào cơ sở tri thức.'
                  }
                </p>
                {searchFilters.query && (
                  <button
                    onClick={() => setSearchFilters({ query: '' })}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Xóa tìm kiếm
                  </button>
                )}
              </div>
            ) : (
              paginatedDocuments.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocument(doc)}
                  className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getVisibilityColor(doc.visibility)} flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                        {getVisibilityIcon(doc.visibility)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {doc.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">by {doc.author} • {doc.department}</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{doc.summary}</p>
                      </div>
                    </div>
                  </div>
                  
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
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeAgo(doc.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Hiển thị {startIndex + 1}-{Math.min(startIndex + documentsPerPage, filteredDocuments.length)} trong {filteredDocuments.length} tài liệu
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tiếp
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Documents */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Tài liệu Gần đây</span>
            </h3>
            <div className="space-y-3">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocument(doc)}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <h4 className="text-gray-900 text-sm font-medium truncate">{doc.title}</h4>
                  <p className="text-gray-600 text-xs mt-1">{doc.author}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(doc.rating)}
                    </div>
                    <span className="text-xs text-gray-500">{formatTimeAgo(doc.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Documents */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Phổ biến Tuần này</span>
            </h3>
            <div className="space-y-3">
              {popularDocuments.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocument(doc)}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <h4 className="text-gray-900 text-sm font-medium truncate">{doc.title}</h4>
                  <p className="text-gray-600 text-xs mt-1">{doc.author}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">{doc.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(doc.rating)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
             <span>Hoạt động Gần đây</span>
            </h3>
            <div className="space-y-3">
              {activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-sm">👤</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-600"> {activity.action} </span>
                      <span className="text-blue-600">{activity.target}</span>
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}