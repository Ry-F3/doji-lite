// import React from 'react';
// import axios from 'axios';
// import { Button, Alert } from 'react-bootstrap';

// const DeleteAllTradesButton = ({ onDeleteSuccess, refreshData }) => {
//     const [isDeleting, setIsDeleting] = React.useState(false);
//     const [error, setError] = React.useState(null);
//     const [successMessage, setSuccessMessage] = React.useState('');

//     const handleDelete = async () => {
//         setIsDeleting(true);
//         setError(null);
//         setSuccessMessage('');

//         try {
//             const response = await axios.delete('trades-csv/delete-all/', {
//                 // You might need to add headers or other settings here if required
//             });
//             setSuccessMessage(response.data.message);
//             onDeleteSuccess(); // Notify parent component about the success
//             if (refreshData) {
//                 refreshData(); // Trigger a refresh of the trades data
//             }
//         } catch (error) {
//             setError(error.response?.data?.message || 'An error occurred');
//         } finally {
//             setIsDeleting(false);
//         }
//     };
 
//     return (
//         <div>
//             <Button 
//                 variant="danger" 
//                 onClick={handleDelete} 
//                 disabled={isDeleting}
//             >
//                 {isDeleting ? 'Deleting...' : 'Delete All Trades and Live Trades'}
//             </Button>
//             {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
//             {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
//         </div>
//     );
// };

// export default DeleteAllTradesButton;
