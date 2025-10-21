import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <a className="navbar-brand fw-bold text-primary" href="#">
          💰 Meu Banco Digital
        </a>

        <div className="d-flex align-items-center">
          <div className="me-3">
            <button className="btn btn-outline-primary btn-sm me-2">
              💸 Fazer transferência (PIX)
            </button>
            <button className="btn btn-outline-success btn-sm">
              📈 Fazer uma aplicação financeira
            </button>
          </div>

          <div className="border-start ps-3">
            <span className="text-muted small">Saldo atual:</span>
            <div className="fw-bold text-dark">-</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;