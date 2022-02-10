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
const MAX_ZOOM_LEVEL = 200;
const MIN_ZOOM_LEVEL = 4;
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

  const handleMoveLeft = () => {
    if (values.length - leftOffset < zoomLevel) return;
    setLeftOffset((offset: any) =>
      Math.min(Math.ceil(1.1 * (offset || 1)), values.length)
    );
  };

  const handleMoveRight = () => {
    setLeftOffset((offset: any) => Math.max(Math.floor(0.9 * offset), 0));
  };

  const handleMoveLeftLinear = () => {
    if (values.length - leftOffset < zoomLevel) return;
    setLeftOffset((offset: any) => Math.min(1 + offset, values.length));
  };

  const handleMoveRightLinear = () => {
    setLeftOffset((offset: any) => Math.max(offset - 1, 0));
  };

  const handleZoomOut = () => {
    if (zoomLevel < MAX_ZOOM_LEVEL)
      setZoomLevel((zoomLevel) => zoomLevel + zoomStep);
    console.log("Zoom Level", zoomLevel);
  };

  useEffect(() => {
    if (values.length) {
      /*
       *     Variable "values" holds the data coming from props
       *     We take a sliding window out of "values" into "dataFrame" and pass it to chart.
       *     The length of sliding window depends on the zoomLevel and length of "values" array.
       *     We adjust the "start" and "end" of sliding window depending on leftOffset, which is updated by navigation buttons.
       */

      if (values.length) {
        setCurrentValue(values[values.length - 1][1]);

        const length = 200; //Math.max(zoomLevel, 20); // 1 Hour of data
        const end = values.length - leftOffset;
        const start = Math.max(0, end - length);

        console.log(
          "New Frame",
          leftOffset,
          values.length,
          start,
          end,
          end - start
        );
        setDataFrame([
          {
            name: title,
            data: values.slice(start, end),
          },
        ]);
      }
    }
  }, [values, leftOffset, zoomLevel]);

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

  useEffect(() => {
    console.log("Zoom Level", zoomLevel);
  }, [zoomLevel]);

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
          console.log("Drag", dx);
          if (dx) {
            if (dx < 0) handleMoveRightLinear();
            if (dx > 0) handleMoveLeftLinear();
          }
          // dragOffset.current = -x;
          // runSprings(wheelOffset.current + -x, -dx);
        }
      },
      // onPinch: ({ offset: [scale] }: any) => {

      onPinch: ({ direction }) => {
        // if (direction[0] > 0) {
        //   handleZoomIn();
        // } else {
        //   handleZoomOut();
        // }
        // if (direction[1] > 0) {
        //   handleZoomIn();
        // } else {
        //   handleZoomOut();
        // }
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
          console.log("Zoom Change", dy);
          if (dy < 0) {
            handleZoomIn();
          } else {
            handleZoomOut();
          }
        }
        if (dx) {
          if (dx > 0) handleMoveRight();
          if (dx < 0) handleMoveLeft();
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
                  className={`mt-2 ${zoomIn ? "is-active" : ""} ${
                    zoomLevel <= MIN_ZOOM_LEVEL ? "disabled" : ""
                  }`}
                  onClick={handleZoomIn}
                  onMouseDown={() => setZoomIn(true)}
                  onMouseUp={() => setZoomIn(false)}
                >
                  <FiZoomIn />
                </button>
                <button
                  className={`mt-0 ${zoomOut ? "is-active" : ""} ${
                    zoomLevel >= MAX_ZOOM_LEVEL ? "disabled" : ""
                  }`}
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
                } ${values.length - leftOffset < zoomLevel ? "disabled" : ""}`}
                // onMouseDown={handleLeftStart}
                onMouseUp={handleLeftStop}
                onClick={handleMoveLeft}
              >
                <FiChevronsLeft />
              </button>
              <button
                className={`chart-navigation-button ${
                  rightScroll > 0 ? "is-active" : ""
                } ${leftOffset == 0 ? "disabled" : ""}`}
                onMouseDown={handleRightStart}
                onMouseUp={handleRightStop}
                onClick={handleMoveRight}
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
