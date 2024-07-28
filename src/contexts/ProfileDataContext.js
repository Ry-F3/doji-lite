import React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);

  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/");
        // Transform the API response to camelCase
        const camelCaseData = data.map((profile) => ({
          id: profile.id,
          owner: profile.owner,
          createdAt: profile.created_at,
          updatedAt: profile.updated_at,
          firstName: profile.first_name,
          lastName: profile.last_name,
          content: profile.content,
          image: profile.image,
          isOwner: profile.is_owner,
        }));
        setProfileData(camelCaseData);
      } catch (err) {
        console.error("Error fetching profile data", err);
      }
    };
    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
