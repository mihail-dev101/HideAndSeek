import React, {  useState } from "react";
import axios from "axios";
import bg2 from './images/bg2.jpg';
import './scss/style.scss';



export default function App () {
  const [fileSelected, setFileSelected] = useState();
  const [keyInput, setInput] = useState('');
  const [operation, setOperation] = useState('');
  
  
  const saveFileSelected = (e) => {
    setFileSelected(e.target.files[0]);
  };

  const checkKey = (key) => {
    var input = parseInt(key,16);
    return (input.toString(16) === key)
  }

  const isValid = (fileSelected) && (keyInput.length > 0) && (operation !== '') && checkKey(keyInput);

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
      console.log("Server error");
    }
  };


  const showDownloadButton = () => {
    document.querySelector('#download').style.display = "inline-block";
  }

  const download = () => {
    window.open('https://localhost:7105/api/file/download', '_blank');
  }

    return (	
    <section className="ftco-section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12 col-lg-10">
                    <div className="wrap d-md-flex">
                        <div className="img" style={{backgroundImage : {bg2}}}>
                    </div>
                        <div className="login-wrap p-4 p-md-5">
                        <div className="d-flex">
                            <div className="w-100">
                                <h3 className="mb-4">Hide & Seek</h3>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="formFile" className="form-label" >Choose file to encrypt/decrypt</label>
                            <input className="form-control" type="file" id="formFile" onChange={saveFileSelected}/>
                        </div>
                        <div className="form-group mb-3" id="key">
                            <label className="label" htmlFor="key">Key</label>
                            <input type="text" className="form-control" value={keyInput} placeholder="Insert Key" required onChange={getKeyInput}/>
                            {(keyInput.length !== 0 && checkKey(keyInput)) ?
                                (<p>The key is in hex format</p>) :
                                (<p style={{color:"red"}}>The key is not in hex format</p>)
                                }
                        
                        </div>
                        <div className="form-group mb-3" id="operation">
                            <label className="label" htmlFor="operation">Operation</label>
                        </div>
                        
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="option" id="encrypt" value={operation} onChange={getOperation}/>
                            <label className="form-check-label" htmlFor="encrypt">Encrypt</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="option" id="decrypt" value={operation} onChange={getOperation}/>
                            <label className="form-check-label" htmlFor="decrypt">Decrypt</label>
                        </div>
                        {(operation !== "decrypt") && (  
                        <div className="form-group d-md-flex">
                            <div className="w-50 text-left">
                                <label className="checkbox-wrap checkbox-primary mb-0">Add CRC
                                            <input type="checkbox" disabled/>
                                            <span className="checkmark"></span>
                                            </label>
                                        </div>
                        </div>)}
                        {(operation === "decrypt") && (  
                        <div className="form-group d-md-flex">
                            <div className="w-50 text-left">
                                <label className="checkbox-wrap checkbox-primary mb-0">Add CRC
                                            <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                            </label>
                                        </div>
                        </div>)}
                        <div className="form-group">
                            {isValid && (
                            <button type="button" className="form-control btn btn-primary rounded submit px-3" value="upload" 
                            onClick={() => {importFile(); showDownloadButton()}}>Start</button>)}
                        </div>                        
                        <button id="download" className="form-control btn btn-secondary rounded submit px-3" type="button" value="download" onClick={download}>
                            Download
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)}