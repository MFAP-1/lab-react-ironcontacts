import React from "react";
import "./App.css";
import contacts from "./contacts.json";

class App extends React.Component {
  state = {
    contactsArr: contacts.filter((contact, index) => index < 5),
  };

  handleClick = () => {
    this.setState({
      contactsArr: [...this.state.contactsArr, this.randomizeContact()],
    });
  };
  // auxiliary method, just to randomize a new contact (CHECKING IF IT ALREADY EXISTS)
  randomizeContact = () => {
    let newContact = {};
    do {
      newContact = contacts[Math.floor(Math.random() * contacts.length)];
    } while (this.state.contactsArr.includes(newContact));
    return newContact;
  };

  //
  deleteContact = (event) => {
    let targetIndex = 0;
    this.state.contactsArr.map((element, index) => {
      if (element.name === event.target.name) {
        targetIndex = index;
      }
      return element;
    });
    let auxArr = [...this.state.contactsArr];
    auxArr.splice(targetIndex, 1);
    this.setState({ contactsArr: auxArr });
  };

  //
  sortTable = (event) => {
    if (event.target.name === "by-popularity") {
      this.setState({
        contactsArr: [
          ...this.state.contactsArr.sort((a, b) => b.popularity - a.popularity),
        ],
      });
    } else if (event.target.name === "by-name") {
      this.setState({
        contactsArr: [
          ...this.state.contactsArr.sort((a, b) => {
            return a.name.localeCompare(b.name);
          }),
        ],
      });
    }
  };

  // Main render method
  render() {
    return (
      <div className="main-container">
        <h1>Iron Contacts</h1>
        <button onClick={this.handleClick}>Add Random Contact </button>
        <button onClick={this.sortTable} name="by-name">
          Sort by name
        </button>
        <button onClick={this.sortTable} name="by-popularity">
          Sort by popularity
        </button>
        <table>
          <thead>
            <tr>
              <td>Picture</td>
              <td>Name</td>
              <td>Popularity</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {this.state.contactsArr.map((contact) => (
              <tr key={contact.name}>
                <td>
                  <img
                    src={contact.pictureUrl}
                    alt={contact.name}
                    className="profile-img"
                  />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>
                  <button onClick={this.deleteContact} name={contact.name}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
