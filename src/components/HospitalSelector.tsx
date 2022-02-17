import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SelectDevice = ({ onSelected }: { onSelected: any }) => {
  const [hospital, setHospital] = useState<boolean>(false);
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [building, setBuilding] = useState<boolean>(false);
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [floorNumber, setFloorNumber] = useState<boolean>(false);
  const [selectFloor, setSelectedFloor] = useState<any>(null);

  const [selectedOption, setSelectedOption] = useState(0);

  const [bedNo, setBedNo] = useState<boolean>(false);
  const [selectedPatientBedNo, setSelectedPatientBedNo] = useState<any>(null);
  const [patientID, setPatientID] = useState<boolean>(false);
  const [selectedPatientId, setSelectedPatientId] = useState<any>(null);
  const [patientName, setPatientName] = useState<boolean>(false);
  const [selectedPatientName, setSelectedPatientName] = useState<any>(null);
  const [patientDetails, setPatientDetails] = useState<sample_arr[]>([
    {
      id: 1,
      hospital: "JK Hospital",
      building: "Building A1",
      floor: 1,
      bedNo: 1,
      patientID: "AD87542",
      patientName: "Vicky",
    },
    // {
    //   id: 2,
    //   hospital: "Hk Hospital",
    //   building: "Building A2",
    //   floor: 2,
    //   bedNo: 2,
    //   patientID: "AD87543",
    //   patientName: "Aditya",
    // },
    // {
    //   id: 3,
    //   hospital: "RK Hospital",
    //   building: "Building A3",
    //   floor: 3,
    //   bedNo: 3,
    //   patientID: "AD87543",
    //   patientName: "Dhiraj",
    // },
    // {
    //   id: 4,
    //   hospital: "CK Hospital",
    //   building: "Building A4",
    //   floor: 4,
    //   bedNo: 4,
    //   patientID: "AD87543",
    //   patientName: "Nishant",
    // },
    // {
    //   id: 5,
    //   hospital: "IK Hospital",
    //   building: "Building A5",
    //   floor: 5,
    //   bedNo: 5,
    //   patientID: "AD87543",
    //   patientName: "Parag",
    // },
  ]);

  interface sample_arr {
    id: number;
    hospital: string;
    building: string;
    floor: number;
    bedNo?: number;
    patientID?: string;
    patientName?: string;
  }

  useEffect(() => {
    console.log(
      "Hospital",
      selectedHospital,
      selectedBuilding,
      selectFloor,
      selectedOption
    );
  }, [selectedHospital, selectedBuilding, selectFloor]);

  return (
    <>
      <div className="col-12">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-11 d-flex justify-content-start align-items-center mt-4">
            <div className="col-4 me-2">
              <div className="select__box__tab">
                {hospital ? (
                  <div className="option__container2 active">
                    {patientDetails.map((hospitalName, index) => {
                      return (
                        <div
                          key={hospitalName.id}
                          className="option2"
                          onClick={() => {
                            setSelectedHospital(index);
                            setHospital(false);
                          }}
                        >
                          <input
                            type="radio"
                            className="radio"
                            name="category"
                          />
                          <label
                            htmlFor="hospital names"
                            className="text-white select__input2"
                          >
                            {hospitalName.hospital}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                <div
                  className="selected2"
                  onClick={() => setHospital(!hospital)}
                >
                  {selectedHospital !== null
                    ? patientDetails[selectedHospital].hospital
                    : "Select Hospital"}
                </div>
              </div>
            </div>
            {/*  */}
            <div className="col-4 me-2">
              <div className="select__box__tab">
                {building ? (
                  <div className="option__container2 active">
                    {patientDetails.map((buildingName, index) => {
                      return (
                        <div
                          key={buildingName.id}
                          className="option2"
                          onClick={() => {
                            setSelectedBuilding(index);
                            setBuilding(false);
                          }}
                        >
                          <input
                            type="radio"
                            className="radio"
                            name="category"
                          />
                          <label
                            htmlFor="building names"
                            className="text-white select__input2"
                          >
                            {buildingName.building}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                <div
                  className={`selected2 ${
                    selectedHospital == null ? "disabled" : ""
                  }`}
                  onClick={() => {
                    if (selectedHospital !== null) setBuilding(!building);
                  }}
                >
                  {selectedBuilding !== null
                    ? patientDetails[selectedBuilding].building
                    : "Select Building"}
                </div>
              </div>
            </div>
            {/*  */}
            <div className="col-4 me-2">
              <div className="select__box__tab">
                {floorNumber ? (
                  <div className="option__container2 active">
                    {patientDetails.map((floorNo, index) => {
                      return (
                        <div
                          key={floorNo.id}
                          className="option2"
                          onClick={() => {
                            setSelectedFloor(index);
                            setFloorNumber(false);
                          }}
                        >
                          <input
                            type="radio"
                            className="radio"
                            name="category"
                          />
                          <label
                            htmlFor="floor number"
                            className="text-white select__input2"
                          >
                            {floorNo.floor}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                <div
                  className={`selected2 ${
                    selectedBuilding == null ? "disabled" : ""
                  }`}
                  onClick={() => {
                    if (selectedBuilding !== null) setFloorNumber(!floorNumber);
                  }}
                >
                  {selectFloor !== null
                    ? patientDetails[selectFloor].floor
                    : "Select Floor"}
                </div>
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-11 d-flex justify-content-start align-items-center mt-2">
            <div className="col-4 me-2">
              <div className="select__box2">
                {bedNo ? (
                  <div className="option__container2 active">
                    {patientDetails.map((device, index) => {
                      return (
                        <div
                          key={device.id}
                          className="option2"
                          onClick={() => {
                            setSelectedPatientBedNo(index);
                            setSelectedPatientId(index);
                            setSelectedPatientName(index);
                            setBedNo(false);
                          }}
                        >
                          <input
                            type="radio"
                            className="radio"
                            id="device1"
                            name="category"
                          />
                          <label
                            htmlFor="device1"
                            className="text-white select__input2"
                          >
                            {device.bedNo}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                <div className="selected2" onClick={() => setBedNo(!bedNo)}>
                  {selectedPatientBedNo !== null
                    ? patientDetails[selectedPatientBedNo].bedNo
                    : "Select Bed No."}
                </div>
              </div>
            </div>
            {/*  */}
            <div className="col-4 me-2">
              <div className="select__box2">
                {patientID ? (
                  <div className="option__container2 active">
                    {patientDetails.map((device, index) => {
                      return (
                        <div
                          key={device.id}
                          className="option2"
                          onClick={() => {
                            setSelectedPatientBedNo(index);
                            setSelectedPatientId(index);
                            setSelectedPatientName(index);
                            setPatientID(false);
                          }}
                        >
                          <input
                            type="radio"
                            className="radio"
                            id="device1"
                            name="category"
                          />
                          <label
                            htmlFor="device1"
                            className="text-white select__input2"
                          >
                            {device.patientID}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                <div
                  className="selected2"
                  onClick={() => setPatientID(!patientID)}
                >
                  {selectedPatientId !== null
                    ? patientDetails[selectedPatientId].patientID
                    : "Select Patient ID"}
                </div>
              </div>
            </div>
            {/*  */}
            <div className="col-4 me-2">
              <div className="select__box3">
                {patientName ? (
                  <div className="option__container2 active">
                    {patientDetails.map((device, index) => {
                      return (
                        <div
                          key={device.id}
                          className="option2"
                          onClick={() => {
                            setSelectedPatientBedNo(index);
                            setSelectedPatientId(index);
                            setSelectedPatientName(index);
                            setPatientName(false);
                          }}
                        >
                          <input
                            type="radio"
                            className="radio"
                            id="device1"
                            name="category"
                          />
                          <label
                            htmlFor="device1"
                            className="text-white select__input2"
                          >
                            {device.patientName}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                <div
                  className="selected2"
                  onClick={() => setPatientName(!patientName)}
                >
                  {selectedPatientName !== null
                    ? patientDetails[selectedPatientName].patientName
                    : "Select Patient Name"}
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
      <div className="col-12 d-flex justify-content-end align-items-center">
        <div
          className="col-2 position-absolute d-flex justify-content-end align-items-center"
          style={{ bottom: "5%", right: "5%" }}
        >
          <button className="select__device__button" onClick={onSelected}>
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default SelectDevice;
