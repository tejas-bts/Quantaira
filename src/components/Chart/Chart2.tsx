import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const TIME_RANGE_IN_MILLISECONDS = 30 * 1000;
const ADDING_DATA_INTERVAL_IN_SECONDS = 500;
const startTime = new Date();

const CHART_BACKGROUND_COLOR = "#02162c";
const MAX_CHART_LENGTH = 40;

const pattern = [0, 20, 3, 0, 90, -60, 15, 0];

let index = 0;

class Data {
  static isLive2 = true;
}

const Chart = ({ chart }: any) => {
  const defaultDataList = [
    {
      name: "heart-rate",
      data: [],
    },
  ];

  const [dataList, setDataList] = useState(defaultDataList);
  const [bufferList, setBufferList] = useState<any>(defaultDataList);
  const [buffer, setBuffer] = useState<any>([]);
  const [data, setData] = useState([]);
  const [isLive, setLive] = useState(true);

  const options: ApexOptions = {
    chart: {
      animations: {
        enabled: false,
        easing: "linear",
        dynamicAnimation: {
          speed: ADDING_DATA_INTERVAL_IN_SECONDS,
        },
      },
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: false,
      },
      events: {
        beforeZoom: () => setLive(false),
        zoomed: () => setLive(false),
        beforeResetZoom: () => console.log("EVENT : Zoom Reset"),
        scrolled: () => setLive(false),
      },
    },
    dataLabels: {
      enabled: false,
    },

    // title: {
    //   text: "Heart Rate",
    //   align: "left",
    //   style: {
    //     color: "#fff",
    //   },
    // },
    stroke: { colors: ["#94d699"] },
    fill: {
      colors: ["#94d699"],
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 60, 90, 100],
      },
    },
    grid: {
      borderColor: "#fff",
      strokeDashArray: 7,
      row: {
        opacity: 1,
        colors: [CHART_BACKGROUND_COLOR],
      },
      column: {
        colors: [CHART_BACKGROUND_COLOR],
      },
    },
    tooltip: {
      x: {
        format: "yyyy/MM/dd HH:mm:ss.f",
      },
    },
    xaxis: {
      type: "datetime",
      range: TIME_RANGE_IN_MILLISECONDS,
      labels: {
        // offsetX: 50,
        style: {
          colors: ["#fff"],
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val: any) => val.toFixed(0),
        style: {
          colors: ["#fff"],
        },
      },
      min: -100,
      max: 100,
    },
  };

  const handleStop = () => {
    // console.log("Stop", dataList);
    setLive(!isLive);
  };

  const handleLeftStart = () => {
    setLive(false);
    let i = 0;
    setInterval(() => {
      if (buffer.length - i >= 0) {
        // console.log(
        //   "Tejas",
        //   buffer.length,
        //   i,
        //   Math.max(buffer.length - i - MAX_CHART_LENGTH, 0),
        //   Math.max(buffer.length - i, MAX_CHART_LENGTH)
        // );
        setData(() =>
          buffer.slice(
            Math.max(buffer.length - i - MAX_CHART_LENGTH, 0),
            Math.max(buffer.length - i, MAX_CHART_LENGTH)
          )
        );
        i++;
      }
    }, 500);
  };
  const handleLeftStop = () => {};

  const handleRightStart = () => {};
  const handleRightStop = () => {};

  useEffect(() => {
    // console.log("Is Live", isLive);
    Data.isLive2 = isLive;
  }, [isLive]);

  useEffect(() => {
    // console.log("Data List", dataList, buffer);
  }, [dataList]);

  // useEffect(() => {
  //   const addDataRandomly = (data) => {
  //     if (Math.random() < 1 - ADDING_DATA_RATIO) {
  //       return data;
  //     }

  //     let nt = new Date(startTime.getTime() + 1000 * data.length);

  //     return [
  //       ...data.slice(data.length - 100, data.length),
  //       {
  //         x: nt,
  //         y: pattern[index++ % pattern.length], //Math.random() * 100, //data.length *
  //       },
  //     ];
  //   };
  //   const interval = setInterval(() => {
  //     if (!isLive) return;
  //     setDataList(
  //       dataList.map((val) => {
  //         return {
  //           name: val.name,
  //           data: addDataRandomly(val.data),
  //         };
  //       })
  //     );
  //   }, ADDING_DATA_INTERVAL_IN_MILLISECONDS);

  //   return () => clearInterval(interval);
  // });

  useEffect(() => {
    setDataList(() => [
      {
        name: "heart-rate",
        data,
      },
    ]);
  }, [data]);

  useEffect(() => {
    setBufferList(() => [
      {
        name: "heart-rate",
        data: buffer,
      },
    ]);
  }, [buffer]);

  useEffect(() => {
    setInterval(() => {
      if (!Data.isLive2) return;
      let nt = new Date(startTime.getTime() + 1000 * index);
      setBuffer((existingData: any) => [
        ...existingData,
        {
          x: nt,
          y: pattern[index++ % pattern.length], //Math.random() * 100, //data.length *
        },
      ]);
    }, ADDING_DATA_INTERVAL_IN_SECONDS);
  }, []);

  useEffect(() => {
    // console.log(
    //   "Tejas",
    //   Math.max(buffer.length - MAX_CHART_LENGTH, 0),
    //   buffer.length
    // );
    setData(
      buffer.slice(Math.max(buffer.length - MAX_CHART_LENGTH, 0), buffer.length)
    );
  }, [buffer]);

  return (
    <div
      className="chart-div"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <ReactApexChart
        type="area"
        options={options}
        series={isLive ? dataList : dataList}
        height={200}
        width={770}
        className="quant-chart-item"
      />
      {/* <div>
        <button onMouseDown={handleLeftStart} onMouseUp={handleLeftStop}>
          Left
        </button>
        <button onClick={handleStop}>{isLive ? "Stop" : "Start"}</button>
        <button onMouseDown={handleRightStart} onMouseUp={handleRightStop}>
          Right
        </button>
      </div> */}
    </div>
  );
};

export default Chart;
