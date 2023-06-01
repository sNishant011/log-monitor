import { AuthBindings } from "@refinedev/core";
import { AxiosError } from "axios";
import { USER_KEY } from "../constants";
import { ErrorResponseBody, LoginResponse, User } from "../types";
import axiosInstance from "../utils/axiosInstance";

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    if (email && password) {
      console.log(email, password);
      try {
        const response = await axiosInstance.post<LoginResponse>("/auth/login", {
          email,
          password,
        });
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
        return {
          success: true,
          redirectTo: "/",
        };
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponseBody>;
        return {
          success: false,
          error: {
            name: axiosError.response?.data?.error || "Login Error",
            message: axiosError.response?.data.message || "Invalid username or password",
          },
        };
      }
    }

    return {
      success: false,
      error: {
        name: "Login Error",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    return axiosInstance
      .get<{ message: string }>("/auth/logout")
      .then(() => {
        localStorage.removeItem(USER_KEY);
        return {
          success: true,
          redirectTo: "/login",
        };
      })
      .catch(() => {
        return {
          success: false,
        };
      });
  },
  check: async () => {
    const userLocal = localStorage.getItem(USER_KEY);
    if (userLocal && JSON.parse(userLocal)) {
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const userLocal = localStorage.getItem(USER_KEY);
    if (userLocal && JSON.parse(userLocal)) {
      return Promise.resolve(JSON.parse(userLocal));
    } else {
      return axiosInstance
        .get<User>("users/profile")
        .then((response) => {
          localStorage.setItem(USER_KEY, JSON.stringify(response.data));
          return response.data;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
  },
  onError: async (error) => {
    return { error };
  },
};
