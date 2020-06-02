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
    this.deleteDocFunction = this.deleteDocFunction.bind(this);
    this.deleteFieldFunction = this.deleteFieldFunction.bind(this);
  }

  deleteDocFunction()
  {
    db.collection("cities").doc("BJ").delete().then(function ()
    {
      alert("Document successfully deleted!");
    }).catch(function (error)
    {
      console.error("Error removing document: ", error);
    });
  }

  deleteFieldFunction()
  {
    var cityRef = db.collection('cities').doc('BJ');

    // Remove the 'capital' field from the document
    var removeCapital = cityRef.update({
      capital: firebase.firestore.FieldValue.delete()
    }).then(function ()
    {
      alert("capital successfully deleted!");
    }).catch(function (error)
    {
      console.error("Error removing document: ", error);
    });;
  }

  render()
  {
    return (
      <div className="App">
        <div className="container">

          <button onClick={this.deleteDocFunction}>
            ドキュメントを削除する
          </button>

          <button onClick={this.deleteFieldFunction}>
            フィールドを削除する
          </button>

        </div>
      </div>
    );
  }
}
export default App;
