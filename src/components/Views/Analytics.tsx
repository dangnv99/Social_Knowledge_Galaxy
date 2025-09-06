import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, FileText, Eye, Star, Calendar, Download, Share2, MessageCircle, Award, Target, Activity } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function Analytics() {
  const { documents, activities, user } = useApp();
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('views');

  // Tính toán thống kê
  const totalDocuments = documents.length;
  const totalViews = documents.reduce((sum, doc) => sum + doc.views, 0);
  const totalRatings = documents.reduce((sum, doc) => sum + doc.totalRatings, 0);
  const avgRating = totalRatings > 0 ? (documents.reduce((sum, doc) => sum + (doc.rating * doc.totalRatings), 0) / totalRatings).toFixed(1) : '0.0';

  // Thống kê theo phòng ban
  const departmentStats = documents.reduce((acc, doc) => {
    acc[doc.department] = (acc[doc.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Thống kê theo tags
  const tagStats = documents.reduce((acc, doc) => {
    doc.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Top tags
  const topTags = Object.entries(tagStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  // Top departments
  const topDepartments = Object.entries(departmentStats)
    .sort(([,a], [,b]) => b - a);

  // Thống kê hoạt động theo ngày (mock data)
  const activityData = [
    { date: '08/12', uploads: 4, views: 32, ratings: 8 },
    { date: '09/12', uploads: 6, views: 48, ratings: 12 },
    { date: '10/12', uploads: 3, views: 28, ratings: 6 },
    { date: '11/12', uploads: 8, views: 65, ratings: 18 },
    { date: '12/12', uploads: 5, views: 42, ratings: 11 },
    { date: '13/12', uploads: 9, views: 73, ratings: 21 },
    { date: '14/12', uploads: 7, views: 56, ratings: 15 },
    { date: '15/12', uploads: 12, views: 89, ratings: 25 },
    { date: '16/12', uploads: 6, views: 45, ratings: 13 },
    { date: '17/12', uploads: 10, views: 78, ratings: 19 }
  ];

  const topPerformers = [
    { name: 'Nguyễn Thị Minh Anh', documents: 8, views: 1240, rating: 4.8, department: 'Technology' },
    { name: 'Trần Minh Đức', documents: 6, views: 980, rating: 4.7, department: 'Security' },
    { name: 'Nguyễn Văn Hùng', documents: 7, views: 890, rating: 4.6, department: 'Technology' },
    { name: 'Phạm Thị Hương', documents: 5, views: 750, rating: 4.5, department: 'Human Resources' },
    { name: 'Lê Minh Tuấn', documents: 6, views: 680, rating: 4.4, department: 'Project Management' },
    { name: 'Trần Thị Lan', documents: 4, views: 620, rating: 4.3, department: 'Finance' },
    { name: 'Nguyễn Minh Tuấn', documents: 5, views: 580, rating: 4.2, department: 'Technology' },
    { name: 'Phạm Thị Hoa', documents: 3, views: 450, rating: 4.7, department: 'Customer Service' },
    { name: 'Lê Thị Mai', documents: 4, views: 420, rating: 4.1, department: 'Human Resources' },
    { name: 'Võ Minh Khang', documents: 3, views: 380, rating: 4.0, department: 'Technology' }
  ];

  // Top contributors
  const contributorStats = documents.reduce((acc, doc) => {
    acc[doc.author] = (acc[doc.author] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topContributors = Object.entries(contributorStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const getMaxValue = (data: any[], key: string) => {
    return Math.max(...data.map(item => item[key]));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="text-6xl mb-4">📊</div>
        <h1 className="text-3xl font-bold text-white mb-2">Trung tâm Phân tích Vũ trụ</h1>
        <p className="text-gray-400">Khám phá xu hướng và hiệu suất tri thức trong thiên hà</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center">
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-2 border border-slate-600/50">
          {[
            { id: '7days', label: '7 ngày' },
            { id: '30days', label: '30 ngày' },
            { id: '90days', label: '3 tháng' },
            { id: 'year', label: '1 năm' }
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">📚</div>
            <TrendingUp className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Tổng Tài liệu</h3>
          <p className="text-3xl font-bold text-blue-400 mb-2">{totalDocuments}</p>
          <p className="text-sm text-green-400">+12% so với tháng trước</p>
        </div>

        <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">👁️</div>
            <Eye className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Tổng Lượt xem</h3>
          <p className="text-3xl font-bold text-green-400 mb-2">{totalViews.toLocaleString()}</p>
          <p className="text-sm text-green-400">+28% so với tháng trước</p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">⭐</div>
            <Star className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Đánh giá TB</h3>
          <p className="text-3xl font-bold text-purple-400 mb-2">{avgRating}/5.0</p>
          <p className="text-sm text-green-400">+0.3 so với tháng trước</p>
        </div>

        <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/50 rounded-xl p-6 border border-orange-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">👥</div>
            <Users className="w-6 h-6 text-orange-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Người dùng Hoạt động</h3>
          <p className="text-3xl font-bold text-orange-400 mb-2">47</p>
          <p className="text-sm text-green-400">+8% so với tháng trước</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Chart */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-600/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Activity className="w-6 h-6 text-blue-400" />
              <span>Hoạt động 7 ngày qua</span>
            </h3>
            <div className="flex space-x-2">
              {[
                { id: 'uploads', label: 'Tải lên', color: 'bg-blue-500' },
                { id: 'views', label: 'Xem', color: 'bg-green-500' },
                { id: 'ratings', label: 'Đánh giá', color: 'bg-purple-500' }
              ].map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedMetric === metric.id
                      ? `${metric.color} text-white`
                      : 'bg-slate-700 text-gray-400 hover:text-white'
                  }`}
                >
                  {metric.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            {activityData.map((day, index) => {
              const maxValue = getMaxValue(activityData, selectedMetric);
              const value = day[selectedMetric as keyof typeof day] as number;
              const percentage = (value / maxValue) * 100;
              
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 text-sm text-gray-400">{day.date}</div>
                  <div className="flex-1 bg-slate-700/50 rounded-full h-6 relative overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        selectedMetric === 'uploads' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                        selectedMetric === 'views' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                        'bg-gradient-to-r from-purple-500 to-purple-600'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
                      {value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Contributors */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-600/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Award className="w-6 h-6 text-yellow-400" />
            <span>Top Người đóng góp</span>
          </h3>
          <div className="space-y-4">
            {topContributors.map(([author, count], index) => (
              <div key={author} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                  index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white' :
                  index === 2 ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white' :
                  'bg-slate-700 text-gray-300'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{author}</p>
                  <p className="text-gray-400 text-sm">{count} tài liệu</p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    index === 0 ? 'text-yellow-400' :
                    index === 1 ? 'text-gray-400' :
                    index === 2 ? 'text-orange-400' :
                    'text-gray-500'
                  }`}>
                    {index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : '⭐'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Distribution */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-600/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Target className="w-6 h-6 text-indigo-400" />
            <span>Phân bố theo Phòng ban</span>
          </h3>
          <div className="space-y-4">
            {topDepartments.map(([dept, count], index) => {
              const percentage = (count / totalDocuments) * 100;
              const colors = [
                'from-blue-500 to-indigo-600',
                'from-green-500 to-emerald-600', 
                'from-purple-500 to-violet-600',
                'from-orange-500 to-red-600',
                'from-pink-500 to-rose-600'
              ];
              
              return (
                <div key={dept} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{dept}</span>
                    <span className="text-gray-400 text-sm">{count} tài liệu ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colors[index % colors.length]} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Tags */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-600/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <MessageCircle className="w-6 h-6 text-green-400" />
            <span>Tags Phổ biến</span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {topTags.map(([tag, count], index) => {
              const maxCount = topTags[0][1];
              const intensity = (count / maxCount);
              
              return (
                <div
                  key={tag}
                  className={`px-4 py-2 rounded-full border transition-all hover:scale-105 ${
                    intensity > 0.7 ? 'bg-blue-500/30 border-blue-400/50 text-blue-300' :
                    intensity > 0.4 ? 'bg-green-500/30 border-green-400/50 text-green-300' :
                    'bg-purple-500/30 border-purple-400/50 text-purple-300'
                  }`}
                >
                  <span className="font-medium">#{tag}</span>
                  <span className="ml-2 text-xs opacity-75">({count})</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl p-8 border border-slate-600/50">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <BarChart3 className="w-7 h-7 text-cyan-400" />
          <span>Thông tin Chi tiết Hiệu suất</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-700/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🚀</div>
            <h4 className="text-lg font-semibold text-white mb-2">Tăng trưởng Nội dung</h4>
            <p className="text-gray-300 text-sm mb-3">Tài liệu mới được tạo đều đặn với chất lượng cao</p>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-400 text-sm font-medium">Xu hướng tích cực</span>
            </div>
          </div>
          
          <div className="bg-slate-700/30 rounded-xl p-6">
            <div className="text-3xl mb-3">👥</div>
            <h4 className="text-lg font-semibold text-white mb-2">Tương tác Cộng đồng</h4>
            <p className="text-gray-300 text-sm mb-3">Mức độ tham gia và chia sẻ kiến thức cao</p>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-blue-400 text-sm font-medium">Hoạt động mạnh</span>
            </div>
          </div>
          
          <div className="bg-slate-700/30 rounded-xl p-6">
            <div className="text-3xl mb-3">⭐</div>
            <h4 className="text-lg font-semibold text-white mb-2">Chất lượng Nội dung</h4>
            <p className="text-gray-300 text-sm mb-3">Đánh giá trung bình cao và phản hồi tích cực</p>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-400 text-sm font-medium">Chất lượng tốt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}