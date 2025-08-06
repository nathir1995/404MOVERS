import { ACCOUNT_STATUS } from "@/constants/account_status";
import { ROLE } from "@/constants/roles";
import React from "react";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  user_role: {
    key: ROLE;
  };
}

interface AuthContextType {
  user: User | null;
  role: ROLE | null;
  accountStatus: ACCOUNT_STATUS | null;
  setAccountStatus: (newStatus: ACCOUNT_STATUS | null) => void;
  token: string;
  isAuthenticated: boolean;
  error: any | null;
  isLoading: boolean;
  loadingInitial: boolean;

  loginViaEmail: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
  loginViaPhone: ({
    phone,
    password,
  }: {
    phone: string;
    password: string;
  }) => void;
  logout: () => void;
  clearError: () => void;

  openedChatId: number | null;
  setOpenedChatId: React.Dispatch<React.SetStateAction<number | null>>;
}

export default AuthContextType;
