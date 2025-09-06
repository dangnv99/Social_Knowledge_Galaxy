export interface Document {
  id: string;
  title: string;
  content: string;
  summary: string;
  tags: string[];
  author: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  visibility: 'private' | 'group' | 'public';
  rating: number;
  totalRatings: number;
  views: number;
  fileType?: 'doc' | 'pdf' | 'image' | 'text';
  fileName?: string;
  fileSize?: number;
  department: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  authorId: string;
  content: string;
  createdAt: string;
  reactions: Reaction[];
}

export interface Reaction {
  emoji: string;
  users: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  isAuthenticated: boolean;
  permissions: string[];
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Activity {
  id: string;
  userId: string;
  user: string;
  action: string;
  target: string;
  targetId: string;
  timestamp: string;
  type: 'upload' | 'view' | 'rate' | 'comment' | 'share';
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  isLoading: boolean;
  error: string | null;
}

export interface SearchFilters {
  query: string;
  tags: string[];
  dateRange: {
    from?: string;
    to?: string;
  };
  department: string;
  visibility: string;
  fileType: string;
}

export interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
}