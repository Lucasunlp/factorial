import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-6 align-items-center">CRUD Contacts of Factorial</h1>
        <Link
        to="/contacts"
        className="btn btn-lg btn-info align-items-center"
        role="button"
        >
        View Contacts
        </Link>
        <hr className="my-4" />
      </div>
    </div>
  </div>
);
