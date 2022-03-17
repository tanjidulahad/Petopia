import React, { useEffect } from "react";

import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";

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
  }, [])

  return (
    <div id="tracker">
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
    </div>
  );
}
