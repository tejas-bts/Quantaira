import React, { useState } from "react";
import { useEffect, useRef } from "react";
import BottomGraphConatiner from "./BottomGraphConatiner";
import ButtonContainer from "./ButtonContainer";
import Navbar from "./Navbar";
import TopGraphContainer from "./TopGraphContainer";

import { CgSelectO } from "react-icons/cg";
import { BsFillHeartFill } from "react-icons/bs";
import { GrPrevious } from "react-icons/gr";
import { GiLungs } from "react-icons/gi";
import { FiTrash2 } from "react-icons/fi";
import Chart from "../Chart/Chart1";

import { io as Client } from "socket.io-client";

const initialChartOPtions = ["SPO2", "IBP", "HZ", "Temp", "NIBP", "ECG", "CO2"];
let replaceIndex = 0;

const Home = () => {
  const [graphList, setGraphList] = useState([]);
  const [chartOptions, setChartOptions] = useState(initialChartOPtions);
  const [displayedCharts, setDisplayedCharts] = useState<any>([]);
  const chartSelectorRef = useRef(null);

  const handleOptionChange = (option: any) => {
    console.log("New Option", option);
    setGraphList(option);
  };

  const addChart = (e: any) => {
    const selection = e.target.value;
    if (displayedCharts.length >= 3) {
      let itemToBeReplaced: any;
      setDisplayedCharts((previosOptions: any) => {
        const newOptions = [...previosOptions];
        itemToBeReplaced = newOptions[replaceIndex];
        newOptions[replaceIndex] = selection;
        replaceIndex = (replaceIndex + 1) % 3;
        return newOptions;
      });
      setChartOptions((previousOptions) => {
        const newOptions = [...previousOptions];
        let i = newOptions.indexOf(selection);
        newOptions[i] = itemToBeReplaced;
        return newOptions;
      });
    } else {
      setDisplayedCharts((displayedCharts: any) => [
        ...displayedCharts,
        selection,
      ]);
      setChartOptions((previosOptions) =>
        previosOptions.filter((item) => item !== selection)
      );
    }

    e.target.value = "select";
  };

  const removeGraph = (graphName: any) => {
    // console.log("Removing Charts", graphName);
    setDisplayedCharts((previosOptions: any) =>
      previosOptions.filter((item: any) => item !== graphName)
    );
    setChartOptions((previosOptions) => [...previosOptions, graphName]);
  };

  useEffect(() => {
    // const socket = Client("http://MP1Y5R4P.local:3000");
    const socket = Client("http://dev-websocketdatageneus.azurewebsites.net");

    socket.on("connect", () => {
      console.log(socket.id);
      console.log(socket.connected); // true
      socket.on("bed007", (message) => {
        console.log("Message received", message);
      });
    });

    socket.on("disconnect", (km) => {
      console.log(socket.id);
      console.log(socket.connected); // true
    });
  }, []);

  useEffect(() => {
    console.log("GraphList ", graphList);
  }, [graphList]);

  return (
    <>
      <div className="container-fluid">
        <Navbar />
        <div className="row">
          <div className="col-12 graph__wrapper d-flex justify-content-center align-itmes-center">
            <div className="col-6 text-center graph__container1">
              {graphList[0] && <Chart title={"SpO2"} color="red" />}
            </div>

            <div className="col-6 text-center graph__container2">
              <div className="col-12 d-flex justify-content-center align-items-center">
                <div className="row">
                  <div className="col-12">
                    <select
                      name=""
                      id="graph"
                      className="select__option mb-2"
                      onChange={addChart}
                      ref={chartSelectorRef}
                      defaultValue="select"
                    >
                      <option value="select" disabled>
                        Select Patient Report
                      </option>
                      {chartOptions.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <div className="d-flex">
                      {displayedCharts.map((item: any, index: any) => (
                        <div className="button_pill m-1" key={index}>
                          {item}
                          <button
                            className="btn_pill_remove"
                            onClick={() => removeGraph(item)}
                            value={item}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomGraphConatiner graphList={graphList} />
        <ButtonContainer graphList={graphList} />
      </div>
    </>
  );
};

export default Home;
