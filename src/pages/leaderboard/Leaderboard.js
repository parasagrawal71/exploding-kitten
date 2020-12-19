import React, { useEffect } from "react";
import "./Leaderboard.scss";
import Header from "../../components/header/Header";
import { connect } from "react-redux";
import { getUsers } from "../../redux/actions/userActions";

const Leaderboard = (props) => {
  // PROPS
  const { users, getUsers } = props;

  useEffect(() => {
    getUsers();
  }, []);

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
            {users &&
              users.map((user, index) => {
                return (
                  <tr key={user?.username + index}>
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

const mapStateToProps = (store) => {
  return { users: store?.data?.users };
};

export default connect(mapStateToProps, { getUsers })(Leaderboard);
