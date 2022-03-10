import React from "react";
import { MDBInput } from "mdbreact";


const Input = ({onInput, value}) => {
  return (
    <MDBInput label="Key" onInput={onInput} value={value}/>
  );
}

export default Input;