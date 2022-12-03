import React from "react";
// import { NavLink,Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { useState } from "react";
// import { useEffect } from "react";
import Show from "./Show";
import './A.css';

const Home = () => {
    
  
  
    const [action , setAction ] =useState(0)
    const [fetching,setFetching]=useState(0)
    const [flag , setFlag ] =useState(0)
    const [number , setNumber ] =useState(0)
    const [data, setData] = useState(0)
    const [n1, setN1] = useState(1)
    const [n2, setN2] = useState(1)
    const [n3, setN3] = useState(1)
    

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
        setFetching(1);
        console.log("here")
        let userids = []
        
           number["1"].map((val)=>{
                userids.push([document.getElementById("n1_"+val.toString()).value])
           })
           number["2"].map((val)=>{
            userids.push([document.getElementById("n2_"+val.toString()+"_1").value,document.getElementById("n2_"+val.toString()+"_2").value])
       })
       number["3"].map((val)=>{
        userids.push([document.getElementById("n3_"+val.toString()+"_1").value,document.getElementById("n3_"+val.toString()+"_2").value,document.getElementById("n3_"+val.toString()+"_3").value])
   })
        
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
        setFetching(0);
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
            let p={"1":[],"2":[],"3":[]}
            console.log(n1,n2,n3)
            for(let i=0;i<n1;i++){
                p["1"].push(i)   
            }
            for(let i=0;i<n2;i++){
                p["2"].push(i)   
            }
            for(let i=0;i<n3;i++){
                p["3"].push(i)   
            }
            console.log(p)
            setNumber(p);
        }







  return (
    <>
    <Nav/>
    <div className=" w-full p-3">
        

       <h2 className="text-2xl mb-16 w-full font-bold text-red-700">This is the application where you can visualize the codeforces users</h2>
       {flag==0 && (<>
       <div>
       <div className="mt-2">
        <label className="text-left">How many user's profile you want to see: </label>
        <br/>
        <input 
        onChange={(e)=>setN1(e.target.value)}
        value={n1}
        className="w-1/3 border-2 border-stone-600 pl-1 pr-1 p-1 rounded-md"></input>
        </div>
        <div className="mt-2">
        <label className="text-left">How many two user's profile you want to compare: </label>
        <br/>
        <input 
        onChange={(e)=>setN2(e.target.value)}
        value={n2}
        className="w-1/3 border-2 border-stone-600 pl-1 pr-1 p-1 rounded-md"></input>
        </div>
        <div className="mt-2">
        <label className="text-left">How many three user's profile you want to compare: </label>
        <br/>
        <input 
        onChange={(e)=>setN3(e.target.value)}
        value={n3}
        className="w-1/3 border-2 border-stone-600 pl-1 pr-1 p-1 rounded-md"></input>
        </div>
       </div>

       <button onClick={setactionno} className="mt-4 bg-orange-600 p-2 rounded-md text-white"> Submit</button>
       </>)}
      {
        flag==1 && (
            <div>
                {number["1"].length!=0 && <>
                <div>For user Details, Enter User Id</div>
                <div className="flex">
                {number["1"].map((val)=>(
                    <div>
                    <input id={"n1_"+val.toString()} className="border-2 border-stone-700 p-1 rounded-md"></input>
                    </div>
                ))}
                </div>
                </>}
                <br/>
                {number["2"].length!=0 && <>
                <div>For Two users comaprision, Enter User Id</div>
                <div className="flex">
                {number["2"].map((val)=>(
                    <div className="block border-2 border-black p-3 m-2">
                    <input id={"n2_"+val.toString()+"_1"} className="border-2 border-stone-700 p-1 rounded-md"></input><br/><br/>
                    <input  id={"n2_"+val.toString()+"_2"}className="border-2 border-stone-700 p-1 rounded-md"></input>
                    </div>
                ))}
                
                </div>
                </>}
                <br/>
                {number["3"].length!=0 && <>
                <div>For Three users comaprision, Enter User Id</div>
                <div className="flex">
                {number["3"].map((val)=>(
                    <div className="block border-2 border-black p-3 m-2">
                    <input id={"n3_"+val.toString()+"_1"} className="border-2 border-stone-700 p-1 rounded-md"></input><br/><br/>
                    <input id={"n3_"+val.toString()+"_2"} className="border-2 border-stone-700 p-1 rounded-md"></input><br/><br/>
                    <input id={"n3_"+val.toString()+"_3"} className="border-2 border-stone-700 p-1 rounded-md"></input>
                    </div>
                ))}
                </div>
                </>}
                <button onClick={find} className="text-white bg-orange-600 rounded-md p-2">Fetch Results</button>
            </div>
        )
      }

            {data!=0 && fetching==0 && <Show data={data}/>}
            {fetching==1 && <p>Fetching the results for you.. Please wait :{")"}</p>}
            
    </div>
    </>
  );
};

export default Home;