import { getUrl } from "../constants";
import { Stocks } from "../types/stocks";

export const fetchStockData = async (symbol: string): Promise<Stocks> => {
  const url = getUrl(symbol);
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result["Time Series (Daily)"] && result["Meta Data"]) {
      const stockData = Object.keys(result["Time Series (Daily)"]).map((date) => ({
        date,
        open: result["Time Series (Daily)"][date]["1. open"],
        high: result["Time Series (Daily)"][date]["2. high"],
        low: result["Time Series (Daily)"][date]["3. low"],
        close: result["Time Series (Daily)"][date]["4. close"],
        volume: result["Time Series (Daily)"][date]["5. volume"],
      }));

      return { stockData, metaData: result["Meta Data"] };
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};