import { ApexOptions } from "apexcharts";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Chart from "react-apexcharts";
import {
  FiChevronsRight,
  FiChevronsLeft,
  FiZoomIn,
  FiZoomOut,
  FiClock,
} from "react-icons/fi";
import { useGesture } from "@use-gesture/react";
import data2 from "./DummyData";

const ADDING_DATA_INTERVAL_IN_SECONDS = 1000;
const CHART_BACKGROUND_COLOR = "#02162c";
const MAX_CHART_LENGTH = 40;

let index = 0;

class Data {
  static isLive = true;
}

const Charts = ({
  chart,
  title,
  color,
  Icon,
  idealMin,
  idealMax,
  unit,
  values,
}: any) => {
  const [isLive, setLive] = useState(true);
  const [chartHeight, setHeight] = useState<any>(180);
  const [chartWidth, setWidth] = useState<any>(0);

  const [leftScroll, setLeftScroll] = useState(0);
  const [rightScroll, setRightScroll] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [leftOffset, setLeftOffset] = useState(0);
  const [zoomIn, setZoomIn] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);

  const [currentValue, setCurrentValue] = useState(0);
  const [dataFrame, setDataFrame] = useState<Array<any>>([]);

  const target = useRef<HTMLDivElement>(null);

  let zoomStep = 4;

  const options: ApexOptions = {
    chart: {
      redrawOnParentResize: true,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "linear",
        // easing: "easeinout",
        speed: 2 * ADDING_DATA_INTERVAL_IN_SECONDS,
        dynamicAnimation: {
          enabled: false,
          speed: ADDING_DATA_INTERVAL_IN_SECONDS,
        },
      },
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: false,
      },
      events: {
        beforeZoom: (e) => {
          console.log("EVENT : Before zoom", e);
          setLive(false);
        },
        zoomed: (e) => {
          console.log("EVENT : Zoomed", e);
          setLive(false);
        },
        beforeResetZoom: () => console.log("EVENT : Zoom Reset"),
        scrolled: () => setLive(false),
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: { curve: "straight", colors: [color] },
    fill: {
      colors: color,
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
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
        format: "yyyy/MM/dd hh:mm:ss",
      },
    },
    xaxis: {
      type: "datetime",
      decimalsInFloat: 0,
      range: zoomLevel * 1000,
      labels: {
        offsetX: 50,
        format: "hh:mm:ss",
        datetimeUTC: false,
        style: {
          colors: "#fff",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val: any) => val.toFixed(0),
        style: {
          colors: "#fff",
        },
      },
    },
  };

  const handleLeftStop = () => {
    setLeftScroll(0);
  };

  const handleRightStart = () => {
    setRightScroll(1);
  };
  const handleRightStop = () => {
    setRightScroll(0);
  };

  const handleZoomIn = () => {
    setZoomLevel((zoomLevel) => {
      if (zoomLevel > zoomStep) return zoomLevel - zoomStep;
      else return zoomStep;
    });
  };

  const handleZoomOut = () => {
    setZoomLevel((zoomLevel) => zoomLevel + zoomStep);
  };

  useEffect(() => {
    if (values.length && values[0].data) {
      let data: any = values[0].data;
      if (data.length) {
        setCurrentValue(data[data.length - 1][1]);

        const length = 100; // 1 Hour of data

        const end = Math.max(length, data.length - leftOffset);
        const start = Math.max(0, end - length);

        console.log("New Frame", start, end, leftOffset, data.length);
        setDataFrame([
          {
            ...values[0],
            data: data.slice(start - leftOffset, end - leftOffset),
          },
        ]);
      }
    }
  }, [values, leftOffset]);

  useEffect(() => {
    Data.isLive = isLive;
  }, [isLive]);

  useEffect(() => {
    console.log("Static Datax", data2);
    if (!!target && target.current) {
      console.log("Container", target.current.offsetHeight);
      // setHeight(target.current.offsetHeight - 10);
      setWidth(target.current.offsetWidth);
    }
  }, [target]);

  useLayoutEffect(() => {
    if (!!target && target.current) {
      console.log("Container", target.current.offsetHeight);
      // setHeight(target.current.offsetHeight - 50);
      setWidth(target.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (zoomIn) {
      const interval = setInterval(() => {
        console.log("Zooming In");
        clearInterval(interval);
      }, 1000);
    }
  }, [zoomIn]);

  useGesture(
    {
      onScroll: ({ event, offset: [x], direction: [dx] }: any) => {
        event.preventDefault();
        if (dx) {
          console.log("Scroll");
          // dragOffset.current = -x;
          // runSprings(wheelOffset.current + -x, -dx);
        }
      },
      onDrag: ({ event, offset: [x], direction: [dx] }: any) => {
        event.preventDefault();
        if (dx) {
          console.log("Drag");
          // dragOffset.current = -x;
          // runSprings(wheelOffset.current + -x, -dx);
        }
      },
      // onPinch: ({ offset: [scale] }: any) => {

      onPinch: ({
        event: any,
        offset: [prevX],
        lastOffset: [curX],
        cancel,
        offset,
      }) => {
        const newChange = (prevX - curX) / 100;
        const newZoomLevel = parseInt(`${zoomLevel + newChange}`);

        if (newZoomLevel > 5 && newZoomLevel < 100) {
          console.log("Pinch State", newZoomLevel);
          setZoomLevel(newZoomLevel);
        } else if (newZoomLevel >= 100) {
          setZoomLevel(99);
        } else if (newZoomLevel <= 5) {
          setZoomLevel(5);
        }
        console.log("New Zoom level", newZoomLevel, prevX, curX);
      },
      onWheelStart: ({ direction: [dx, dy] }) => {
        setLive(false);
        if (dx) {
          console.log("Wheel X : Start");
        }
      },
      onWheelEnd: ({ direction: [dx, dy] }) => {
        setLive(true);
        console.log("Wheel : End");
      },
      onWheel: ({
        event,
        lastOffset: [prevX, prevY],
        // offset: [x, y],
        direction: [dx, dy],
        active,
        movement: [x, y],
      }: any) => {
        event.preventDefault();
        if (dy) {
          const newZoomLevel = parseInt(`${zoomLevel + y / 100}`);
          if (newZoomLevel > 5 && newZoomLevel < 100)
            setZoomLevel(newZoomLevel);
        }
        if (dx) {
          console.log("Wheel X", x - prevX, active);
        }
      },
    },
    {
      target,
      eventOptions: {
        passive: false,
        bounds: { left: -100, right: 100, top: -50, bottom: 50 },
      },
    }
  );

  return (
    <div
      id="chart-container-div"
      className="chart-div"
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: CHART_BACKGROUND_COLOR,
      }}
    >
      <div className="chart-header">
        <div className="chart-header-left">
          <div>
            <div className="chart-title" style={{ color }}>
              <Icon className="chart-icon" />
              <span>{title}</span>
            </div>
          </div>
          <div className="d-flex">
            <div className="chart-header-col-1">
              <div className="zoom-buttons">
                <button
                  className={`mt-2 ${zoomIn ? "is-active" : ""}`}
                  onClick={handleZoomIn}
                  onMouseDown={() => setZoomIn(true)}
                  onMouseUp={() => setZoomIn(false)}
                >
                  <FiZoomIn />
                </button>
                <button
                  className={`mt-0 ${zoomOut ? "is-active" : ""}`}
                  onClick={handleZoomOut}
                  onMouseDown={() => setZoomOut(true)}
                  onMouseUp={() => setZoomOut(false)}
                >
                  <FiZoomOut />
                </button>
              </div>
            </div>
            <div className="chart-header-col-2">
              <div className="chart-current-value" style={{ color }}>
                {currentValue}
              </div>
            </div>
            <div className="chart-header-col-3">
              <div className="chart-ideal-value">
                <p className="m-0 font-weight-bold">{idealMax}</p>
                <p className="mb-1 font-weight-bold">{idealMin}</p>
                <p className="m-0" style={{ color }}>
                  {unit}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-header-center">
          <div className="chart-header-col-4">
            <div className="chart-online-status delayed">
              <FiClock color="yellow" className="m-1" />
              Delayed
            </div>
          </div>
        </div>
        <div className="chart-header-right">
          <div className="chart-header-col-5">
            <div className="chart-navigation">
              <button
                className={`chart-navigation-button ${
                  leftScroll > 0 ? "is-active" : ""
                }`}
                // onMouseDown={handleLeftStart}
                onMouseUp={handleLeftStop}
                onClick={() => {
                  console.log("Clicked", leftOffset);
                  console.log(leftOffset);
                  setLeftOffset((offset: any) =>
                    Math.max(Math.ceil(1.1 * offset), values.length)
                  );
                }}
              >
                <FiChevronsLeft />
              </button>
              <button
                className={`chart-navigation-button ${
                  rightScroll > 0 ? "is-active" : ""
                }`}
                onMouseDown={handleRightStart}
                onMouseUp={handleRightStop}
                onClick={() => {
                  console.log("Clicked", leftOffset);
                  setLeftOffset((offset: any) =>
                    Math.max(Math.ceil(0.909 * offset), values.length)
                  );
                }}
              >
                <FiChevronsRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="chart-container"
        ref={target}
        style={{ touchAction: "none" }}
        // onTouchMove={(e) => handleDrag}
        // onTouchCancel={(e) => console.log("Touch Cancel", e)}
        // onTouchEnd={(e) => setDragging(false)}
        // onTouchStart={(e) => setDragging(true)}
      >
        <Chart
          type="area"
          options={options}
          series={dataFrame}
          height={chartHeight}
          width={chartWidth}
          className="quant-chart-item"
        />
      </div>
    </div>
  );
};

export default Charts;
