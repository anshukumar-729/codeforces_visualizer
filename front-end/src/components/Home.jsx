import React from "react";
import { NavLink,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Show from "./Show";

const Home = () => {
    
    let navigate = useNavigate(); 
  
    const [username,setUserName]=useState("");
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
    <div className="App">
       
       {flag==0 && <>
        <input
        type="number"
        value={action}
        onChange={(e)=>setAction(e.target.value)}
        ></input>
        <br/>
        <button onClick={setactionno}>Search</button>
        </>}
        {flag!=0 && <div>
                {number.map((n)=>(
                    <div>
                        <input id={"u11_"+n.toString()}></input>
                        <br/>
                        <input id={"u21_"+n.toString()}></input>
                        <input id={"u22_"+n.toString()}></input>
                        <br/>
                        <input id={"u31_"+n.toString()}></input>
                        <input id={"u32_"+n.toString()}></input>
                        <input id={"u33_"+n.toString()}></input>
                    </div>
                ))}
                <br/>
                <button onClick={find}>Find</button>
            </div>}
            {data!=0 && <Show data={data}/>}
            
    </div>
  );
};

export default Home;