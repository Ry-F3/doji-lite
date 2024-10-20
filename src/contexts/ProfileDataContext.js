import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "./CurrentUserContext";
import { keysToCamelCase } from "../utils/CamelCase";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (currentUser) {
        try {
          // Fetch profile data using the current user's profile ID
          const { data } = await axios.get(`/profiles/${currentUser?.pk}`);
          
          // Convert the data to camelCase using the utility function
          const camelCasedData = keysToCamelCase(data);
          
          // Log the camelCased profile data
          console.log("Fetched Profile Data (camelCased):", camelCasedData);
          console.log("Current User:", currentUser)
          setProfileData(camelCasedData);
          
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (currentUser) {
      fetchProfileData();
    }
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
