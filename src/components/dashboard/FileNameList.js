import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileNameList = () => {
    const [fileNames, setFileNames] = useState([]);

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`filenames/delete/${id}/`); // Adjust the endpoint based on your API structure
            setFileNames(fileNames.filter(fileName => fileName.id !== id)); // Update the state to remove the deleted file
            console.log(`File with ID ${id} deleted successfully.`);
            // Reload the page after successful deletion
            window.location.reload();
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    useEffect(() => {
        fetchFileNames();
    }, []);

    return (
        <div>
            {fileNames.map((fileName) => (
                <div key={fileName.id}>
                    {fileName.file_name} 
                    <button onClick={() => handleDelete(fileName.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default FileNameList;
