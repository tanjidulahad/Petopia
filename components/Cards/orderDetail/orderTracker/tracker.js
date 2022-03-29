import React, { useEffect } from "react";

import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
import {TiTick} from 'react-icons/ti'
export default function Tracker() {
  const step1Content = <h1></h1>;
  const step2Content = <h1></h1>;
  const step3Content = <h1></h1>;

  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    return true;
  }

  function step3Validator() {
    // return a boolean
  }
  useEffect(() => {
    document.getElementById("tracker").childNodes[0].childNodes[2].style.display = 'none'
  document.getElementsByTagName("span")[8].style.backgroundColor="#D85A5A"
  const second=  document.getElementsByTagName("span")[8]


  document.getElementsByTagName("span")[8].innerHTML=`<svg stroke="white" fill="#FFFF" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16.972 6.251c-.967-.538-2.185-.188-2.72.777l-3.713 6.682-2.125-2.125c-.781-.781-2.047-.781-2.828 0-.781.781-.781 2.047 0 2.828l4 4c.378.379.888.587 1.414.587l.277-.02c.621-.087 1.166-.46 1.471-1.009l5-9c.537-.966.189-2.183-.776-2.72z"></path></svg>`
  let line = document.createElement("div");
  // console.log(second.querySelector("::before"));


  document.getElementsByClassName("_1hzhf")[0].style.fontSize="14px"
  document.getElementsByClassName("_1hzhf")[1].style.fontSize="14px"
  document.getElementsByClassName("_1hzhf")[2].style.fontSize="14px"
  document.getElementsByClassName("_1hzhf")[3].style.fontSize="14px"




  }, [])

  return (
    <div id="tracker" className=" bg-white">
      <StepProgressBar
        startingStep={0}
        steps={[
          {
            name: "Order Placed",
            label: "Order Placed",
            content: step1Content
          },
          {
            label: "Waiting for confirmation",
            name: "Waiting for confirmation",
            content: step2Content
          },
          {
            label: "preapring",
            name: "preapring",
            content: step3Content,
            validator: step2Validator
          },
          {
            label: "Out for delivery",
            name: "Out for delivery",
            content: step3Content
          }
        ]}
      />
      {/* <TiTick/> */}

    </div>
  );
}
