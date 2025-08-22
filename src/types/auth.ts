export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}