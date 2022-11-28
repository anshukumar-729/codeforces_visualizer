import React from "react";
import './A.css';
import { NavLink,Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Show = (params) => {
    const data = params.data;
    console.log(data.result[0][0]);
    let state = data.result[0][0];
    return(
        <div style={{ marginLeft: '30%'}}>
 <h2 style={{ marginLeft: '20%'}}>All questions of User 1</h2>           
 <table style={{textAlign: 'center'}}>
 
      <tr key={"header"}>
        {Object.keys(state[0]).map((key) => (
          <th>{key}</th>
        ))}
      </tr>
      {state.map((item) => (
        <tr key={item.id}>
          {Object.values(item).map((val) => (
            <td>{val}</td>
          ))}
        </tr>
      ))}
    </table>
        </div>
    )
};
export default Show;