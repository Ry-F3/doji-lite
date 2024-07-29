import React, { useState } from "react";
import axios from "axios";

// Utility function to convert camelCase to snake_case
const toSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const toSnakeCaseData = (data) => {
  const newData = {};
  for (const key in data) {
    newData[toSnakeCase(key)] = data[key];
  }
  return newData;
};

const TradeForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    symbol: "",
    longShort: "long",
    margin: "",
    leverage: "",
    entryPrice: "",
    isTradeClosed: false,
  });

  // State to hold the current price (fetched from API)
  const [currentPrice, setCurrentPrice] = useState("");

  // State for handling success or error messages
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to fetch the current price based on the stock symbol
  const fetchCurrentPrice = async (symbol) => {
    try {
      const response = await axios.get(`/search-asset/?symbol=${symbol}`);
      setCurrentPrice(response.data.price || response.data.latestPrice);
    } catch (error) {
      console.error("Error fetching current price:", error);
      setError("Failed to fetch current price. Please try again.");
    }
  };

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      // Transform data to snake_case
      const snakeCaseData = toSnakeCaseData(formData);

      // Make a POST request to the API
      await axios.post("/trades/post", snakeCaseData);

      // Show success message
      setMessage("Trade successfully created!");
    } catch (error) {
      // Handle errors
      console.error(
        "Error creating trade:",
        error.response?.data || error.message
      );
      setError("Failed to create trade. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Create a New Trade</h1>
      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="symbol">Symbol:</label>
          <input
            type="text"
            id="symbol"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
            onBlur={() => fetchCurrentPrice(formData.symbol)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="longShort">Long/Short:</label>
          <select
            id="longShort"
            name="longShort"
            value={formData.longShort}
            onChange={handleChange}>
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="margin">Margin:</label>
          <input
            type="number"
            id="margin"
            name="margin"
            value={formData.margin}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="leverage">Leverage:</label>
          <input
            type="number"
            id="leverage"
            name="leverage"
            value={formData.leverage}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="entryPrice">Entry Price:</label>
          <input
            type="number"
            id="entryPrice"
            name="entryPrice"
            value={formData.entryPrice}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="isTradeClosed">Trade Closed:</label>
          <input
            type="checkbox"
            id="isTradeClosed"
            name="isTradeClosed"
            checked={formData.isTradeClosed}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={styles.button}>
          Submit Trade
        </button>
      </form>
      {currentPrice && (
        <p style={styles.info}>
          Current Price: <strong>{currentPrice}</strong>
        </p>
      )}
    </div>
  );
};

// Simple inline styles
const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formGroup: {
    marginBottom: "15px",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  success: {
    color: "green",
  },
  error: {
    color: "red",
  },
  info: {
    marginTop: "20px",
  },
};

export default TradeForm;
