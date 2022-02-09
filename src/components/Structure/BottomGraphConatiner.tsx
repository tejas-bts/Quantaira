import React from "react";
import { CgSelectO } from "react-icons/cg";
import { BsFillHeartFill } from "react-icons/bs";
import Chart2 from "../Chart/Chart1";
import Chart3 from "../Chart/Chart1";

const BottomGraphConatiner = ({ graphList }: any) => {
  return (
    <>
      <div className="row">
        <div className="col-12 graph__wrapper d-flex justify-content-center align-itmes-center">
          <div className="col-6 text-center graph__container3">
            {graphList[1] && (
              <>
                <div className="col-12">
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-2" style={{ display: "contents" }}>
                      <button className="graph__btn">
                        <span className="graph__btn__icon">
                          <CgSelectO />
                        </span>{" "}
                        <span className="graph__btn__text">Real Time</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className="row d-flex justify-content-start"
                    style={{ marginTop: "-30px" }}
                  >
                    <div className="col-5 col-xl-4">
                      <div className="d-flex justify-content-center">
                        <div>
                          <span
                            className="on__graph__icon"
                            style={{ color: "rgb(171 226 230)" }}
                          >
                            <BsFillHeartFill />
                          </span>{" "}
                          <span
                            className="on__graph__text"
                            style={{ color: "rgb(171 226 230)" }}
                          >
                            {graphList[1]}
                          </span>
                        </div>
                        <div className="on__graph__text1">98</div>
                        <div className="graph__text__group">
                          <p className="on__graph__para">100</p>
                          <p
                            className="on__graph__para"
                            style={{ textAlign: "end" }}
                          >
                            90
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Chart3 />
              </>
            )}
          </div>
          <div className="col-6 text-center graph__container4">
            {graphList[2] && (
              <>
                <div className="col-12">
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-2" style={{ display: "contents" }}>
                      <button className="graph__btn">
                        <span className="graph__btn__icon">
                          <CgSelectO />
                        </span>{" "}
                        <span className="graph__btn__text">Real Time</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className="row d-flex justify-content-start"
                    style={{ marginTop: "-30px" }}
                  >
                    <div className="col-5 col-xl-4">
                      <div className="d-flex justify-content-center">
                        <div>
                          <span
                            className="on__graph__icon"
                            style={{ color: "rgb(207, 177, 113)" }}
                          >
                            <BsFillHeartFill />
                          </span>{" "}
                          <span
                            className="on__graph__text"
                            style={{ color: "rgb(207, 177, 113)" }}
                          >
                            {graphList[2]}
                          </span>
                        </div>
                        <div className="on__graph__text3">118/73</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Chart3 />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomGraphConatiner;
