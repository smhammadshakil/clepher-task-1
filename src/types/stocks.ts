
interface StockDataItem {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
}


export type Stocks = {
  stockData: StockDataItem[];
  metaData: MetaData;
}
