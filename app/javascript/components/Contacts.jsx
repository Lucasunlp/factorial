import React from "react";
import { Link } from "react-router-dom";

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
  }

  componentDidMount() {
      const url = "/api/v1/contacts/index";
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ contacts: response }))
        .catch(() => this.props.history.push("/"));
  }
  render() {
    const { contacts } = this.state;
    const allContacts = contacts.map((contact, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{contact.first_name}</h5>
            <Link to={`/contact/${contact.id}`} className="btn custom-button">
              View Contact
            </Link>
          </div>
        </div>
      </div>
    ));
    const noContact = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No contacts yet. Why not <Link to="/new_contact">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">FACTORIAL</h1>
            <p className="lead text-muted">
              CRUD TO FACTORIAL CONTACTS !
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="footer ">
              <Link to="/contact" className="btn custom-button float-right">
                Create New Contact
              </Link>
              <Link to="/" className="btn custom-button">
              Home
              </Link>
            </div>
            <div className="row">
              {contacts.length > 0 ? allContacts : noContact}
            </div>
          </main>
        </div>
      </>
    );
  }
}
export default Contacts;
