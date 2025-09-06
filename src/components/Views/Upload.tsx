import React, { useState } from 'react';
import { Upload as UploadIcon, FileText, Sparkles, Globe, Users, Lock, Send, File, Image, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { UploadProgress } from '../../types';

export default function Upload() {
  const { addDocument, user } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    visibility: 'public' as 'private' | 'group' | 'public',
    fileType: 'text' as 'doc' | 'pdf' | 'image' | 'text'
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [aiSummary, setAiSummary] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const simulateAI = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const summaries = [
      'This document provides comprehensive insights into modern development practices and methodologies for enterprise environments.',
      'Essential technical guidelines and best practices for implementing scalable solutions in corporate settings.',
      'Strategic overview of implementation approaches with practical examples and detailed case studies.',
      'Comprehensive knowledge compilation covering fundamental concepts and advanced techniques for professionals.'
    ];
    
    const tagSuggestions = [
      ['Development', 'Best Practices', 'Technical', 'Enterprise'],
      ['Documentation', 'Guidelines', 'Process', 'Standards'],
      ['Strategy', 'Implementation', 'Framework', 'Architecture'],
      ['Knowledge', 'Tutorial', 'Guide', 'Training']
    ];
    
    setAiSummary(summaries[Math.floor(Math.random() * summaries.length)]);
    setSuggestedTags(tagSuggestions[Math.floor(Math.random() * tagSuggestions.length)]);
    setIsGenerating(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/gif'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Only PDF, Word documents, and images are allowed');
      return;
    }

    setSelectedFile(file);
    
    // Simulate file upload progress
    setUploadProgress({
      fileName: file.name,
      progress: 0,
      status: 'uploading'
    });

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (!prev) return null;
        
        const newProgress = prev.progress + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          return {
            ...prev,
            progress: 100,
            status: 'completed'
          };
        }
        
        return {
          ...prev,
          progress: newProgress
        };
      });
    }, 200);

    // Set file type based on uploaded file
    if (file.type.includes('pdf')) {
      setFormData(prev => ({ ...prev, fileType: 'pdf' }));
    } else if (file.type.includes('word') || file.type.includes('document')) {
      setFormData(prev => ({ ...prev, fileType: 'doc' }));
    } else if (file.type.includes('image')) {
      setFormData(prev => ({ ...prev, fileType: 'image' }));
    }

    // Auto-fill title from filename
    const fileName = file.name.replace(/\.[^/.]+$/, "");
    setFormData(prev => ({ ...prev, title: fileName }));
  };

  const handleNext = async () => {
    if (currentStep === 1 && (formData.title && (formData.content || selectedFile))) {
      await simulateAI();
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = () => {
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    
    addDocument({
      title: formData.title,
      content: formData.content || `Uploaded file: ${selectedFile?.name}`,
      summary: aiSummary,
      tags: tagsArray,
      author: user.name,
      authorId: user.id,
      visibility: formData.visibility,
      fileType: formData.fileType,
      fileName: selectedFile?.name,
      fileSize: selectedFile?.size,
      department: user.department
    });

    // Reset form
    setFormData({ 
      title: '', 
      content: '', 
      tags: '', 
      visibility: 'public',
      fileType: 'text'
    });
    setCurrentStep(1);
    setAiSummary('');
    setSuggestedTags([]);
    setSelectedFile(null);
    setUploadProgress(null);
    
    alert('🚀 Document uploaded successfully!');
  };

  const getVisibilityConfig = (visibility: string) => {
    switch (visibility) {
      case 'private':
        return { icon: Lock, color: 'from-gray-500 to-slate-600', label: 'Private', desc: 'Only you can see this' };
      case 'group':
        return { icon: Users, color: 'from-blue-500 to-indigo-600', label: 'Team Access', desc: 'Your team can access' };
      case 'public':
        return { icon: Globe, color: 'from-green-500 to-emerald-600', label: 'Public', desc: 'Everyone can view' };
      default:
        return { icon: Globe, color: 'from-green-500 to-emerald-600', label: 'Public', desc: 'Everyone can view' };
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return '📄';
      case 'doc': return '📝';
      case 'image': return '🖼️';
      default: return '📄';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">📤</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tải lên Tài liệu Tri thức</h1>
        <p className="text-gray-600">Chia sẻ chuyên môn của bạn với đội ngũ</p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                step <= currentStep 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-1 rounded-full transition-colors duration-300 ${
                  step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        {/* Step 1: Content Creation */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">📝 Chi tiết Tài liệu</h2>
              <p className="text-gray-600">Cung cấp thông tin tài liệu của bạn</p>
            </div>

            {/* File Upload Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
              <input
                type="file"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-4xl mb-4">📁</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tải lên Tài liệu</h3>
                <p className="text-gray-600 mb-4">
                  Kéo thả hoặc nhấp để chọn file
                </p>
                <p className="text-sm text-gray-500">
                  Hỗ trợ: PDF, Word, Hình ảnh (Tối đa 10MB)
                </p>
              </label>
              
              {uploadProgress && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-900 text-sm">{uploadProgress.fileName}</span>
                    <span className="text-gray-600 text-sm">{uploadProgress.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress.progress}%` }}
                    ></div>
                  </div>
                  {uploadProgress.status === 'completed' && (
                    <div className="flex items-center space-x-2 mt-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Tải lên hoàn tất</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="text-center text-gray-400">
              <span>HOẶC</span>
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Tiêu đề Tài liệu</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Nhập tiêu đề tài liệu..."
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Nội dung (Tùy chọn nếu đã tải file)</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Nhập nội dung tài liệu hoặc ghi chú bổ sung..."
                rows={8}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={!formData.title || (!formData.content && !selectedFile)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2 shadow-md"
              >
                <Sparkles className="w-5 h-5" />
                <span>Tạo Tóm tắt AI</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: AI Enhancement */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">🤖 Cải thiện AI</h2>
              <p className="text-gray-600">Phân tích nội dung và gắn thẻ bằng AI</p>
            </div>

            {isGenerating ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-gray-900 font-medium">AI đang phân tích nội dung của bạn...</p>
                <p className="text-gray-600 text-sm mt-2">Đang tạo tóm tắt và thẻ</p>
              </div>
            ) : (
              <>
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Tóm tắt do AI tạo</span>
                  </h3>
                  <textarea
                    value={aiSummary}
                    onChange={(e) => setAiSummary(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-medium mb-2">Thẻ (AI Đề xuất)</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {suggestedTags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const currentTags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
                          if (!currentTags.includes(tag)) {
                            setFormData({
                              ...formData,
                              tags: [...currentTags, tag].join(', ')
                            });
                          }
                        }}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-200 transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="Thêm thẻ tùy chỉnh (phân cách bằng dấu phẩy)..."
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 flex items-center space-x-2 shadow-md"
                  >
                    <span>Thiết lập Quyền</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 3: Visibility Settings */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">🔐 Quyền Truy cập</h2>
              <p className="text-gray-600">Chọn ai có thể truy cập tài liệu của bạn</p>
            </div>

            <div className="space-y-4">
              {(['private', 'group', 'public'] as const).map((visibility) => {
                const config = getVisibilityConfig(visibility);
                const Icon = config.icon;
                
                return (
                  <label
                    key={visibility}
                    className={`block p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 bg-white ${
                      formData.visibility === visibility
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="visibility"
                      value={visibility}
                      checked={formData.visibility === visibility}
                      onChange={(e) => setFormData({...formData, visibility: e.target.value as any})}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${config.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{config.label}</h3>
                        <p className="text-gray-600">{config.desc}</p>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Document Summary */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt Tài liệu</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tiêu đề:</span>
                  <span className="text-gray-900 font-medium">{formData.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Loại:</span>
                  <span className="text-gray-900 flex items-center space-x-2">
                    <span>{getFileIcon(formData.fileType)}</span>
                    <span>{formData.fileType.toUpperCase()}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Thẻ:</span>
                  <span className="text-gray-900">{formData.tags || 'Không có'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Truy cập:</span>
                  <span className="text-gray-900">{getVisibilityConfig(formData.visibility).label}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Quay lại
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-300 flex items-center space-x-2 shadow-md"
              >
                <Send className="w-5 h-5" />
                <span>Tải lên Tài liệu</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}