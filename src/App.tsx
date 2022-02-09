import React, { useState, useRef, useEffect } from "react";
import Home from "./components/Structure/Home2";
import Login from "./components/User/Login";
import "./components/User/Login.css";
import Chart from "./components/Chart/Chart1";
import { GiLungs } from "react-icons/gi";

import BottomGraphConatiner from "./components/Structure/BottomGraphConatiner";
import ButtonContainer from "./components/Structure/ButtonContainer";
import Navbar from "./components/Structure/Navbar";
import TopGraphContainer from "./components/Structure/TopGraphContainer";

import { CgSelectO } from "react-icons/cg";
import { BsFillHeartFill } from "react-icons/bs";
import { GrPrevious } from "react-icons/gr";
import { FiTrash2 } from "react-icons/fi";

const initialChartOPtions = ["HR", "SpO2", "IBP", "Temp", "NIBP", "ECG", "CO2"];
const getVitalId = (item: any) => {
  for (let i = 0; i < initialChartOPtions.length; i++) {
    if (initialChartOPtions[i] === item) {
      console.log("Vital Id", i);
      return i;
    }
  }
};

let replaceIndex = 0;

function App() {
  const [graphList, setGraphList] = useState([]);
  const [chartOptions, setChartOptions] = useState(initialChartOPtions);
  const [displayedCharts, setDisplayedCharts] = useState<any>([]);
  const chartSelectorRef = useRef(null);

  useEffect(() => {
    console.log("Chart Selections", displayedCharts);
  }, [displayedCharts]);

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

  return (
    <>
      <div className="container-fluid">
        <Navbar />
        <div className="row">
          <div className="col-12 graph__wrapper d-flex justify-content-center align-itmes-center">
            <div className="col-6 text-center graph__container1">
              {displayedCharts[0] && (
                <Home vitalId={getVitalId(displayedCharts[0])} />
              )}
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

        <div className="row">
          <div className="col-12 graph__wrapper d-flex justify-content-center align-itmes-center">
            <div className="col-6 text-center graph__container3">
              {displayedCharts[1] && (
                <Home vitalId={getVitalId(displayedCharts[1])} />
              )}
            </div>
            <div className="col-6 text-center graph__container4">
              {displayedCharts[2] && (
                <Home vitalId={getVitalId(displayedCharts[2])} />
              )}
            </div>
          </div>
        </div>

        <ButtonContainer graphList={graphList} />
      </div>
    </>
  );
}

export default App;
