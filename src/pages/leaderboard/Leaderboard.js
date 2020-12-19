import React, { useState, useEffect } from "react";
import "./Leaderboard.scss";
import Header from "../../components/header/Header";
import request from "../../apis/request";

const Leaderboard = () => {
  // STATE VARIABLES
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const response = await request(`/users`, "GET");
    setUsers(response?.data);
  };

  return (
    <main className="leaderboard">
      <Header isHome />
      <section className="leaderboard-table">
        <table>
          <tbody>
            <tr>
              <th>Username</th>
              <th>Matches Played</th>
              <th>Matches Won</th>
            </tr>
            {users.map((user) => {
              return (
                <tr key={user}>
                  <td>{user?.username}</td>
                  <td>{user?.matchesPlayed}</td>
                  <td>{user?.matchesWon}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Leaderboard;
