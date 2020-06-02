import React from 'react';
import './App.css';
import firebase from './Firebase';

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { imageUrl: '' };
    this.handleImageFunction = this.handleImageFunction.bind(this);
    this.uploadFunction = this.uploadFunction.bind(this);
  }

  handleImageFunction = (event) =>
  {
    //画像パス
    this.setState({ imageFiles: event.target.files[0] });

    //画像ファイル
    var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
    this.setState({ imageFile: createObjectURL(event.target.files[0]) });
  }

  uploadFunction()
  {
    //ファイル名を含むファイルの完全パスへの参照を作成（保存先）
    const storageref = firebase.storage().ref('sample/' + this.state.imageFiles.name);

    //保存処理
    const file = this.state.imageFiles;
    storageref.put(file).then(function (snapshot)
    {
      alert('Uploaded a blob or file!');
    });
  }

  render()
  {
    return (
      <div className="App">
        <div className="container">

          <label htmlFor="selectFiles">ファイルを選択</label>
          <input id="selectFiles" type="file" onChange={this.handleImageFunction} />

          <button onClick={this.uploadFunction}>
            アップロードする
          </button>

          {this.state.imageFile
            ? <img src={this.state.imageFile} alt="uploaded" style={{ width: "1000px" }} />
            : ""
          }
        </div>
      </div>
    );
  }
}
export default App;
