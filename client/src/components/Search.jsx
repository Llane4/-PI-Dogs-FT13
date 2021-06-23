import React, { useState } from "react";

export default function Search(props){
    return (
     
           <input
        type="search"

        placeholder={props.placeholder}
        onChange={props.handleChange}
        
        
      />
       
    )
}