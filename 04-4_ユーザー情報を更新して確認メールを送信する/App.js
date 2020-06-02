import React from 'react';
import './App.css';
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

function updateEmailFunction()
{
  var user = firebase.auth().currentUser;
  if (user) {
    user.updateEmail("").then(function ()
    {
      user.sendEmailVerification().then(function ()
      {
        // Email sent.
        alert("メールアドレスと更新し、確認メールを送信しました！");
      }).catch(function (error)
      {
        // An error happened.
      });
    }).catch(function (error)
    {
      // An error happened.
    });
  }
}

function App()
{
  return (
    <div className="App">

      <div className="container">

        <button onClick={loginFunction}>
          ログインする
        </button>

        <button onClick={getEmailFunction}>
          ユーザー情報を取得する
        </button>

        <button onClick={updateEmailFunction}>
          ユーザーのメールアドレスを更新する
        </button>

      </div>

    </div>
  );
}

export default App;
