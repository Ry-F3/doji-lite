import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function TradeUploadButton() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const fileInputRef = useRef(null); // To reference the hidden input element

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Trigger the hidden input when the button is clicked
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle the file upload
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file.');
      return;
    }

    setLoading(true); // Show loading indicator

    const formData = new FormData();
    formData.append('file', file);
    formData.append('exchange', 'BloFin'); // Adjust exchange field as needed

    try {
      const response = await axios.post('upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
       
      });

      // Set both success status and API response message
      setUploadStatus(`Success: ${response.data.message}`);
    } catch (error) {
      // Show error message from API if available
      setUploadStatus(`Error: ${error.response?.data?.error || 'Something went wrong!'}`);
    } finally {
      setLoading(false); // Hide loading indicator

      // Clear the message after 5 seconds
      setTimeout(() => {
        setUploadStatus('');
      }, 5000);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        {/* Hidden file input */}
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef} // Reference to the hidden input
          style={{ display: 'none' }} // Hide the default input
          onChange={handleFileChange}
        />

        {/* Custom button to trigger file picker */}
        <button type="button" onClick={handleButtonClick}>
          Choose File
        </button>

        {/* Display the selected file name */}
        {file && <p>Selected File: {file.name}</p>}

        {/* Submit button to upload the file */}
        <button type="submit" disabled={!file || loading}>
          {loading ? 'Uploading...' : 'Upload CSV'}
        </button>
      </form>

      {/* Loading spinner */}
      {loading && <p>Loading...</p>}

      {/* Show the upload status */}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}
