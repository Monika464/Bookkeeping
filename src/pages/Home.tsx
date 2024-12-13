import React from "react";
import chart from "../../public/assets/chart.svg";
import "./home.css";

export interface IHome {}

const Home: React.FunctionComponent<IHome> = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Book keeping for small clubs</h1>
      <img src={chart} alt="chart" className="home-chart" />
    </div>
  );
};

export default Home;
