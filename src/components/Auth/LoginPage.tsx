import React, { useState } from 'react';
import { Eye, EyeOff, Shield, Zap, Lock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function LoginPage() {
  const { login, authState } = useApp();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Subtle geometric patterns */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-40 w-80 h-80 bg-indigo-500/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating dots */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <div className="relative">
              <Zap className="w-10 h-10 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs">✨</span>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Social Knowledge Galaxy</h1>
          <p className="text-gray-400">Universe of Collaborative Wisdom</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Access Your Universe</h2>
            <p className="text-gray-400 text-sm">Enter your knowledge galaxy</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {authState.error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm">
                {authState.error}
              </div>
            )}

            <button
              type="submit"
              disabled={authState.isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {authState.isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Launching...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Enter Galaxy</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">Demo Access</p>
              <div className="bg-slate-700/30 rounded-lg p-3 text-sm">
                <p className="text-gray-300">Username: <span className="text-blue-400 font-mono">admin</span></p>
                <p className="text-gray-300">Password: <span className="text-blue-400 font-mono">admin123</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
            <Shield className="w-4 h-4" />
            <span>Secured by Enterprise Authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
}