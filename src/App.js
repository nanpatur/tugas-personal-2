import bootstrap from 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import LoginModal from './LoginModal';

function App() {
  const [isLoginClicked, setIsLoginClicked] = React.useState(false);
  return (
    <div
      className="App container-fluid p-0 bg-dark d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card" style={{ width: '18rem' }}>
        <img src="/assets/login.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="d-grid">
            <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#loginModal" onClick={() => setIsLoginClicked(true)}>LOGIN</button>
          </div>
        </div>
      </div>
      <LoginModal isLoginClicked={isLoginClicked} />
    </div>
  );
}

export default App;
