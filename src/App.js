import axios from "axios";
import React, { useState,useEffect } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(true)
  const [error,seterror]=useState(false)
  const [page,setPage]=useState(1)
  const [salary,setSalary]=useState("ASC")


  useEffect(() => {
    
      fetchData({page,salary})
    
  },[page,salary])

  const fetchData=()=>{
    setLoading(true)
    axios({
      method:"get",
      url:"https://json-server-mocker-masai.herokuapp.com/candidates",

      params :{
        _page:page,
        _limit:5,
        _sort:"salary",
        _order:`${salary}` 


      }
  })
  .then(res=>{
    setData(res.data)
    setLoading(false)

  })
  .catch(err=>{
    setLoading(false)
    seterror(true)
  })

  }

  return (
    <div className="App">
      <div>
      { loading && <div id="loading-container">...Loading</div>}
      {error && <div>Something went wrong!</div>}
        <Button id="SORT_BUTTON" title={`Sort by Ascending Salary`} onClick={()=>setSalary("DESC")}  />
        <Button  title="PREV" id="PREV" disabled={page==1} onClick={()=>setPage(page-1)} />
        <Button  id="NEXT" title="NEXT" onClick={()=>setPage(page+1)} />
      </div>
      {data.map((item) => {
       return <CandidateCard key={item.id}{...item}/>
      })
    }
    </div>
  );
}
