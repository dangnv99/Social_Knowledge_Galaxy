import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import LoginPage from './components/Auth/LoginPage';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Views/Dashboard';
import Upload from './components/Views/Upload';
import DocumentList from './components/Views/DocumentList';
import Search from './components/Views/Search';
import Community from './components/Views/Community';
import DocumentViewer from './components/Views/DocumentViewer';
import QuickStart from './components/Views/QuickStart';
import Analytics from './components/Views/Analytics';
import { useApp } from './contexts/AppContext';

function AppContent() {
  const [activeView, setActiveView] = useState('dashboard');
  const { selectedDocument, setSelectedDocument, user, setActiveView: setAppActiveView } = useApp();

  // Sync activeView with context
  React.useEffect(() => {
    setAppActiveView(activeView);
  }, [activeView, setAppActiveView]);

  if (!user.isAuthenticated) {
    return <LoginPage />;
  }

  const handleUploadClick = () => {
    setActiveView('upload');
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setSelectedDocument(null); // Clear selected document when changing views
  };

  const renderView = () => {
    if (selectedDocument) {
      return <DocumentViewer />;
    }

    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'upload': return <Upload />;
      case 'documents': return <DocumentList />;
      case 'quickstart': return <QuickStart />;
      case 'search': return <Search />;
      case 'community': return <Community />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Professional Background Elements */}

      <Header onUploadClick={handleUploadClick} />
      
      <div className="flex">
        <Sidebar activeView={activeView} setActiveView={handleViewChange} />
        <main className="flex-1">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;