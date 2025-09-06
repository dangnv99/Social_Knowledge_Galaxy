import React from 'react';
import { CheckCircle, Clock, FileText, Users, Shield, Laptop, Coffee, Star } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function QuickStart() {
  const { documents, setSelectedDocument } = useApp();

  // Essential documents for new employees
  const essentialDocs = [
    {
      id: '6',
      title: 'Employee Handbook 2024',
      description: 'Company policies, benefits, and workplace guidelines',
      priority: 'high',
      estimatedTime: '30 min',
      category: 'HR',
      icon: '📋'
    },
    {
      id: '3',
      title: 'New Employee Onboarding Manual',
      description: 'Complete guide from day one through first month',
      priority: 'high',
      estimatedTime: '45 min',
      category: 'HR',
      icon: '🎯'
    },
    {
      id: '2',
      title: 'Information Security Policy 2024',
      description: 'Security guidelines and data protection requirements',
      priority: 'high',
      estimatedTime: '25 min',
      category: 'Security',
      icon: '🔒'
    },
    {
      id: '5',
      title: 'Microsoft Teams User Guide',
      description: 'Communication and collaboration tools training',
      priority: 'medium',
      estimatedTime: '20 min',
      category: 'IT',
      icon: '💬'
    },
    {
      id: '4',
      title: 'Leave Management & Attendance Policy',
      description: 'Time tracking, leave requests, and attendance guidelines',
      priority: 'medium',
      estimatedTime: '15 min',
      category: 'HR',
      icon: '📅'
    },
    {
      id: '12',
      title: 'Remote Work Policy and Guidelines',
      description: 'Hybrid work arrangements and productivity expectations',
      priority: 'medium',
      estimatedTime: '20 min',
      category: 'HR',
      icon: '🏠'
    },
    {
      id: '7',
      title: 'IT Asset Management Policy',
      description: 'Hardware, software, and security requirements',
      priority: 'low',
      estimatedTime: '15 min',
      category: 'IT',
      icon: '💻'
    },
    {
      id: '11',
      title: 'Data Privacy and GDPR Compliance',
      description: 'Privacy principles and compliance requirements',
      priority: 'medium',
      estimatedTime: '25 min',
      category: 'Legal',
      icon: '🛡️'
    },
    {
      id: '10',
      title: 'Customer Service Excellence Manual',
      description: 'Service standards and best practices',
      priority: 'low',
      estimatedTime: '20 min',
      category: 'Customer Service',
      icon: '⭐'
    },
    {
      id: '15',
      title: 'Performance Management Framework',
      description: 'Goal setting, reviews, and development planning',
      priority: 'medium',
      estimatedTime: '30 min',
      category: 'HR',
      icon: '📊'
    }
  ];

  const onboardingSteps = [
    {
      step: 1,
      title: 'Welcome & Setup',
      description: 'Get your accounts and workspace ready',
      tasks: ['Receive welcome email', 'Set up IT accounts', 'Get office tour'],
      status: 'completed'
    },
    {
      step: 2,
      title: 'Essential Reading',
      description: 'Review key company documents',
      tasks: ['Employee handbook', 'Security policies', 'HR guidelines'],
      status: 'in-progress'
    },
    {
      step: 3,
      title: 'Team Integration',
      description: 'Meet your team and understand your role',
      tasks: ['Meet team members', 'Understand role expectations', 'Join team channels'],
      status: 'pending'
    },
    {
      step: 4,
      title: 'Training & Development',
      description: 'Complete required training modules',
      tasks: ['Security training', 'Tool training', 'Role-specific training'],
      status: 'pending'
    }
  ];

  const quickActions = [
    {
      title: 'Need Help?',
      description: 'Connect with your buddy or HR team for assistance',
      icon: '💬',
      action: 'Contact Support',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Training Center',
      description: 'Access online courses and training materials',
      icon: '📚',
      action: 'Start Learning',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Meet Your Team',
      description: 'Connect with colleagues and join team channels',
      icon: '👥',
      action: 'View Directory',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'IT Support',
      description: 'Get help with technical issues and equipment',
      icon: '🔧',
      action: 'Get Support',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Company Resources',
      description: 'Access internal tools and resources',
      icon: '🏢',
      action: 'Explore Resources',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Feedback & Ideas',
      description: 'Share your thoughts and suggestions',
      icon: '💡',
      action: 'Submit Feedback',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-red-600';
      case 'medium': return 'from-yellow-500 to-yellow-600';
      case 'low': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'HR': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'IT': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Security': return 'bg-red-100 text-red-800 border-red-200';
      case 'Legal': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Customer Service': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'pending': return <div className="w-5 h-5 border-2 border-gray-500 rounded-full" />;
      default: return null;
    }
  };

  const handleDocumentClick = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
      setSelectedDocument(doc);
    }
  };

  return (
    <div className="p-6 space-y-8">

      {/* Header */}
      <div className="text-center">
        <div className="text-6xl mb-4">🚀</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hướng dẫn Bắt đầu Nhanh</h1>
        <p className="text-gray-600">Mọi thứ bạn cần để bắt đầu thành công</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Onboarding Progress */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-400" />
              <span>Tiến độ Onboarding</span>
            </h3>
            
            <div className="space-y-6">
              {onboardingSteps.map((step) => (
                <div key={step.step} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(step.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-500">Bước {step.step}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        step.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                        step.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        {step.status === 'completed' ? 'Hoàn thành' :
                         step.status === 'in-progress' ? 'Đang thực hiện' : 'Chờ thực hiện'}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      {step.tasks.map((task, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Tiến độ Tổng thể</span>
                <span className="text-sm text-gray-600">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Essential Documents */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <FileText className="w-6 h-6 text-blue-400" />
              <span>Tài liệu Cần thiết</span>
            </h3>
            
            <div className="grid gap-4">
              {essentialDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleDocumentClick(doc.id)}
                  className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="text-2xl">{doc.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {doc.title}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(doc.category)}`}>
                            {doc.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{doc.estimatedTime}</span>
                          </div>
                          <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${getPriorityColor(doc.priority)} text-white font-medium`}>
                            {doc.priority === 'high' ? 'Ưu tiên cao' : 
                             doc.priority === 'medium' ? 'Ưu tiên trung bình' : 'Ưu tiên thấp'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="text-3xl mb-3">{action.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{action.description}</p>
            <button className={`w-full px-4 py-2 bg-gradient-to-r ${action.color} text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium`}>
              {action.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}