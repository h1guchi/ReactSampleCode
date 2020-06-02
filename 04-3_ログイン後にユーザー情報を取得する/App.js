import React from 'react';
import logo from './logo.svg';
import './App.css';

/*** ↓↓↓↓↓↓↓ 追加するコード ↓↓↓↓↓↓↓ ***/

import firebase from './Firebase';

function loginFunction()
{
  var email = "";
  var password = "";

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() =>
    {
      alert("ログイン成功");
    }, err =>
    {
      alert("ログイン失敗");
      // エラーを表示する等
    });
}

function getEmailFunction()
{
  firebase.auth().onAuthStateChanged(function (user)
  {
    if (user) {
      // User is signed in.
      var email = user.email;
      alert("Emailを取得　: " + email);
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
}
/*** ↑↑↑↑↑↑↑ 追加するコード ↑↑↑↑↑↑↑ ***/


function App()
{
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}


      {/********  追加コード ********/}

      <div className="container">
        <button onClick={loginFunction}>
          ログインする
        </button>

        <button onClick={getEmailFunction}>
          ユーザー情報を取得する
        </button>
      </div>

      {/********  追加コード ********/}
    </div>
  );
}

export default App;
