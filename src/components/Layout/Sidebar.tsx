import React from "react";
import {
  Home,
  Upload,
  Search,
  Users,
  BarChart3,
  Rocket,
  Sparkles,
  Target,
  Zap,
  FileText,
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const menuItems = [
  {
    id: "dashboard",
    label: "Trang chủ",
    icon: Home,
    desc: "Tổng quan & thống kê",
    emoji: "📊",
  },
  // {
  //   id: 'upload',
  //   label: 'Tải lên',
  //   icon: Upload,
  //   desc: 'Chia sẻ tri thức',
  //   emoji: '📤'
  // },
  {
    id: "documents",
    label: "Tài liệu của tôi",
    icon: FileText,
    desc: "Tài liệu của bạn",
    emoji: "📚",
  },

  {
    id: "search",
    label: "Khám phá",
    icon: Search,
    desc: "Tìm kiếm tài liệu",
    emoji: "🔍",
  },
  {
    id: "community",
    label: "Cộng đồng",
    icon: Users,
    desc: "Kết nối & thảo luận",
    emoji: "👥",
  },
  {
    id: "quickstart",
    label: "Bắt đầu nhanh",
    icon: Zap,
    desc: "Hướng dẫn nhân viên mới",
    emoji: "⚡",
  },
];

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <aside className="w-72 bg-white border-r border-gray-200 min-h-screen shadow-sm">
      <div className="p-6">
        {/* Logo Section */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Social Knowledge Galaxy
          </h2>
          <p className="text-xs text-gray-500 font-medium">Vũ trụ Tri tuệ</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full group rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-4 p-4">
                  <div
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{item.label}</span>
                      <span className="text-lg">{item.emoji}</span>
                    </div>
                    <span
                      className={`text-xs ${
                        isActive ? "text-blue-500" : "text-gray-500"
                      }`}
                    >
                      {item.desc}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => setActiveView("upload")}
            className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg group"
          >
            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Tải lên nhanh</span>
            <span className="text-lg">🚀</span>
          </button>
        </div>

        {/* Achievement Card */}
        <div className="mt-8 p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-md">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              Chuyên gia Tri thức
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Người đóng góp Chuyên nghiệp
            </p>
            <div className="bg-gray-200 rounded-full p-1 mb-2">
              <div
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: "75%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">10 tài liệu đã chia sẻ</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
