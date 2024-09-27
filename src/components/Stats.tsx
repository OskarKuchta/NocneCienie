import React from "react";
import StatsTop from "./StatsTop";
import StatsTable from "./StatsTable";
interface Stats {
  url: string;
}
const Stats: React.FC<Stats> = ({ url }) => {
  return (
    <>
      <StatsTop url={url} />
      <StatsTable url={url} />
    </>
  );
};

export default Stats;
