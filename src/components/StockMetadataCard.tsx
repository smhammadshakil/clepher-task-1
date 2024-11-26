
interface StockMetadataCardProps {
  info: string;
  symbol: string;
  lastRefreshed: string;
  outputSize: string;
  timeZone: string;
}

const StockMetadataCard: React.FC<StockMetadataCardProps> = ({
  info,
  symbol,
  lastRefreshed,
  outputSize,
  timeZone,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-400 mb-2">{symbol}</h2>
      <p className="text-gray-600">
        <span className="font-semibold">Information:</span> {info}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Last Refreshed:</span> {lastRefreshed}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Output Size:</span> {outputSize}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Time Zone:</span> {timeZone}
      </p>
    </div>
  );
};

export default StockMetadataCard;