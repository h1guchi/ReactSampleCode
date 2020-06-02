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
    this.getDataFunction = this.getDataFunction.bind(this);
  }

  getDataFunction()
  {
    db.collection("cities").where("capital", "==", true)
      .get()
      .then(function (querySnapshot)
      {
        querySnapshot.forEach(function (doc)
        {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch(function (error)
      {
        console.log("Error getting documents: ", error);
      });
  }

  render()
  {
    return (
      <div className="App">
        <div className="container">

          <button onClick={this.getDataFunction}>
            データを取得する
          </button>

        </div>
      </div>
    );
  }
}
export default App;
