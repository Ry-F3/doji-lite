import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefaults";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosRes.get("/dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        // Optional: Redirect to sign-in if user not authenticated
        if (err.response?.status === 401) {
          history.push("/signin");
        }
      } finally {
        setInitialized(true);
      }
    };

    fetchUser();
  }, [history]);

  useEffect(() => {
    // Request Interceptor: Attach the access token to each request
    const requestInterceptor = axiosReq.interceptors.request.use(
      (config) => {
        const accessToken = currentUser?.accessToken; // Use state for accessToken
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    // Response Interceptor: Handle token refresh when receiving 401 Unauthorized
    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors (token expiration)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Refresh the token
            const refreshToken = currentUser?.refreshToken; // Use state for refreshToken
            if (!refreshToken) {
              throw new Error("No refresh token available");
            }

            const { data } = await axios.post("/dj-rest-auth/token/refresh/", {
              refresh: refreshToken,
            });

            // Update the currentUser state with new tokens
            setCurrentUser((prevUser) => ({
              ...prevUser,
              accessToken: data.access,
              refreshToken: prevUser.refreshToken, // Keep existing refresh token
            }));

            // Retry the original request with the new access token
            originalRequest.headers.Authorization = `Bearer ${data.access}`;
            return axiosReq(originalRequest);
          } catch (refreshError) {
            // Failed to refresh token
            setCurrentUser(null);
            history.push("/signin");
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [currentUser, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {initialized ? children : null}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};