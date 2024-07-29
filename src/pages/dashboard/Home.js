import React, { useState } from "react";
import { useProfileData } from "../../contexts/ProfileDataContext"; // Import the custom hook
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import ListItemButton from "@mui/material/ListItemButton";

const HomePage = () => {
  const profileData = useProfileData(); // Access profile data from context
  const [showDetails, setShowDetails] = useState(false); // State to toggle details display
  const currentUser = useCurrentUser(); // Get the current user

  const handleToggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  // Log data for debugging
  console.log("Current User:", currentUser);
  console.log("Profile Data:", profileData);

  // Find the profile that belongs to the current user
  const userProfile = profileData?.find(
    (profile) => profile.owner === currentUser?.username
  );

  return (
    <div style={styles.container}>
      <h1>Welcome to the Home Page!</h1>
      <ListItemButton style={styles.button} onClick={handleToggleDetails}>
        {showDetails ? "Hide" : "Show"} User Details
      </ListItemButton>
      {showDetails && (
        <div style={styles.profileContainer}>
          <h2>User Details:</h2>
          {currentUser ? (
            userProfile ? (
              <>
                <p>
                  <strong>username:</strong> {userProfile.owner}
                </p>
                <p>
                  <strong>id:</strong> {userProfile.id}
                </p>
                <p>
                  <strong>is_owner:</strong>{" "}
                  {userProfile.isOwner ? "True" : "False"}
                </p>
                <p>
                  <strong>image:</strong> {userProfile.image}
                </p>
                {/* Add more fields as necessary */}
              </>
            ) : (
              <p>User profile not found</p>
            )
          ) : (
            <p>User not logged in</p>
          )}
        </div>
      )}
    </div>
  );
};

// Simple inline styles for demonstration purposes
const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  profileContainer: {
    marginTop: "20px",
    textAlign: "left",
  },
};

export default HomePage;
