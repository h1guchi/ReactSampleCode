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
    this.updateFunction = this.updateFunction.bind(this);
  }

  updateFunction()
  {
    var washingtonRef = db.collection("cities").doc("DC");

    // Set the "capital" field of the city 'DC'
    return washingtonRef.update({
      capital: true
    })
      .then(function ()
      {
        alert("Document successfully updated!");
      })
      .catch(function (error)
      {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  render()
  {
    return (
      <div className="App">
        <div className="container">

          <button onClick={this.updateFunction}>
            データを更新する
          </button>

        </div>
      </div>
    );
  }
}
export default App;
