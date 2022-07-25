import React, { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const user = {
  email: "user@mail.com",
  password: "123456",
};

const LoginModal = ({ isLoginClicked }) => {
  const recaptchaRef = React.createRef();
  const [recaptchaToken, setRecaptchaToken] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAbleToLogin, setIsAbleToLogin] = React.useState(false);
  const [loginTimeQount, setLoginTimeQount] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isAFK, setIsAFK] = React.useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    recaptchaRef.current.reset();
    if (loginTimeQount >= 3) {
      setIsAbleToLogin(false);
      setErrorMessage(
        "Anda sudah mencapai batas kesalahan login. Silakan tunggu 30 detik untuk mencoba kembali."
      );
      setTimeout(() => {
        setIsAbleToLogin(true);
        setErrorMessage(null);
      }, 30000);
      return;
    }
    const payload = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    if (payload.email === user.email && payload.password === user.password) {
      setIsLoggedIn(true);
      setLoginTimeQount(0);
    } else {
      setErrorMessage("Email atau password salah");
      setLoginTimeQount(loginTimeQount + 1);
      setIsAbleToLogin(false);
    }
  };

  const onChangeReCaptcha = (value) => {
    if (value && loginTimeQount <= 3) {
      setIsAbleToLogin(true);
    }
    setRecaptchaToken(value);
  };

  const onChangeForm = (e) => {
    setIsAFK(false);
  };

  useEffect(() => {
    if (isLoginClicked) {
      setTimeout(() => {
        setIsAFK(true);
      }, 3000);
    }
  }, [isLoginClicked]);

  useEffect(() => {
    if (isAFK) {
      let text = "Tidak terlihat aktifitas dari anda, lanjutkan login?";
      // eslint-disable-next-line no-restricted-globals
      if (confirm(text) == true) {
        text = "ok";
      } else {
        text = "cancel";
      }
      if (text === "cancel") {
      }
    }
  }, [isAFK]);

  return (
    <div
      className="modal fade"
      id="loginModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="card">
            <div className="card-body p-5">
              <h3 className="mb-3">Login</h3>
              <form onSubmit={onSubmit} onChange={onChangeForm}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Masukan email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Masukan password"
                  />
                </div>
                <div className="mb-4">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LddAhohAAAAAAWlVofrx_Mtmxg69pe3TVBb29UX"
                    onChange={onChangeReCaptcha}
                  />
                </div>
                <div className="d-grid mb-3">
                  <button
                    className={`btn btn-${
                      !isAbleToLogin ? "secondary" : "primary"
                    }`}
                    type="submit"
                    disabled={!isAbleToLogin}
                  >
                    LOGIN
                  </button>
                </div>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                {isLoggedIn && (
                  <div className="alert alert-success" role="alert">
                    Berhasil login!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
