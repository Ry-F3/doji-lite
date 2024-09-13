import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useProfileData } from "../../contexts/ProfileDataContext";

export default function TradeUploadList({ trigger }) {
  const [csvTrades, setCsvTrades] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const profileData = useProfileData(); // Use hook to get profile data

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options).replace(",", ""); // Remove comma for formatting
  };

  const tradesPerPage = 10; // Number of trades per page

  // Fetch CSV Trades based on the current page
  const fetchCsvTrades = useCallback(
    async (page) => {
      setIsLoading(true); // Start loading
      try {
        // const ownerProfile = profileData
        //   ? profileData.find((profile) => profile.isOwner)
        //   : null;
        // const ownerUsername = ownerProfile ? ownerProfile.owner : null;
        // console.log(ownerUsername);

        const response = await axios.get(
          `trades-csv/?page=${page}&search=royal90s`,
          {
            withCredentials: true, // Ensure cookies or tokens are sent along with the request
            headers: {
              // 'Accept': 'multipart/form-data',
              // 'Content-Type': 'multipart/form-data',
              // 'Access-Control-Allow-Origin': '*', // Modify this based on server-side CORS settings
              // 'Access-Control-Allow-Credentials': 'true',
            },
          });

        const ownerId = 1

        // console.log(ownerId);
        // console.log(ownerUsername);
        if (!ownerId) return; // Exit if ownerId is not available

        const filteredTrades = response.data.results.filter(
          (trade) => trade.owner === ownerId
        );
        setCsvTrades(filteredTrades);

        // Calculate total pages
        const totalTrades = response.data.count; // Total trades count
        setTotalPages(Math.ceil(totalTrades / tradesPerPage));

        setCurrentPage(page); // Update current page
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    },
    [ tradesPerPage]
  );

  useEffect(() => {
  
      fetchCsvTrades(currentPage);
   
  }, [fetchCsvTrades, currentPage, trigger]);

  // Pagination control functions
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage); // Set page to the next one
      fetchCsvTrades(nextPage); // Pass the nextPage value
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage); // Set page to the previous one
      fetchCsvTrades(prevPage); // Pass the prevPage value
    }
  };
  

  return (
    <>
      {isLoading ? (
        <p>Loading...</p> // Show loading spinner or message
      ) : csvTrades.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-sm text-sm table-borderless table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Asset</th>
                <th>Side</th>
                <th>Qty</th>
                <th>Filled</th>
                <th>L</th>
                <th>PNL</th>
                <th>PNL%</th>
                <th>Open</th>
                <th>Match</th>
              </tr>
            </thead>
            <tbody>
              {csvTrades.map((trade, index) => (
                <tr key={index}>
                  <td>{trade.id}</td>
                  <td>{formatDate(trade.order_time)}</td>
                  <td>{trade.underlying_asset}</td>
                  <td>{trade.side}</td>
                  <td>{trade.original_filled_quantity_formatted}</td>
                  <td>{trade.avg_fill_formatted}</td>
                  <td>{trade.leverage}</td>
                  <td>{trade.pnl_formatted}</td>
                  <td>{trade.pnl_percentage_formatted}</td>
                  <td>{trade.is_open ? "Yes" : "No"}</td>
                  <td>{trade.is_matched ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-sm btn-primary"
              onClick={goToPreviousPage}
              disabled={currentPage === 1} // Disable if on the first page
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="btn btn-sm btn-primary"
              onClick={goToNextPage}
              disabled={currentPage === totalPages} // Disable if on the last page
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No trades found.</p>
      )}
    </>
  );
}
