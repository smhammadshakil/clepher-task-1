import React, { useState } from "react";
import { fetchStockData } from "../services/alphaVantageService";
import StockTableRow from "./StockTableRow";
import Pagination from "./Pagination";
import StockMetadataCard from "./StockMetadataCard";
import StockChart from "./StockChart";
import { Stocks } from "../types/stocks";

const ITEMS_PER_PAGE = 10;

const StockTable: React.FC = () => {
  const [symbol, setSymbol] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [metadata, setMetadata] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // const handleFetchData = async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const url = getUrl(symbol);
  //     const response = await fetch(url);
  //     const result = await response.json();

  //     if (result["Time Series (Daily)"] && result["Meta Data"]) {
  //       const stockData = Object.keys(result["Time Series (Daily)"]).map((date) => ({
  //         date,
  //         open: result["Time Series (Daily)"][date]["1. open"],
  //         high: result["Time Series (Daily)"][date]["2. high"],
  //         low: result["Time Series (Daily)"][date]["3. low"],
  //         close: result["Time Series (Daily)"][date]["4. close"],
  //         volume: result["Time Series (Daily)"][date]["5. volume"],
  //       }));

  //       setData(stockData);
  //       setMetadata(result["Meta Data"]);
  //       setCurrentPage(1); // Reset to first page on new fetch
  //     } else {
  //       throw new Error(result["Error Message"] || "Invalid API response");
  //     }
  //   } catch (err: any) {
  //     setError(err.message || "Failed to fetch data");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const stocks: Stocks = await fetchStockData(symbol)

      setData(stocks.stockData);
      setMetadata(stocks.metaData);
      setCurrentPage(1); // Reset to first page on new fetch
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Stock Data Viewer</h1>
      <div className="flex items-center justify-center mb-6">
        <input
          type="text"
          className="border rounded-lg px-4 py-2 w-96"
          placeholder="Enter Stock Symbol (e.g., AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button
          onClick={handleFetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-blue-600"
        >
          Fetch Data
        </button>
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {metadata && (
        <StockMetadataCard
          info={metadata["1. Information"]}
          symbol={metadata["2. Symbol"]}
          lastRefreshed={metadata["3. Last Refreshed"]}
          outputSize={metadata["4. Output Size"]}
          timeZone={metadata["5. Time Zone"]}
        />
      )}
      {paginatedData.length > 0 && (
        <>
          <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="border bg-gray-200 border-gray-300 px-4 py-2">Date</th>
                <th className="border bg-gray-200 border-gray-300 px-4 py-2">Open</th>
                <th className="border bg-gray-200 border-gray-300 px-4 py-2">High</th>
                <th className="border bg-gray-200 border-gray-300 px-4 py-2">Low</th>
                <th className="border bg-gray-200 border-gray-300 px-4 py-2">Close</th>
                <th className="border bg-gray-200 border-gray-300 px-4 py-2">Volume</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <StockTableRow
                  key={index}
                  date={row.date}
                  open={row.open}
                  high={row.high}
                  low={row.low}
                  close={row.close}
                  volume={row.volume}
                />
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {paginatedData.length > 0 && (
        <>
          <StockChart data={paginatedData} />
        </>
      )}
    </div>
  );
};

export default StockTable;