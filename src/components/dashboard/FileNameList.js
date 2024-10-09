import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileNameList = ({ fileNames, onDeleteSuccess, isLoading }) => {
    const [deleting, setDeleting] = useState({}); // Track which files are being deleted

    // Log the filenames prop whenever it changes
    useEffect(() => {
        console.log('File names prop changed:', fileNames);
    }, [fileNames]); // Dependency array to run effect when fileNames changes

    const handleDelete = async (id, retries = 3) => {
        // Optimistic UI: remove the file from the list before confirming
        setDeleting({ ...deleting, [id]: true });

        try {
            await axios.delete(`filenames/delete/${id}`); // Adjust the endpoint based on API structure
            console.log(`File with ID ${id} deleted successfully.`);

            // Call the onDeleteSuccess callback if provided
            if (onDeleteSuccess) {
                onDeleteSuccess(); // This will refresh the data in the parent component
            }
        } catch (error) {
            console.error(`Error deleting file with ID ${id}:`, error);
    
            if (retries > 0) {
                console.log(`Retrying deletion for file ID ${id} (${retries} retries left)...`);
                // Optional: wait before retrying
                await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second before retrying
                handleDelete(id, retries - 1); // Retry
            } else {
                // Handle the error after all retries failed
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                    // Notify the user about the failure
                    alert(`Failed to delete file with ID ${id}: ${error.response.data.message || 'Unknown error'}`);
                } else {
                    console.error(`Failed to delete file with ID ${id} after retries.`);
                    alert(`Failed to delete file with ID ${id}. Please try again later.`);
                }
            }
        } finally {
            // Ensure the deleting state is reset regardless of success or failure
            setDeleting((prev) => ({ ...prev, [id]: false }));
        }
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading files...</p>
            ) : fileNames.length === 0 ? (
                <p>No files found.</p>
            ) : (
                fileNames.map((fileName) => (
                    <div key={fileName.id}>
                        {fileName.file_name} 
                        <button 
                            onClick={() => handleDelete(fileName.id)} 
                            disabled={deleting[fileName.id]}
                        >
                            {deleting[fileName.id] ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default FileNameList;
