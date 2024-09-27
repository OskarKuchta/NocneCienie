import React from "react";
import useFetch from "../Hooks/useFetch";
interface StatsTop {
  url: string;
}
const StatsTop: React.FC<StatsTop> = ({ url }) => {
  const { data } = useFetch(url);
  if (data) {
    let mostDonate: number[] = data.memberList.map(
      (item: any) => item.donations
    );
    mostDonate.sort((a: number, b: number) => b - a);
    const topDonator: number = mostDonate[0];
    let mostDonateName: any = data.memberList.find(
      (item: any) => item.donations === topDonator
    );
    return (
      <section className="stats__top" id="stats">
        <div className="stats__top--left">
          <h2>Kraj: Polska</h2>
          <h2>Level klanu: {data.clanLevel}</h2>
          <h2>Level capitalu: {data.clanCapital.capitalHallLevel}</h2>
          <h2>Aktualna liga: {data.warLeague.name}</h2>
          <h2>Liga Capital: {data.capitalLeague.name}</h2>
        </div>
        <div className="stats__top--right">
          <h2>Wygrane wojny: {data.warWins}</h2>
          <h2>Zremisowane wojny: {data.warTies}</h2>
          <h2>Przegrane wojny: {data.warLosses}</h2>
          <h2>Aktualny win streak: {data.warWinStreak}</h2>
          <h2>
            Najwięcej donate: {mostDonateName.name} ({mostDonate[0]})
          </h2>
        </div>
      </section>
    );
  }
};

export default StatsTop;
