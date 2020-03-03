import React from "react";
import { Link } from "react-router-dom";

class NewContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      phone: "",
      email: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
  return String(str)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/contacts/create";
    const { first_name, last_name, phone, email} = this.state;

    if (first_name.length == 0 || last_name.length == 0 || email.length == 0 || phone.length == 0 )
      return;

    const body = {
      first_name,
      last_name,
      phone,
      email: email.replace(/\n/g, "<br> <br>" )
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/contact/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new contact.
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="contactFirstName">First name</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>  <div className="form-group">
                  <label htmlFor="recipeName">Last name</label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="form-control"
                    required
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipeName">Email Contact</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    required
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipeName">Phone Contact </label>
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    className="form-control"
                    required
                    onChange={this.onChange}
                  />
                </div>
              <button type="submit" className="btn custom-button mt-3">
                Create Contact
              </button>
              <Link to="/contacts" className="btn btn-link mt-3">
                Back to contacts
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewContact;
