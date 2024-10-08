import { useParams } from "react-router-dom";

export const Trade = () => {
  const { symbol } = useParams();

  return <div>Trade Page - {symbol}</div>;
};
