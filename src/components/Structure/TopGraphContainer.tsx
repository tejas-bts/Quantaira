import React, { useState, useRef } from "react";
import { CgSelectO } from "react-icons/cg";
import { BsFillHeartFill } from "react-icons/bs";
import { GrPrevious } from "react-icons/gr";
import { useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import Chart1 from "../Chart/Chart1";
import Chart from "../Chart/Chart1";
import { GiLungs } from "react-icons/gi";

const initialChartOPtions = ["SPO2", "IBP", "HZ", "Temp", "NIBP", "ECG", "CO2"];
let replaceIndex = 0;

const TopGraphContainer = ({ onOptionChange, graphList }: any) => {
  const [chartOptions, setChartOptions] = useState(initialChartOPtions);
  const [displayedCharts, setDisplayedCharts] = useState<any>([]);
  const chartSelectorRef = useRef(null);

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
    if (!!onOptionChange) onOptionChange(displayedCharts);
  }, [displayedCharts]);

  return (
    <>
      <div className="row">
        <div className="col-12 graph__wrapper d-flex justify-content-center align-itmes-center">
          <div className="col-6 text-center graph__container1">
            {graphList[0] && (
              <Chart
                title={"SpO2"}
                color="#94d699"
                Icon={GiLungs}
                currentValue={72}
                unit="BPM"
                idealMax={90}
                idealMin={53}
              />
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
    </>
  );
};

export default TopGraphContainer;
