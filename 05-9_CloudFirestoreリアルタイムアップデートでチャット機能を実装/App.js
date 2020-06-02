import React from 'react';
import './App.css';
import firebase from './Firebase';
const db = firebase.firestore();
class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      UserA: "",
      UserB: "",
      list: []
    };
    this.sendMessageFunction = this.sendMessageFunction.bind(this);
    this.handleChangeUserA = this.handleChangeUserA.bind(this);
    this.handleChangeUserB = this.handleChangeUserB.bind(this);

    //「room−1」のroomデータが登録されたら検知。チャットのリストに格納。
    //　orderByを使いメッセージの作成された順に並べる
    db.collection("message")
      .where("room", "==", "room-1")
      .orderBy('timestamp', 'desc')
      .onSnapshot((querySnapshot) =>
      {
        var list = [];
        querySnapshot.forEach((doc) =>
        {
          list.push(
            <p>{doc.data().message}</p>
          );
          this.setState({ list: list });
        });

      });
  }

  sendMessageFunction(message, writer)
  {
    db.collection("message").add({
      room: "room-1",
      writer: writer,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    this.setState({ [writer]: "" });
  }

  handleChangeUserA(event)
  {
    this.setState({ UserA: event.target.value });
  }

  handleChangeUserB(event)
  {
    this.setState({ UserB: event.target.value });
  }

  render()
  {
    return (
      <div className="App">


        <div className="wrapper">
          <div className="column user1">
            <div className="info">
              <div>
                <h2>User A</h2>
                <input type="text" value={this.state.UserA} onChange={this.handleChangeUserA} />
                <button onClick={() => this.sendMessageFunction(this.state.UserA, "UserA")}>送信</button>
              </div>
              <div className="content">
                {this.state.list}
              </div>
            </div>
          </div>

          <div className="column user2">
            <div className="info">
              <div>
                <h2>User B</h2>
                <input type="text" value={this.state.UserB} onChange={this.handleChangeUserB} />
                <button onClick={() => this.sendMessageFunction(this.state.UserB, "UserB")}>送信</button>
              </div>
              <div className="content">
                {this.state.list}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
export default App;
