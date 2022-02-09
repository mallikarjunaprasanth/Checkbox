import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

// import { Link } from "react-router-dom";

export default function App() {
  const [apiData, setapiData] = useState([]);
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);
 

 console.log(count)
const handleCount =(checkboxId)=>{
  console.log(document.getElementById(checkboxId).checked);
  var checkBoxStatus = document.getElementById(checkboxId).checked;
  if(checkBoxStatus){
    setCount(count+1)
   
  }else{
    
    setCount(count-1)
    if(count===0){
      setShow(show)
    }
  }
}


  // api calling  {get data}

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://fakestoreapi.com/products?limit=5`
    );
    setapiData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {apiData && apiData.length > 0 ? (
        <div className="container cursor w-75">
          <h5 className="mt-2">What Would you like to return ?</h5>
          {/* Return products */}
          {apiData.map((user, index) => (
            <div className="card editshadow mt-4" key={user.id} index={index}>
              <div className="row ">
                <div className="col-lg-2 col-12  height_modify justify-content-center align-items-center row">
                  <img
                    src={user.image}
                    className="w-75 h-75 overflow-hidden"
                    alt={user.title}
                  />
                </div>
                <div className="col-lg-9 col-12">
                  <div className="mt-3">
                    <div>
                      <code className="fw-bold text-dark">Order Id :</code>
                      {user.id}
                    </div>
                    <div>
                      <code className="fw-bold text-dark ">Product :</code>
                      {user.category}
                    </div>
                    <div>
                      <code className="fw-bold text-dark ">Brand :</code>
                      {user.title}
                    </div>

                    <div>
                      <code className="fw-bold text-dark ">price :</code> $
                      {user.price}
                    </div>
                  </div>
                </div>
                {/*--- checkbox--- */}

                <div className="col-lg-1">
                  <form>
                    <div >
                      <input
                        onChange={(e)=>handleCount("checkbox"+index)}
                        type="checkbox"
                          id={"checkbox"+index}
                        className="float-end mt-3 chnage"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ))}
          {/* ---submit--- */}

          { count>0  || !show ? (
            <div className="text-end  mt-4 ">
              <button type="submit" className="me-3 fs-5 ">
                Cancel
              </button>
              <button
                type="submit"
                className="fs-5 "
               
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        // ----loading---
        <div className="text-center  ">
          <section>
            <img
              src="https://www.jain.software/careers/images/loader.gif"
              className="w-25"
              alt="loader"
            />
          </section>
        </div>
      )}
    </div>
  );
}
