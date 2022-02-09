import React from "react";
import { FiEdit } from "react-icons/fi";
import { GrFormNext } from "react-icons/gr";

const Navbar = () => {
  return (
    <>
      <div className="row" style={{ height: "8vh" }}>
        <div className=" col-12 navbar__wrapper d-flex justify-content-center align-items-center">
          <div className=" col-md-2 navbar__button  text-center">
            {/*  */}
            <span className="btn btn-1">
              <input
                type="checkbox"
                name=""
                id="switch"
                onChange={(e) =>
                  document.getElementById("root")?.requestFullscreen()
                }
              />
              <label htmlFor="switch"></label>
            </span>
            {/*  */}
          </div>
          <div className="col-md-6 col-lg-5 tabs__wrapper">
            <ul className="list-unstyled m-0 d-flex justify-content-between align-items-center">
              <li>
                <a href="#" className="text-decoration-none">
                  Device{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none">
                  Hospital Name{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none">
                  Building Name{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none">
                  Floor{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none">
                  ICU / Ward{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none">
                  Bed No.{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none">
                  Select Patient ID{" "}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-1 col-lg-2 col-xl-1  navbar__input">
            <input
              type="text"
              maxLength={7}
              size={6}
              className="navbar__input__box"
              defaultValue={"AD87547"}
            />
            <span className="edit_icon">
              <FiEdit />
            </span>
          </div>
          <div className="col-md-3 col-xl-4 text-center navbar__text d-flex justify-content-end align-items-center">
            <p className="m-0">
              <span className="time__wrapper">
                CDMX, Mexico (GMT-6) JAN, 9 2022 5:54:13 am
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
