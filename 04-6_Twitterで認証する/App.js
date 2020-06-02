import React from 'react';
import './App.css';
import firebase from './Firebase';
var provider = new firebase.auth.TwitterAuthProvider();
function loginFunction()
{
  firebase.auth().signInWithPopup(provider).then(function (result)
  {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    var token = result.credential.accessToken;
    var secret = result.credential.secret;
    // The signed-in user info.
    var user = result.user;
    alert(user.displayName);
    // ...
  }).catch(function (error)
  {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function App()
{
  return (
    <div className="App">
      <div className="container">

        <button onClick={loginFunction}>
          Twitterでログインする
          </button>

      </div>
    </div>
  );
}

export default App;
