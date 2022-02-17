import React, { useEffect, useState } from "react";
import Charts from "../Chart/Chart1";
import { io as Client } from "socket.io-client";
import { GiLungs, GiHeartOrgan, GiMedicalThermometer } from "react-icons/gi";
import { FaNotesMedical } from "react-icons/fa";
import { BiPulse } from "react-icons/bi";

const vitals = ["HR", "SpO2", "IBP", "Temp", "NIBP", "ECG", "CO2", "RR"];
const icons = [
  GiHeartOrgan,
  GiLungs,
  FaNotesMedical,
  GiMedicalThermometer,
  FaNotesMedical,
  BiPulse,
  FaNotesMedical,
];
const colors = [
  "#94d699",
  "#e7d57d",
  "#c0f7ff",
  "#fff59d",
  "#FFAB91",
  "#CE93D8",
  "#80CBC4",
];

const Home = ({ vitalId }: { vitalId: any }) => {
  const [buffer, setBuffer] = useState<any>([]);
  const [bufferList, setBufferList] = useState<any>([]);
  const [vitalData, setVitals] = useState([]);
  const [heartRateData, setHeartRateData] = useState<any>();

  useEffect(() => {
    setBufferList(() => [...buffer]);
  }, [buffer]);

  useEffect(() => {
    // const socket = Client("http://40.76.196.190:3001");
    const socket = Client("http://192.168.1.29:3001");
    socket.on("connect", () => {
      console.log(socket.id);
      console.log(socket.connected); // true
      socket.on("bed007", ({ pid, bed, data }) => {
        console.log("Data", data);
        setVitals(data);
      });
    });

    socket.on("disconnect", (km) => {
      console.log(socket.id);
      console.log(socket.connected); // true
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    const heartRateData: any = vitalData.filter(
      (item: any) => item.label === vitals[vitalId]
    )[0];
    setHeartRateData(heartRateData);
    const heartRateSeries = heartRateData ? heartRateData.values : [];
    let timeOutArray: NodeJS.Timeout[] = [];
    heartRateSeries.map((item: any, index: number) => {
      const timeout = setTimeout(() => {
        setBuffer((existingData: any) => [...existingData, item]);
      }, index * 1000);
      timeOutArray.push(timeout);
    });

    return () => {
      timeOutArray.map((item) => {
        clearTimeout(item);
      });
    };
  }, [vitalData]);

  return heartRateData ? (
    <Charts
      color={colors[vitalId]}
      Icon={icons[vitalId]}
      title={heartRateData.label}
      unit={heartRateData.unit}
      idealMax={heartRateData.idealMax ?? ""}
      idealMin={heartRateData.idealMin ?? ""}
      values={bufferList}
    />
  ) : (
    <div
      className="d-flex justify-content-center align-items-center w-100 h-100"
      style={{ color: "white" }}
    >
      Loading...
    </div>
  );
};

export default Home;
