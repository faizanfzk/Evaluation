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


  useEffect(() => {
    
      fetchData(page)
    
  },[page])

  const fetchData=()=>{
    setLoading(true)
    axios({
      method:"get",
      url:"http://localhost:8080/candidates",

      params :{
        _page:page,
        _limit:5

      }
  })
  .then(res=>{
    setData(res.data)
    setLoading(true)

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
        <Button id="SORT_BUTTON" title={`Sort by Ascending Salary`} />
        <Button  title="PREV" id="PREV" />
        <Button  id="NEXT" title="NEXT" />
      </div>
      {data.map((item) => {
       return <CandidateCard key={item.id}{...item}/>
      })
    }
    </div>
  );
}
