import React, { useState } from "react";
import { Eye, EyeOff, Shield, Zap, Lock } from "lucide-react";
import { useApp } from "../../contexts/AppContext";

export default function LoginPage() {
  const { login, authState } = useApp();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 👇 Gọi API trước
      const res = await fetch(
        "https://ced24b621922.ngrok-free.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      if (!res.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await res.json();

      // ✅ Lưu token vào localStorage
      localStorage.setItem("accessToken", data.accessToken);

      // 👉 Gọi login() để update state + điều hướng
      await login(credentials);
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Social Knowledge Galaxy
          </h1>
          <p className="text-gray-400">Universe of Collaborative Wisdom</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={credentials.username}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 pr-12 text-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {(authState.error || error) && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm">
                {authState.error || error}
              </div>
            )}

            <button
              type="submit"
              disabled={authState.isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 flex items-center justify-center"
            >
              {authState.isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Launching...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Enter Galaxy
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-gray-400 text-sm flex justify-center items-center space-x-2">
          <Shield className="w-4 h-4" />
          <span>Secured by Enterprise Authentication</span>
        </div>
      </div>
    </div>
  );
}
