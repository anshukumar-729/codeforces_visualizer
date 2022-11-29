import React from "react";
// import { NavLink,Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useEffect } from "react";
import Show from "./Show";
import './A.css';

const Home = () => {
    
  
  
    const [action , setAction ] =useState(0)
    const [flag , setFlag ] =useState(0)
    const [number , setNumber ] =useState(0)
    const [data, setData] = useState(0)

	async function get() {
		try {
			const response = await fetch(
				`http://localhost:3020/hello`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					mode: "cors",
				}
			);
			const data2 = await response.json();
			console.log(data2)

		} catch (err) {
			console.log(err);
		}
	}

    // get();

    async function find(){
        console.log("here")
        let userids = []
        for(let i=0;i<number.length;i++){
            userids.push([document.getElementById(`u11_${number[i].toString()}`).value])
            userids.push([document.getElementById(`u21_${number[i].toString()}`).value,document.getElementById(`u22_${number[i].toString()}`).value])
            userids.push([document.getElementById(`u31_${number[i].toString()}`).value,document.getElementById(`u32_${number[i].toString()}`).value,document.getElementById(`u33_${number[i].toString()}`).value])
        }
        console.log(userids)
    try {
        const response = await fetch(
            `http://localhost:3020/profile/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userids: userids
                }),
                mode: "cors",
            }
        );
        const data2 = await response.json();
        console.log(data2)
        setData(data2)
            } catch (err) {
                console.log(err);
            }
        // window.location.href = 'http://localhost:3000/show';
        // window.location.replace('/show')
        
        //   let path = `/show`; 
        //   navigate(path);
        }

        function setactionno(){
            setFlag(1);
            let temp = []
            for(let i=0;i<action;i++){
                temp[i]=i;
            }
            setNumber(temp)
        }







  return (
    <div style={{float: "left", width: "80%",marginLeft:"10%",marginRight:"20%",marginTop:"4%",textAlign:"center"}}>
       <h2>Enter the Details</h2>
       {flag==0 && <>
        <input
        type="number"
        value={action}
        
        onChange={(e)=>setAction(e.target.value)}
        ></input>
        <br/>
        <br />
        <button style={{width: "5%",height: "30px",borderRadius: "10px",backgroundColor: "#38E54D",color:"white"}} onClick={setactionno}>Go</button>
        </>}
        {flag!=0 && <div>
                {number.map((n)=>(
                    <div>
                        <h4>Enter user 1 details</h4>
                        <input id={"u11_"+n.toString()}></input>
                        <br/>
                        <h4>Enter user 2 and user 3 details</h4>
                        <input id={"u21_"+n.toString()}></input>
                        <input id={"u22_"+n.toString()}></input>
                        <br/>
                        <h4>Enter user 1, user 2 and user 3 details details</h4>
                        <input id={"u31_"+n.toString()}></input>
                        <input id={"u32_"+n.toString()}></input>
                        <input id={"u33_"+n.toString()}></input>
                    </div>
                ))}
                <br/>
                <button style={{width: "5%",height: "30px",borderRadius: "10px",backgroundColor: "#38E54D",color:"white"}} onClick={find}>Find</button>
            </div>}
            {data!=0 && <Show data={data}/>}
            
    </div>
  );
};

export default Home;