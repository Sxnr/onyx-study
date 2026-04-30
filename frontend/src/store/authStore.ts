import { create } from "zustand";

interface User {
  id: string;
  nombre: string;
  email: string;
  nivel: number;
  exp: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  sumarExp: (cantidad: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setAuth: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
  sumarExp: (cantidad) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, exp: (state.user.exp || 0) + cantidad }
        : null,
    })),
}));
