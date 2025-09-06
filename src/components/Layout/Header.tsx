import React from "react";
import { Search, Zap, LogOut } from "lucide-react";
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

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      if (token) {
        await fetch("https://b1b58c8a8d8f.ngrok-free.app/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Xóa token và gọi context logout
      localStorage.removeItem("accessToken");
      logout();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
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

          {/* Search */}
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

          {/* Logout */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Đăng xuất</span>
            </button>
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
