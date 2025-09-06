import React from "react";
import {
  Search,
  Bell,
  Settings,
  User,
  Zap,
  LogOut,
  ChevronDown,
  Plus,
} from "lucide-react";
import { useApp } from "../../contexts/AppContext";

interface HeaderProps {
  onUploadClick: () => void;
}

export default function Header({ onUploadClick }: HeaderProps) {
  const { user, searchFilters, setSearchFilters, logout } = useApp();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = () => {
      if (showUserMenu) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Social Knowledge Galaxy
                </h1>
                <p className="text-xs text-gray-500">Vũ trụ Tri tuệ</p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu, người dùng, chủ đề..."
                value={searchFilters.query}
                onChange={(e) => setSearchFilters({ query: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-full py-3 pl-12 pr-16 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                  <Search className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Đăng xuất</span>
            </button>

            <div className="relative">
              {/* {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-gray-200 shadow-xl py-2">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-gray-900 font-medium">{user.name}</p>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                    <p className="text-gray-500 text-xs">{user.department}</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Cài đặt Hồ sơ</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Tùy chọn</span>
                    </button>
                  </div>
                  <div className="border-t border-gray-200 py-2">
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}
    </header>
  );
}
