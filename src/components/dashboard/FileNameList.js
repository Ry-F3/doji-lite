import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileNameList = () => {
    const [fileNames, setFileNames] = useState([]);
    const [deleting, setDeleting] = useState({}); // Track which files are being deleted

    const fetchFileNames = async () => {
        try {
            const response = await axios.get('filenames/');
            console.log('Response Status:', response.status);
            console.log('Response Data:', response.data); // Log the response data

            if (Array.isArray(response.data.results)) {
                setFileNames(response.data.results);
            } else {
                console.error('Expected an array but got:', response.data.results);
            }
        } catch (error) {
            console.error('Error fetching file names:', error);
        }
    };

    const handleDelete = async (id, retries = 3) => {
        // Optimistic UI: remove the file from the list before confirming
        setFileNames(fileNames.filter(fileName => fileName.id !== id));
        setDeleting({ ...deleting, [id]: true });

        try {
            await axios.delete(`filenames/delete/${id}/`); // Adjust the endpoint based on API structure
            console.log(`File with ID ${id} deleted successfully.`);
            // Optionally: show a success message or perform further UI updates
        } catch (error) {
            console.error(`Error deleting file with ID ${id}:`, error);

            if (retries > 0) {
                console.log(`Retrying deletion for file ID ${id} (${retries} retries left)...`);
                handleDelete(id, retries - 1);
            } else {
                console.error(`Failed to delete file with ID ${id} after retries.`);
                // Restore the file in the UI if deletion fails
                fetchFileNames();
            }
        } finally {
            setDeleting({ ...deleting, [id]: false });
        }
    };

    useEffect(() => {
        fetchFileNames();
    }, []);

    return (
        <div>
            {fileNames.length === 0 ? (
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
