import React, { useState, useRef } from "react";
import useFetch from "../Hooks/useFetch";
interface StatsTable {
  url: string;
}
const StatsTable: React.FC<StatsTable> = ({ url }) => {
  interface Member {
    name: string;
    role: string;
    expLevel: number;
    trophies: number;
  }
  const filterOptions: string[] = ["NAZWA", "ROLA", "LEVEL", "PUCHARY"];
  const filterList = filterOptions;
  const [filterLoop, setfilterLoop] = useState<number>(1);
  const { data } = useFetch(url);
  const statsButton = useRef<HTMLButtonElement>(null);
  const statsBtn = statsButton.current;
  const [arrow, setArrow] = useState<string>("up");
  const [isTableVisible, setIsTableVisible] = useState<boolean>(true);
  if (data) {
    const filterCurrent: () => void = () => {
      setfilterLoop((prev) => (prev + 1) % 4);
      if (filterLoop === 3) {
        setfilterLoop(0);
      }
      statsBtn?.blur();
    };
    const hideTable: () => void = () => {
      setIsTableVisible((prev) => !prev);
      setArrow((prev) => (prev === "up" ? "down" : "up"));
    };
    const comparator = (a: Member, b: Member) => {
      switch (filterLoop) {
        case 0:
          return a.name.localeCompare(b.name);
        case 1:
          const roleOrder: { [key: string]: number } = {
            member: 3,
            admin: 2,
            coLeader: 1,
            leader: 0,
          };
          if (roleOrder[a.role] === roleOrder[b.role]) {
            return b.trophies - a.trophies;
          }
          return roleOrder[a.role] - roleOrder[b.role];

        case 2:
          return b.expLevel - a.expLevel;

        case 3:
          return b.trophies - a.trophies;

        default:
          return b.expLevel - a.expLevel;
      }
    };
    const sortedList: Member[] = [...data.memberList].sort(comparator);
    return (
      <>
        <section className="stats">
          <div className="stats__bottom">
            <div className="stats__bottom--left">
              <h2>Lista graczy względem: {filterList[filterLoop]}</h2>
              <button
                onClick={filterCurrent}
                ref={statsButton}
                className="stats__bottom--button"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (filterLoop === 3) {
                      setfilterLoop(0);
                    } else {
                      e.preventDefault();
                      setfilterLoop((prev) => (prev + 1) % 4);
                    }
                  }
                }}
              >
                {filterList[filterLoop + 1 <= 3 ? filterLoop + 1 : 0]}
              </button>
            </div>
            <div className="stats__bottom--right">
              <button
                className="stats__bottom--button-arrow"
                onClick={hideTable}
              >
                <i
                  className={`fa-solid fa-angle-${arrow} stats__bottom--arrow`}
                ></i>
              </button>
            </div>
          </div>
          {isTableVisible && (
            <div className="stats__members">
              <table>
                <thead>
                  <tr>
                    <th>Lp.</th>
                    <th>Nazwa</th>
                    <th>Rola</th>
                    <th>Level</th>
                    <th>Puchary</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedList.map((element: Member, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{element.name}</td>
                      <td>
                        {element.role === "admin"
                          ? "Elder"
                          : element.role === "coLeader"
                          ? "Co-leader"
                          : element.role[0].toUpperCase() +
                            element.role.slice(1)}
                      </td>
                      <td>{element.expLevel}</td>
                      <td>{element.trophies}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </>
    );
  }
};

export default StatsTable;
