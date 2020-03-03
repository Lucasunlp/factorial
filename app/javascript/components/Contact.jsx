import React from "react";
import {
  Link
} from "react-router-dom";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
      }
    };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.handleEdit = this.handleEdit.bind(this)
    this.updateContact = this.updateContact.bind(this)
  }

  handleUpdate(contact) {
    fetch(`http://localhost:3000/api/v1/contacts/${contact.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        contact: contact
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      this.updateContact(contact)
    })
  }

  updateContact(contact) {
    let newContacts = this.state.contacts.filter((f) => f.id !== contact.id)
    newContacts.push(contact)
    this.setState({
      contacts: newContacts
    })
  }


  handleEdit() {
    if (this.state.editable) {
      let first_name = this.first_name.value
      let last_name = this.last_name.value
      let phone = this.phone.value
      let email = this.email.value
      let id = this.props.contact.id
      this.props.handleUpdate(contact)
    }
    this.setState({
      editable: !this.state.editable
    })
  }


  componentDidMount() {
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({
        contact: response
      }))
      .catch(() => this.props.history.push("/contacts"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  deleteContact() {
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/contacts"))
      .catch(error => console.log(error.message));
  }



  render() {
    const {
      contact
    } = this.state;
    return ( <
      div className = "" >
      <
      div className = "hero position-relative d-flex align-items-center justify-content-center" >
      <
      div className = "overlay bg-dark position-absolute" / >
      <
      h1 className = "display-4 position-relative text-white" >
      <
      p > {
        contact.first_name
      } < /p> <
      p > {
        contact.last_name
      } < /p> <
      p > {
        contact.email
      } < /p> <
      /h1> <
      /div> <
      div className = "container py-5" >
      <
      div className = "footer " >
      <
      button type = "button"
      className = "btn btn-danger float-right"
      onClick = {
        this.deleteContact
      } >
      Delete Contact <
      /button> <
      Link type = "button"
      className = "btn btn-primary float-left"
      to = {
        `/contacts/${contact.id}/edit`
      } > Edit Contact < /Link> <
      /div> <
      /div> <
      div style = {
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      } >
      <
      Link to = "/contacts"
      className = "btn btn-success" >
      Back to contacts <
      /Link> <
      /div> <
      /div>
    );
  }
}
export default Contact;
