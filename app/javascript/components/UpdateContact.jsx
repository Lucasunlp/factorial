import React from 'react';
import { get, patch } from 'axios';

class UpdateContact extends React.Component {
  constructor() {
    super();
    this.state = { id:'', first_name: '', email: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    get(`http://localhost:3000/api/v1/contacts/${this.props.match.params.id}.json`)
      .then((response) => {
        this.setState(response.data);
      })
      .catch(error => console.log('error', error));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { id, first_name, last_name, phone, email} = this.state;
    const url = `/api/v1/contacts/${id}`;

    const body = {
      first_name,
      last_name,
      phone,
      email: email.replace(/\n/g, "<br> <br>" )
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
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



  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCancel() {
    this.props.history.push(`/contacts`);
  }

  render() {
    var url = this.props.location.pathname;
    var stuff = url.split('/');
    var id = stuff[stuff.length-1];
    this.state.id  = stuff[2]
    return (
      <div>
        <h1>Edit {this.state.first_name}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>FIRST NAME </label>
            <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>EMAIL </label>
            <input type="text" name="email"  value={this.state.email} onChange={this.handleChange} className="form-control" />
            <input type="hidden" name="id"  value={this.state.id} className="form-control" />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-dark">Update</button>
            <button type="button" onClick={this.handleCancel} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdateContact;
