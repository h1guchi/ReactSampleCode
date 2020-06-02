import React from 'react';
import './App.css';
import firebase from './Firebase';
const db = firebase.firestore();

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.setDataFunction = this.setDataFunction.bind(this);
  }

  handleChange(event)
  {
    this.setState({ value: event.target.value });
  }

  setDataFunction()
  {
    // Add a new document in collection "cities"
    db.collection("cities").add({
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    })
      .then(function ()
      {
        alert("Document successfully written!");
      })
      .catch(function (error)
      {
        console.error("Error writing document: ", error);
      });
  }

  render()
  {
    return (
      <div className="App">

        <div className="container">

          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            name="data"
            placeholder="cities"
          />

          <button onClick={this.setDataFunction}>
            データを追加する
          </button>

        </div>
      </div>
    );
  }
}
export default App;
