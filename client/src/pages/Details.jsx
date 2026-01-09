import { useLocation } from "react-router-dom";

export const Details = () => {
  const location = useLocation();
  const mediaType = location.pathname.split("/")[1];

  return <div>Details</div>;
};
