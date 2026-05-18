// Auth Types & Interfaces

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message: string;
}

export interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

export interface User {
  userName: string;
  role: string;
}
