import React from 'react';
import './App.css';
import firebase from './Firebase';
var storage = firebase.storage();

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.getFileFunction = this.getFileFunction.bind(this);
  }

  getFileFunction()
  {
    // Create a reference from a Google Cloud Storage URI
    var gsReference = storage.refFromURL('');
    gsReference.getDownloadURL().then(function (url)
    {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event)
      {
        var blob = xhr.response;
        var url = window.URL || window.webkitURL;
        var blobURL = url.createObjectURL(blob);
        var a = document.createElement('a');
        a.download = '';
        a.href = blobURL;
        a.click();
      };
      xhr.open('GET', url);
      xhr.send();

      // Or inserted into an <img> element:
      var img = document.getElementById('myimg');
      img.src = url;
    }).catch(function (error)
    {
      // Handle any errors
    });
  }

  render()
  {
    return (
      <div className="App">
        <div className="container">

          <button onClick={this.getFileFunction}>
            ファイルをダウンロードする
          </button>

          <img id="myimg" style={{ width: "1300px" }} />

        </div>
      </div>
    );
  }
}
export default App;
