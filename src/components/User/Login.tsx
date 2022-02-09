const Login = () => {
  return (
    <div className="app__login">
      <div className="login__wrapper">
        <div className="login__top">
          <h1>Login Your Account</h1>
          <span className="selector__text">
            <p>Select Who you are?</p>
          </span>
        </div>
        <div className="selector__wrapper">
          <div className="selector">
            <img
              src="../images/doctor.png"
              alt="doctor"
              width={"50px"}
              height={"50px"}
            />
            <p className="para">Doctors</p>
          </div>
          <div className="selector">
            <img
              src="../images/doctor.png"
              alt="nurse"
              width={"50px"}
              height={"50px"}
            />
            <p className="para">Doctors</p>
          </div>
          <div className="selector">
            <img
              src="../images/doctor.png"
              alt="Clinicians"
              width={"50px"}
              height={"50px"}
            />
            <p className="para">Doctors</p>
          </div>
        </div>
        <div className="login__inputs">
          <div className="login__bottom">
            <form>
              <div className="email__group">
                <label htmlFor="log in with your e-mail address">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="dean@icuspectrum.com"
                  className="email__input"
                />
              </div>
              <div className="password__group">
                <div className="password__title">
                  <label htmlFor="log in with your password">Password</label>
                  <label htmlFor="forget password">Forget Password?</label>
                </div>

                <input
                  type="password"
                  placeholder="●●●●●●●●"
                  className="password__input"
                />
              </div>
              <div className="button__group">
                <button type="submit" className="button__input">
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
