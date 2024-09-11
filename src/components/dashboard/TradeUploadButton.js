import React, { useState, useRef } from "react";
import axios from "axios";

export default function TradeUploadButton({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Trigger the hidden input when the button is clicked
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileClearClick = (event) => {
    event.preventDefault();
    setFile(null);
    fileInputRef.current.value = null;
  };

  const axiosInstance = axios.create({
    timeout: 160000, // Timeout set to 60 seconds
    withCredentials: true,
  });
  
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }
  
    setLoading(true);

    // Capture the start time
    const startTime = new Date().getTime();
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("exchange", "BloFin");
  
    let lastError = null; // Initialize lastError outside the try-catch block
  
    try {
      let response;
  
      for (let i = 0; i < 3; i++) { // Retry up to 3 times
        try {
          setUploadStatus(`Attempting upload (${i + 1}/3)...`);
          response = await axiosInstance.post("upload/", formData);
          break; // Exit loop if successful
        } catch (error) {
          lastError = error; // Update lastError on each failed attempt
          if (i === 2) throw error; // Rethrow after last attempt
        }
      }
  
      // Calculate time taken
      const endTime = new Date().getTime();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Time in seconds
  
      // Set success status and API response message
      if (response) {
        setUploadStatus(`Success: ${response.data.message}. Time taken: ${timeTaken} seconds.`);
        onUploadSuccess();
        setFile(null);
        fileInputRef.current.value = null;
      }
    } catch (error) {
      // Calculate time taken in case of error
      const endTime = new Date().getTime();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Time in seconds
  
      // Use lastError if available, or default error message
      setUploadStatus(
        `Error: ${lastError?.response?.data?.error || "Something went wrong!"}. Time taken: ${timeTaken} seconds.`
      );
    } finally {
      setLoading(false);
  
      // Clear the message after 5 seconds
      setTimeout(() => {
        setUploadStatus("");
      }, 9000);
    }
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleUpload}>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {!file ? (
          <button
            className="btn btn-primary mb-2"
            type="button"
            onClick={handleButtonClick}>
            Choose CSV File
          </button>
        ) : (
          <div>
            <button
              type="submit"
              className="btn btn-success mb-2"
              disabled={!file || loading}>
              {loading ? "Uploading..." : "Upload CSV"}
            </button>

            <div className="d-flex align-items-center">
              <p className="mb-0 flex-grow-1">{file.name}</p>
              <button
                onClick={handleFileClearClick}
                type="button"
                className="btn btn-transparent btn-sm">
                x
              </button>
            </div>
          </div>
        )}
      </form>

      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}
