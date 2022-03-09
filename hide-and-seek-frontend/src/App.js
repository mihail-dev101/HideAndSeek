import React, { useEffect, useState } from "react";
import axios from "axios";
import encript from './assets/encript.png';

export default function FileUpload () {
  const [fileSelected, setFileSelected] = useState();
  const [keyInput, setInput] = useState('');
  const [operation, setOperation] = useState('');

  const saveFileSelected = (e) => {
    setFileSelected(e.target.files[0]);
  };

  const getKeyInput = (e) => {
    setInput(e.target.value);
  };

  const getOperation = (e) => {
    var op = e.target.id.toString();
    console.log(op)
    setOperation(op);
  };

  const importFile = async (e) => {
    const formData = new FormData();
    formData.append("file", fileSelected);
    formData.append("key", keyInput);
    formData.append("operation", operation);
    try {
      const res = await axios({
          method: "POST",
          url: "https://localhost:7105/api/file/importfile",
          data: formData,
          headers: {'Access-Control-Allow-Origin': '*'}});
      console.log(res);
    } catch (ex) {
      console.log("ex");
    }
  };

  const showDownload = () => {
    console.log("click")
    document.querySelector('#download').style.display = "inline-block";
  }

  const download = () => {
    window.open('https://localhost:7105/api/file/download', '_blank');
  }

  var i = 0;
  function move() {
    if (i === 0) {
      i = 1;
      var elem = document.getElementById("myBar");
      var width = 1;
      var id = setInterval(frame, 10);  
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
          }
        }
      }
    }

  return (
    <div className='main'>
      <img alt="" src={encript} height={150} width={200}/>
      <h2> 
        File Encryption 
      </h2> 
      <div>
        <input className="save" type="file" onChange={saveFileSelected} />
        <br/>
        <p><b>Key</b></p>
        <input type='text' value={keyInput} placeholder="key" onInput={getKeyInput}/>
        <br/>
        <div id="operation">
          <p><b>Operation:</b></p>
          <div>
            <input type="radio" id="encrypt" value={operation} name="option"
                onChange={getOperation}/>
            <label htmlFor="encrypt">Encrypt</label>
          </div>
          <div>
            <input type="radio" id="decrypt" value={operation} name="option" onChange={getOperation}/>
            <label htmlFor="decrypt">Decrypt</label>
          </div>
          <div>
            <input type="checkbox" id="crc" value="crc" name="crc"></input>
            <label htmlFor="crc">Add CRC</label>
          </div>
        </div>
        <div id="start">
          <button type="button" value="upload" onClick={() => {importFile(); move(); showDownload()}}>
            Start
          </button>
          <br/>
          <div id="myProgress">
            <div id="myBar"></div>
          </div>
          <button id="download" type="button" value="download" onClick={download}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
