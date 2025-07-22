import { create } from 'zustand'
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import {io} from 'socket.io-client'
import { useNavigate } from 'react-router-dom';
const BASE_URL=import.meta.env.MODE === "development"?"http://localhost:5000/api":"/";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    const socket = get();
    try {
      const res = await axiosInstance.get('/auth/check', {
        withCredentials: true
      });
      set({ authUser: res.data });
      //Initialize socket when user authenticated as loggend in or signuped
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
      console.log("checkAuth error: ", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data })
      toast.success("Account created successfully");
      //Initialize socket when user signup
      get().connectSocket();

    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isSigningUp: false })
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in");
      //Initialize socket when user login
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      axiosInstance.post("/auth/logout");
      set({ authUser: null })
      toast.success("Logged out");
      get().disConnectSocket();
    } catch (error) {
      toast.error(error.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile: ", error);
      toast.error(error.response.data.message)
    } finally {
      set({ isUpdatingProfile: false });
    }
  }, 
  
  connectSocket: () => {
    const {authUser} = get();
    if(!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL,{
      query:{
        userId:authUser._id,
      }
    }); 
    socket.connect(); 
    set({socket:socket});
    socket.on("getOnlineUsers",(userIds)=>{
    set({onlineUsers:userIds});
    })
   },
 
  disConnectSocket: () => {
    if(get().socket?.connected) {
      get().socket.disconnect();
    }
   },
}));