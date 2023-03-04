import React, { useState } from 'react';
import Home from "./home.jsx";

function FetchAPI() {
  const [deleteResult, setDeleteResult] = useState(null)
    const formatResponse = (res) => {
    return JSON.stringify(res, null)
    }

  const apiGet = () => {
    fetch('https://3000-phorjax-todolistreact-912wcjrntfk.ws-us89.gitpod.io/', {
      method: "GET",
      // body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
    })
    .catch(error => {
        //error handling
        console.log(error);
    });
  }
  async function deleteAllInputs() {
    try{
      const res = await fetch(`${"https://3000-phorjax-todolistreact-912wcjrntfk.ws-us89.gitpod.io/"}`, {method: "DELETE"}) 
      const data = await res.json()
      const result = {
        status: res.status + "-" + res.statusText,
        headers: {"Content-Type": res.headers.get("Content-Type")},
        data: data
      }
      setDeleteResult(formatResponse(result))
    }
    catch(err){
      setDeleteResult(err.message)
    }
  }
  return (
    <button onClick={deleteAllInputs()} > my API</button>
    )
}

export default FetchAPI