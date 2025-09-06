import React, { useEffect, useState } from 'react';
import { ArrowLeft, Eye, Star, Share2, MessageCircle, Clock, User, Tag, Download, Edit, Trash2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function DocumentViewer() {
  const { selectedDocument, setSelectedDocument, rateDocument, viewDocument, user, updateDocument, deleteDocument } = useApp();
  const [userRating, setUserRating] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    content: '',
    tags: '',
    visibility: 'public' as 'private' | 'group' | 'public'
  });

  useEffect(() => {
    if (selectedDocument) {
      viewDocument(selectedDocument.id);
      setEditData({
        title: selectedDocument.title,
        content: selectedDocument.content,
        tags: selectedDocument.tags.join(', '),
        visibility: selectedDocument.visibility
      });
    }
  }, [selectedDocument, viewDocument]);

  if (!selectedDocument) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-gray-400">Select a document to view details</p>
        </div>
      </div>
    );
  }

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

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 cursor-pointer transition-colors ${
          i < (interactive ? userRating : Math.floor(rating))
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-400 hover:text-yellow-300'
        }`}
        onClick={() => {
          if (interactive) {
            const newRating = i + 1;
            setUserRating(newRating);
            rateDocument(selectedDocument.id, newRating);
          }
        }}
      />
    ));
  };

  const handleSaveEdit = () => {
    const tagsArray = editData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    updateDocument(selectedDocument.id, {
      title: editData.title,
      content: editData.content,
      tags: tagsArray,
      visibility: editData.visibility
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      deleteDocument(selectedDocument.id);
      setSelectedDocument(null);
    }
  };

  const canEdit = selectedDocument.authorId === user.id || user.permissions.includes('admin');

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setSelectedDocument(null)}
          className="flex items-center space-x-2 p-3 bg-white rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại Tài liệu</span>
        </button>

        {canEdit && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <Edit className="w-4 h-4" />
              <span>{isEditing ? 'Hủy' : 'Chỉnh sửa'}</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
            >
              <Trash2 className="w-4 h-4" />
              <span>Xóa</span>
            </button>
          </div>
        )}
      </div>

      {/* Document Header */}
      <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getVisibilityColor(selectedDocument.visibility)} flex items-center justify-center text-2xl`}>
                {getVisibilityIcon(selectedDocument.visibility)}
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({...editData, title: e.target.value})}
                    className="text-3xl font-bold text-gray-900 mb-2 bg-gray-50 border border-gray-300 rounded-lg p-2"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedDocument.title}</h1>
                )}
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>bởi {selectedDocument.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{formatTimeAgo(selectedDocument.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded border border-gray-200">
                      {selectedDocument.department}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
                <Download className="w-4 h-4" />
                <span>Tải xuống</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors border border-green-200">
                <Share2 className="w-4 h-4" />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-lg">🤖</span>
              <h3 className="text-lg font-semibold text-gray-900">Tóm tắt AI</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{selectedDocument.summary}</p>
          </div>

          {/* Tags */}
          <div className="flex items-center space-x-2 mb-6">
            <Tag className="w-4 h-4 text-gray-500" />
            <div className="flex space-x-2">
              {isEditing ? (
                <input
                  type="text"
                  value={editData.tags}
                  onChange={(e) => setEditData({...editData, tags: e.target.value})}
                  placeholder="Thẻ (phân cách bằng dấu phẩy)"
                  className="bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-900"
                />
              ) : (
                selectedDocument.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200"
                  >
                    #{tag}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Stats and Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-gray-600 text-sm">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{selectedDocument.views} lượt xem</span>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(selectedDocument.rating)}
                <span className="ml-2">({selectedDocument.totalRatings} đánh giá)</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{selectedDocument.comments.length} bình luận</span>
              </div>
            </div>

            {/* User Rating */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">Đánh giá tài liệu:</span>
              <div className="flex items-center space-x-1">
                {renderStars(userRating, true)}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex items-center space-x-4">
              <select
                value={editData.visibility}
                onChange={(e) => setEditData({...editData, visibility: e.target.value as any})}
                className="bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-900"
              >
                <option value="private">Riêng tư</option>
                <option value="group">Nhóm</option>
                <option value="public">Công khai</option>
              </select>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Lưu Thay đổi
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Document Content */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm mb-8">
        <div className="prose max-w-none">
          {isEditing ? (
            <textarea
              value={editData.content}
              onChange={(e) => setEditData({...editData, content: e.target.value})}
              rows={20}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 text-gray-900 resize-none"
            />
          ) : (
            <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
              {selectedDocument.content}
            </div>
          )}
        </div>
      </div>

      {/* AI Q&A Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xl">🤖</span>
          <h3 className="text-xl font-semibold text-gray-900">Trợ lý AI</h3>
        </div>
        <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
          <input
            type="text"
            placeholder="Hỏi bất cứ điều gì về tài liệu này..."
            className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
          />
        </div>
        <div className="space-y-4">
          <div className="bg-blue-100 rounded-lg p-4 border border-blue-200">
            <p className="text-blue-800 text-sm font-medium mb-1">Câu hỏi Gợi ý:</p>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>• Những điểm chính của tài liệu này là gì?</li>
              <li>• Điều này liên quan như thế nào đến dự án hiện tại?</li>
              <li>• Các bước tiếp theo được đề cập là gì?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Documents */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <span>🔗</span>
          <span>Tài liệu Liên quan</span>
        </h3>
        <div className="text-center py-8 text-gray-600">
          <div className="text-4xl mb-2">🔍</div>
          <p>AI đang phân tích nội dung liên quan...</p>
        </div>
      </div>
    </div>
  );
}