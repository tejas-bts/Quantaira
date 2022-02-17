import React, { useState, useEffect } from "react";
import validator from "validator";
import { ImCross } from "react-icons/im";
import { MdOutlineLogin } from "react-icons/md";

const Login = ({ onLogin }: { onLogin: any }) => {
  const [doctorSelect, setDoctorSelect] = useState<boolean>(false);
  const [nurseSelect, setNurseSelect] = useState<boolean>(false);
  const [clinicianSelect, setClinicianSelect] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<any>();
  const [emailInput, setEmailInput] = useState<any>("");
  const [passwordInput, setPasswordInput] = useState<any>("");

  useEffect(() => {
    if (emailInput.length === 0) {
      setEmailError(false);
    }
  }, [emailInput]);

  useEffect(() => {
    if (passwordInput.length === 0) {
      setEmailError(false);
    }
  }, [passwordInput]);

  const handleSubmit = (e: any) => {
    let valid = true;
    e.preventDefault();
    let email = emailInput;
    let password = passwordInput;
    if (emailInput && passwordInput) {
      if (emailInput) {
        if (validator.isEmail(email)) {
          setEmailError(false);
        } else {
          setEmailError(true);
          valid = false;
        }

        if (passwordInput) {
          if (validator.isStrongPassword(password)) {
            setPasswordError(false);
          } else {
            setPasswordError(true);
            valid = false;
          }
        }
      }
    }
    if (valid) onLogin();
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="col-12 d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="col-8 col-lg-6 col-xl-5 login__group flex-column d-flex justify-content-center align-items-center">
              <div className="col-10 col-xl-9 text-center text__color mb-3">
                <h1>
                  <b>Login to Your Account</b>
                </h1>
              </div>
              <div className="col-10 col-xl-9">
                <p className="text__color text-start">Select Who you are?</p>
              </div>
              <div className="col-10 col-xl-9 d-flex justify-content-between align-items-center">
                <div
                  className={`col-3 selector text-center ${
                    doctorSelect ? "border-sky" : "border-transperant"
                  }`}
                  onClick={() => {
                    setDoctorSelect(true);
                    setNurseSelect(false);
                    setClinicianSelect(false);
                  }}
                >
                  <img
                    src="../images/doctor.png"
                    alt="doctor"
                    width={"50px"}
                    height={"50px"}
                  />
                  <p className="m-0">
                    <b>Doctors</b>
                  </p>
                </div>
                <div
                  className={`col-3 selector text-center ${
                    nurseSelect ? "border-sky" : "border-transperant"
                  }`}
                  onClick={() => {
                    setDoctorSelect(false);
                    setNurseSelect(true);
                    setClinicianSelect(false);
                  }}
                >
                  <img
                    src="../images/nurse.png"
                    alt="doctor"
                    width={"50px"}
                    height={"50px"}
                  />
                  <p className="m-0">
                    <b>Nurses</b>
                  </p>
                </div>
                <div
                  className={`col-3 selector text-center ${
                    clinicianSelect ? "border-sky" : "border-transperant"
                  }`}
                  onClick={() => {
                    setDoctorSelect(false);
                    setNurseSelect(false);
                    setClinicianSelect(true);
                  }}
                >
                  <img
                    src="../images/doctor.png"
                    alt="doctor"
                    width={"50px"}
                    height={"50px"}
                  />
                  <p className="m-0">
                    <b>Clinician</b>
                  </p>
                </div>
              </div>
              <div className="col-10 col-xl-9 flex-column mt-2">
                <p className="text__color m-0">Log in into</p>
                <div className="col-4">
                  <span className="btn btn-1" style={{ marginLeft: "-14px" }}>
                    <input type="checkbox" id="switch" />
                    <label htmlFor="switch"></label>
                  </span>
                </div>
              </div>
              <div className="col-10 col-xl-9">
                <form onSubmit={handleSubmit}>
                  <div className="email__group mb-2 position-relative">
                    <label
                      htmlFor="log in with your e-mail address"
                      className="text__color"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="dean@icuspectrum.com"
                      className="email__input"
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                    />
                    {emailError ? (
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="validation__text">
                          Please insert a valid email address.
                        </div>
                        <div>
                          <span className="email__validation">
                            user@icuspecturm.com
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="password__group">
                    <div className="password__title">
                      <label
                        htmlFor="log in with your password"
                        className="text__color"
                      >
                        Password
                      </label>
                      <label htmlFor="forget password" className="text__color">
                        Forget Password?
                      </label>
                    </div>

                    <input
                      type="password"
                      placeholder="●●●●●●●●"
                      className="password__input"
                      onChange={(e) => setPasswordInput(e.target.value)}
                      required
                    />
                    {passwordError ? (
                      <div className="password__validation text-white d-flex justify-content-between align-items-center mt-1">
                        <div>Please insert a valid password address.</div>
                        <div>
                          Password must contain:
                          <span className="password__essentials">123</span>
                          <span className="password__essentials">#&$@</span>
                          <span className="password__essentials">ABC</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="d-flex mt-3">
                    <input type="checkbox" required />
                    <p
                      className="text__color ms-2"
                      style={{ marginTop: "-6px" }}
                    >
                      Accept the terms & Condition apply
                    </p>
                  </div>
                  <div>
                    <button type="submit" className="button__input">
                      <b>Log in</b>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <p className="text-white position-absolute bottom-0">
              Privacy | Terms of use
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
