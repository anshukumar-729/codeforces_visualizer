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
        if(arr1[i].question == arr2[j].question && arr1[i].status == 'Accepted') {      
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
    const data = params.data["result"];
    const [load,setLoaded]=useState(0)
    // console.log(data.result[0][0]);
    const [result,SetResult]= useState([])
    console.log(data)
    function getresult(){
    let res=[]
    data.map((val)=>{
      if(val.length==1){
          res.push(val[0])
      }
      else if(val.length==2){
        res.push({"id1":val[0]['id'],"id2":val[1]["id"],result:getCommon(val[0]["result"],val[1]["result"])})
      }
      else if(val.length==3){
        res.push({"id1":val[0]['id'],"id2":val[1]["id"],"id3":val[2]["id"],result:getCommon(val[0]["result"],getCommon(val[1]["result"],val[2]["result"]))})
      }
      })

      console.log(res)

      SetResult(res)
    }

    useEffect(()=>{
      if(load==0){
        setLoaded(1);
        getresult();
      }
    },load)
    
     

    
    
    return(
        <div style={{ marginLeft: '0%'}}>
          
          {result.map((val,ind)=>( <div className="mt-10">
            {data[ind].length==1 && (
              <div><h2 style={{ }}>Profile Details of {val["id"]}</h2>  
              <table>
                <tr>
                  <th>Id</th>
                  <th>Question Name</th>
                  <th>Verdict</th>
                </tr>
                {val["result"].map((q)=>(
                  <tr>
                    <td>{q["id"]}</td>
                    <td>{q["question"]}</td>
                    <td>{q["status"]}</td>
                  </tr>
                ))}
              </table>
               </div>
            )}
            {data[ind].length==2 && (
              <div><h2 style={{ }}>Common between {val["id1"]} and {val["id2"]}</h2>  
              <table>
                <tr>
                  <th>Id</th>
                  <th>Question Name</th>
                  <th>Verdict</th>
                </tr>
                {val["result"].map((q)=>(
                  <tr>
                    <td>{q["id"]}</td>
                    <td>{q["question"]}</td>
                    <td>{q["status"]}</td>
                  </tr>
                ))}
              </table>
               </div>
            )}
            {data[ind].length==3 && (
              <div><h2 style={{ }}>Common between {val["id1"]} , {val["id2"]} and {val["id3"]}</h2>  
              <table>
                <tr>
                  <th>Id</th>
                  <th>Question Name</th>
                  <th>Verdict</th>
                </tr>
                {val["result"].map((q)=>(
                  <tr>
                    <td>{q["id"]}</td>
                    <td>{q["question"]}</td>
                    <td>{q["status"]}</td>
                  </tr>
                ))}
              </table>
               </div>
            )}
            </div>
            ))}
          
        </div>
    )
};
export default Show;