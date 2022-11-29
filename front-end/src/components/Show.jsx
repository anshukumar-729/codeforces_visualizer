import React from "react";
import './A.css';
import { NavLink,Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
// Function to return commonElements
function getCommon(arr1, arr2) {
    var common = [];                   // Array to contain common elements
  
    for(var i=0 ; i<arr1.length ; ++i) {
      for(var j=0 ; j<arr2.length ; ++j) {
        if(arr1[i].question == arr2[j].question && arr1[i].status == 'Accepted') {       // If element is in both the arrays
            let flag = 0;
            for(var k=0;k < common.length;k++){
                if(arr1[i].question == common[k].question){
                    flag = 1
                }
            }
            if(flag === 0){common.push(arr1[i]);}        // Push to common array
        }
      }
    }
    
    return common;                     // Return the common elements
  }
  
  
  // Get common elements of arr1, arr2
  

const Show = (params) => {
    const data = params.data;
    // console.log(data.result[0][0]);
    let state = data.result[0][0];
    let arr1 = data.result[1][0];
    let arr2 = data.result[1][1];
    var commonElements;
    if (arr1 != [] && arr2 != []){
     commonElements = getCommon(arr1, arr2); }
    else{
        commonElements = []
    }
    let user1 = data.result[2][0];
    let user2 = data.result[2][1];
    let user3 = data.result[2][2];
    var common3;
    var common2;
    if (user1 != [] && user2 != [] &&  user3 != []){
    common2 = getCommon(user1, user2);
     common3 = getCommon(common2, user3); }
     else{
        common2 = []
        common3 = []
     }

    
    console.log(commonElements);
    console.log(common3);
    return(
        <div style={{ marginLeft: '0%'}}>
          <div><h2 style={{ }}>Results</h2>   </div>
         
 <table style={{textAlign: 'center',marginLeft:"25%"}}>
 
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
    <h2 style={{ marginLeft: '0%'}}>common questions of User 1 and User 2</h2>           
    {commonElements.length!=0 && <table style={{textAlign: 'center',marginLeft:"25%"}}>
 
      <tr key={"header"}>
        {Object.keys(commonElements[0]).map((key) => (
          <th>{key}</th>
        ))}
      </tr>
      {commonElements.map((item) => (
        <tr key={item.id}>
          {Object.values(item).map((val) => (
            <td>{val}</td>
          ))}
        </tr>
      ))}
    </table> }
    <h2 style={{ marginLeft: '0%'}}>common questions of User 1 and User 2 and User 3</h2>           
    { common3.length!=0 && <table style={{textAlign: 'center',marginLeft:"25%"}}>
 
      <tr key={"header"}>
        {Object.keys(common3[0]).map((key) => (
          <th>{key}</th>
        ))}
      </tr>
      {common3.map((item) => (
        <tr key={item.id}>
          {Object.values(item).map((val) => (
            <td>{val}</td>
          ))}
        </tr>
      ))}
    </table> }
        </div>
    )
};
export default Show;