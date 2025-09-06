import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, Award, TrendingUp, Users, Clock, Star, Send, ThumbsUp, Reply, MoreHorizontal } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function Community() {
  const { activities, user, documents, rateDocument } = useApp();
  const [selectedDocument, setSelectedDocument] = useState(null);
  // Extended mock data for community
  const communityMembers = [
    { id: '1', name: 'Nguyễn Thị Minh Anh', avatar: '👩‍💼', role: 'Senior Manager', department: 'Technology', points: 2850, contributions: 25, badges: ['🚀', '🧠', '💫'] },
    { id: '2', name: 'Nguyễn Văn Hùng', avatar: '👨‍💻', role: 'Project Manager', department: 'Technology', points: 2340, contributions: 18, badges: ['🎯', '⚡'] },
    { id: '3', name: 'Trần Minh Đức', avatar: '🛡️', role: 'Security Specialist', department: 'Security', points: 2180, contributions: 22, badges: ['🔒', '🛡️'] },
    { id: '4', name: 'Phạm Thị Hương', avatar: '👩‍💼', role: 'HR Manager', department: 'Human Resources', points: 1950, contributions: 16, badges: ['👥', '📋'] },
    { id: '5', name: 'Lê Thị Mai', avatar: '👩‍🎓', role: 'HR Specialist', department: 'Human Resources', points: 1820, contributions: 14, badges: ['📚', '🎓'] },
    { id: '6', name: 'Nguyễn Minh Tuấn', avatar: '👨‍💻', role: 'IT Specialist', department: 'Technology', points: 1650, contributions: 12, badges: ['💻', '🔧'] },
    { id: '7', name: 'Lê Minh Tuấn', avatar: '👨‍💼', role: 'Project Lead', department: 'Project Management', points: 1480, contributions: 11, badges: ['📊', '🎯'] },
    { id: '8', name: 'Trần Thị Lan', avatar: '👩‍💼', role: 'Finance Manager', department: 'Finance', points: 1320, contributions: 9, badges: ['💰', '📈'] },
    { id: '9', name: 'Phạm Thị Hoa', avatar: '👩‍💼', role: 'Customer Service Manager', department: 'Customer Service', points: 1180, contributions: 8, badges: ['⭐', '💬'] },
    { id: '10', name: 'Võ Minh Khang', avatar: '👨‍💼', role: 'Business Analyst', department: 'Technology', points: 980, contributions: 7, badges: ['📊'] }
  ];

  const communityStats = {
    totalMembers: 156,
    activeToday: 42,
    documentsShared: 1247,
    commentsPosted: 3856,
    likesGiven: 12450
  };

  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [showComments, setShowComments] = useState({});

  // Mock comments data
  const mockComments = {
    '1': [
      {
        id: 'c1',
        author: 'Trần Thị Lan',
        avatar: '👩‍💼',
        content: 'Tài liệu rất hữu ích cho việc triển khai SAP. Cảm ơn anh Hùng đã chia sẻ!',
        timestamp: '2024-12-15T09:30:00Z',
        likes: 5,
        replies: [
          {
            id: 'r1',
            author: 'Nguyễn Văn Hùng',
            avatar: '👨‍💼',
            content: 'Cảm ơn chị Lan! Nếu có thắc mắc gì thêm thì inbox mình nhé.',
            timestamp: '2024-12-15T10:15:00Z',
            likes: 2
          }
        ]
      },
      {
        id: 'c2',
        author: 'Lê Minh Tuấn',
        avatar: '👨‍💻',
        content: 'Phase 2 có timeline chi tiết không anh? Team mình đang cần tham khảo.',
        timestamp: '2024-12-15T11:20:00Z',
        likes: 3,
        replies: []
      }
    ],
    '2': [
      {
        id: 'c3',
        author: 'Phạm Thị Hoa',
        avatar: '👩‍🏫',
        content: 'Policy này rất cần thiết. Đề xuất nên có thêm phần training cho nhân viên mới.',
        timestamp: '2024-12-14T16:45:00Z',
        likes: 8,
        replies: []
      }
    ]
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours === 0) return 'Just now';
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const leaderboard = [
    { name: 'Nguyễn Văn Hùng', points: 2845, badge: '🏆', department: 'Technology' },
    { name: 'Trần Thị Lan', points: 2650, badge: '🥈', department: 'Finance' },
    { name: 'Lê Minh Tuấn', points: 2401, badge: '🥉', department: 'Project Management' },
    { name: 'Phạm Thị Hoa', points: 1250, badge: '🚀', department: 'Human Resources' },
    { name: 'Nguyễn Minh Tuấn', points: 987, badge: '⭐', department: 'Technology' }
  ];

  const handleRating = (docId, rating) => {
    rateDocument(docId, rating);
  };

  const handleComment = (docId) => {
    if (newComment.trim()) {
      // In real app, this would add to database
      console.log('Adding comment:', { docId, comment: newComment, author: user.name });
      setNewComment('');
    }
  };

  const toggleComments = (docId) => {
    setShowComments(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };

  const renderStars = (rating, interactive = false, docId = null) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 cursor-pointer transition-colors ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300 hover:text-yellow-300'
        }`}
        onClick={() => {
          if (interactive && docId) {
            handleRating(docId, i + 1);
          }
        }}
      />
    ));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="text-6xl mb-4">🌌</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cộng đồng Tri thức</h1>
        <p className="text-gray-600">Kết nối, thảo luận và cộng tác về tri thức chung</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <span>Bảng tin Cộng đồng</span>
            </h2>
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
              Tất cả Hoạt động
            </button>
          </div>

          {/* Document Discussion Cards */}
          <div className="space-y-6">
            {documents.slice(0, 5).map((doc) => (
              <div key={doc.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-xl">
                    📄
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                        <p className="text-sm text-gray-600">by {doc.author} • {doc.department}</p>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeAgo(doc.createdAt)}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">{doc.summary}</p>
                    
                    {/* Rating Section */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Rate this document:</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(0, true, doc.id)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(doc.rating)}
                        <span className="text-sm text-gray-500 ml-1">({doc.totalRatings} ratings)</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4 mb-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">Like</span>
                      </button>
                      <button 
                        onClick={() => toggleComments(doc.id)}
                        className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">Comment ({mockComments[doc.id]?.length || 0})</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>

                    {/* Comments Section */}
                    {showComments[doc.id] && (
                      <div className="border-t border-gray-200 pt-4">
                        {/* Add Comment */}
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-sm">
                            {user.avatar}
                          </div>
                          <div className="flex-1">
                            <textarea
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Write a comment..."
                              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              rows={3}
                            />
                            <div className="flex justify-end mt-2">
                              <button
                                onClick={() => handleComment(doc.id)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                              >
                                <Send className="w-4 h-4" />
                                <span>Comment</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Existing Comments */}
                        <div className="space-y-4">
                          {mockComments[doc.id]?.map((comment) => (
                            <div key={comment.id} className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-sm">
                                {comment.avatar}
                              </div>
                              <div className="flex-1">
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-gray-900 text-sm">{comment.author}</span>
                                    <span className="text-xs text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
                                  </div>
                                  <p className="text-gray-700 text-sm">{comment.content}</p>
                                </div>
                                <div className="flex items-center space-x-4 mt-2">
                                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                                    <ThumbsUp className="w-3 h-3" />
                                    <span className="text-xs">{comment.likes}</span>
                                  </button>
                                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                                    <Reply className="w-3 h-3" />
                                    <span className="text-xs">Reply</span>
                                  </button>
                                </div>

                                {/* Replies */}
                                {comment.replies?.map((reply) => (
                                  <div key={reply.id} className="flex items-start space-x-3 mt-3 ml-4">
                                    <div className="w-6 h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-xs">
                                      {reply.avatar}
                                    </div>
                                    <div className="flex-1">
                                      <div className="bg-gray-100 rounded-lg p-2">
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="font-medium text-gray-900 text-xs">{reply.author}</span>
                                          <span className="text-xs text-gray-500">{formatTimeAgo(reply.timestamp)}</span>
                                        </div>
                                        <p className="text-gray-700 text-xs">{reply.content}</p>
                                      </div>
                                      <div className="flex items-center space-x-2 mt-1">
                                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                                          <ThumbsUp className="w-3 h-3" />
                                          <span className="text-xs">{reply.likes}</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span>Top Contributors</span>
            </h3>
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`text-2xl ${
                    index === 0 ? 'animate-pulse' : ''
                  }`}>{user.badge}</div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm font-medium">{user.name}</p>
                    <p className="text-gray-500 text-xs">{user.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-600 text-sm font-semibold">{user.points.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs">XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>Community Stats</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-700 text-sm">Active Members</span>
                </div>
                <span className="text-gray-900 font-semibold">47</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-gray-700 text-sm">Comments Today</span>
                </div>
                <span className="text-gray-900 font-semibold">124</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-gray-700 text-sm">Likes This Week</span>
                </div>
                <span className="text-gray-900 font-semibold">89</span>
              </div>
            </div>
          </div>

          {/* Your Achievements */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <span>🏆</span>
              <span>Your Achievements</span>
            </h3>
            <div className="space-y-3">
              {user.badges?.map((badge) => (
                <div key={badge.id} className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${badge.color} flex items-center justify-center text-lg`}>
                    {badge.icon}
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm font-medium">{badge.name}</p>
                    <p className="text-gray-500 text-xs">Recently earned</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Next Achievement</span>
                  <span className="text-blue-600">750 XP to go</span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full p-1">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}