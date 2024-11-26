
interface StockTableRowProps {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

const StockTableRow: React.FC<StockTableRowProps> = ({ date, open, high, low, close, volume }) => {
  return (
    <tr className="text-center">
      <td className="border border-gray-300 px-4 py-2">{date}</td>
      <td className="border border-gray-300 px-4 py-2">{open}</td>
      <td className="border border-gray-300 px-4 py-2">{high}</td>
      <td className="border border-gray-300 px-4 py-2">{low}</td>
      <td className="border border-gray-300 px-4 py-2">{close}</td>
      <td className="border border-gray-300 px-4 py-2">{volume}</td>
    </tr>
  );
};

export default StockTableRow;