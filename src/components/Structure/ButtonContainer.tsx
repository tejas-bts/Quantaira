import React from "react";
import { FiEdit, FiSettings, FiLogOut } from "react-icons/fi";
import { ImPrevious, ImNext } from "react-icons/im";
import { AiOutlineLock, AiOutlineFundView } from "react-icons/ai";
import { FaRegBell, FaDatabase } from "react-icons/fa";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { MdOutlinePhotoSizeSelectLarge } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";

const ButtonContainer = ({ graphList }: any) => {
  return (
    <>
      <div className="row">
        <div className="col-12 buttons__wrapper d-flex justify-content-between align-items-center">
          <div className="col-1 button__group flex-column text-center">
            <div className="icon__size">
              <ImPrevious />
            </div>
            <span className="button__text">Preview Screen</span>
          </div>
          <div className="col-1 button__group flex-column text-center">
            <div className="icon__size">
              <ImNext />
            </div>
            <span className="button__text">Next Screen</span>
          </div>
          <div className="col-1 button__group flex-column text-center">
            <div className="icon__size">
              <AiOutlineLock />
            </div>
            <span className="button__text">Lock Screen</span>
          </div>
          <div className="col-1 button__group flex-column text-center">
            <div className="icon__size">
              <FaRegBell />
            </div>
            <span className="button__text">Alarm Setup</span>
          </div>
          <div className="col-1 button__group flex-column text-center">
            <div className="icon__size">
              <FaDatabase />
            </div>
            <span className="button__text">Add Data</span>
          </div>
          <div className="col-1 button__group flex-column text-center">
            <div className="icon__size">
              <HiOutlineViewGridAdd />
            </div>
            <span className="button__text">Patient View</span>
          </div>
          <div className="col-1 button__group flex-column text-center">
            <div className="icon__size">
              <MdOutlinePhotoSizeSelectLarge />
            </div>
            <span className="button__text">Capture View</span>
          </div>
          <div className="col-1 button__group flex-column text-center">
            <div className="icon__size">
              <AiOutlineFundView />
            </div>
            <span className="button__text">Cambine View</span>
          </div>
          <div className="col-1 button__group flex-column text-center">
            <div className="icon__size">
              <BiSearchAlt />
            </div>
            <span className="button__text">Find Here</span>
          </div>
          <div className="col-1 button__group flex-column text-center">
            <div className="icon__size">
              <FiSettings />
            </div>
            <span className="button__text">Setting</span>
          </div>
          <div className="col-1 button__group flex-column text-center">
            <div className="icon__size">
              <FiLogOut />
            </div>
            <span className="button__text">Log Out</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonContainer;
