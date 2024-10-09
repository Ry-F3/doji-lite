import axios from "axios";
import React, { useCallback, useEffect, useState, useRef } from "react";
import objectHash from "object-hash";
import Styles from "../../styles/dummyboxes/DummyTable.module.css";

export default function TradeUploadList({
  trigger,
  allProcessed,
  setAllProcessed,
}) {
  const [csvTrades, setCsvTrades] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [allProcessed, setAllProcessed] = useState(false); // New state to check if all trades are processed

  const previousTradesHashRef = useRef(""); // Stores hash of the previous trades
  const unchangedCounterRef = useRef(0); // Tracks how many times no change has occurred
  const maxUnchangedChecks = 1; // Stop polling after 5 unchanged intervals
  const pollingInterval = 10000; // Poll every 60 seconds

  const tradesPerPage = 10;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };

  const haveTradesChanged = (oldTradesHash, newTrades) => {
    const newTradesHash = objectHash(newTrades);

    if (oldTradesHash !== newTradesHash) {
      console.log("Trades have changed.");
      return true;
    }
    console.log("No trade changes detected.");
    return false;
  };

  const fetchCsvTrades = useCallback(
    async (page) => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `trades-csv/?page=${page}&search=royal90s`,
          {
            withCredentials: true,
          }
        );

        const ownerId = 1;
        if (!ownerId) return;

        const filteredTrades = response.data.results.filter(
          (trade) => trade.owner === ownerId
        );

        // Compare current trades with previous trades hash
        if (haveTradesChanged(previousTradesHashRef.current, filteredTrades)) {
          setCsvTrades(filteredTrades);
          previousTradesHashRef.current = objectHash(filteredTrades); // Update the hash reference
          unchangedCounterRef.current = 0; // Reset the unchanged counter if trades have changed
        } else {
          unchangedCounterRef.current++; // Increment the unchanged counter
          if (unchangedCounterRef.current >= maxUnchangedChecks) {
            console.log("Stopping polling after repeated unchanged checks.");
            return; // Exit the fetch early if no changes have been detected
          }
        }

        const totalTrades = response.data.count;
        setTotalPages(Math.ceil(totalTrades / tradesPerPage));
        setCurrentPage(page);

        // Check if all trades are processed
        const allProcessed = filteredTrades.every(
          (trade) => trade.is_processed
        );
        setAllProcessed(allProcessed); // Set the flag
      } catch (error) {
        console.error("Error fetching trades:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setAllProcessed, tradesPerPage]
  );

  // Poll every `pollingInterval` to check if all trades are processed
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!allProcessed) {
        console.log("Polling: all trades not processed yet, fetching again...");
        fetchCsvTrades(currentPage); // Refetch trades if all are not processed
      }
    }, pollingInterval);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [allProcessed, fetchCsvTrades, currentPage]);

  // Initial fetch and monitor for changes
  useEffect(() => {
    fetchCsvTrades(currentPage); // Initial fetch

    // Only refetch if all trades are not processed
    if (!allProcessed) {
      console.log("Not all trades processed, refetching...");
      fetchCsvTrades(currentPage);
    }
  }, [fetchCsvTrades, currentPage, trigger, allProcessed]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchCsvTrades(nextPage);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchCsvTrades(prevPage);
    }
  };

  const hasFieldChanged = (field, currentTrade, previousTrade) => {
    return currentTrade[field] !== previousTrade[field];
  };

  // Dummy loading rows for the table
  const renderLoadingRows = () => {
    return Array.from({ length: 10 }, (_, index) => (
      <tr key={index} style={{ opacity: 0.5 }}>
        <td>
          <div className={Styles.Placeholder} />
        </td>
        <td>
          <div className={Styles.Placeholder} />
        </td>
        <td>
          <div className={Styles.Placeholder} />
        </td>
        <td>
          <div className={Styles.Placeholder} />
        </td>
        <td>
          <div className={Styles.Placeholder} />
        </td>
        <td>
          <div className={Styles.Placeholder} />
        </td>
        <td>
          <div className={Styles.Placeholder} />
        </td>
        <td>
          <div className={Styles.Placeholder} />
        </td>
        <td>
          <div className={Styles.Placeholder} />
        </td>
        <td>
          <div className={Styles.Placeholder} />
        </td>
        <td>
          <div className={Styles.Placeholder} />
        </td>
      </tr>
    ));
  };

  // Dummy loading header blocks
const renderLoadingHeader = () => {
  return (
    <tr className={Styles.Header}>
      <th><div className={`${Styles.Header} ${Styles.Short}`} /></th>
      <th><div className={`${Styles.Header} ${Styles.Medium}`} /></th>
      <th><div className={Styles.Header} /></th>
      <th><div className={`${Styles.Header} ${Styles.Short}`} /></th>
      <th><div className={`${Styles.Header} ${Styles.Medium}`} /></th>
      <th><div className={Styles.Header} /></th>
      <th><div className={`${Styles.Header} ${Styles.Short}`} /></th>
      <th><div className={`${Styles.Header} ${Styles.Medium}`} /></th>
      <th><div className={Styles.Header} /></th>
      <th><div className={`${Styles.Header} ${Styles.Short}`} /></th>
      <th><div className={`${Styles.Header} ${Styles.Medium}`} /></th>
    </tr>
  );
};

  return (
    <>
      {isLoading ? (
        <div className="table-responsive">
          <table className="table table-sm text-sm table-borderless">
            <thead>{renderLoadingHeader()}</thead>
            <tbody>{renderLoadingRows()}</tbody>
          </table>
        </div>
      ) : csvTrades.length > 0 ? (
        <div className="table-responsive">
          {/* Show message if trades are not fully processed */}
          {!allProcessed && <p>Trade matching in progress...</p>}

          <table className="table table-sm text-sm table-borderless table-hover">
            <thead className="rounded">
              <tr className={`${Styles.Header} text-muted`}>
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
              {csvTrades.map((trade, index) => {
                const prevTrade = previousTradesHashRef.current[index] || {};

                return (
                  <tr key={trade.id}>
                    <td>{trade.id}</td>
                    <td>{formatDate(trade.order_time)}</td>
                    <td>{trade.underlying_asset}</td>
                    <td>{trade.side}</td>
                    <td>{trade.original_filled_quantity_formatted}</td>
                    <td>{trade.avg_fill_formatted}</td>
                    <td>{trade.leverage}</td>
                    <td>{trade.pnl_formatted}</td>
                    <td>{trade.pnl_percentage_formatted}</td>

                    {/* Render Open column conditionally */}
                    <td
                      style={{
                        backgroundColor: hasFieldChanged(
                          "is_open",
                          trade,
                          prevTrade
                        )
                          ? "transparent"
                          : "transparent",
                      }}>
                      {trade.is_open ? "Yes" : "No"}
                    </td>

                    {/* Render Match column conditionally */}
                    <td
                      style={{
                        backgroundColor: hasFieldChanged(
                          "is_matched",
                          trade,
                          prevTrade
                        )
                          ? "transparent"
                          : "transparent",
                      }}>
                      {trade.is_matched ? "Yes" : "No"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-sm btn-primary"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}>
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="btn btn-sm btn-primary"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-sm text-sm table-borderless">
            <thead>{renderLoadingHeader()}</thead>
            <tbody>{renderLoadingRows()}</tbody>
          </table>
        </div>
      )}
    </>
  );
}
