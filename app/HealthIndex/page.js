"use client";
import React, { useState } from "react";
import  Link from "next/link";


const HealthIndex = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");

  const [bmi, setBmi] = useState(0);
  const [bmrNormal, setBmrNormal] = useState(0);
  const [bmrMedium, setBmrMedium] = useState(0);
  const [bmiStatus, setBmiStatus] = useState("");

  const calculateBmi = () => {
    const bmiValue = weight / (height / 100) ** 2;
    setBmi(bmiValue.toFixed(2));
    
    if (bmiValue < 18.5) {
        setBmiStatus("Underweight");
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setBmiStatus("Normal");
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        setBmiStatus("Overweight");
      } else if (bmiValue >= 30) {
        setBmiStatus("Obese");
      }
  };

  function getBmiMessage(bmi) {
    if (bmi < 18.5) {
      return "You are underweight.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return "You have a normal weight.";
    } else if (bmi >= 25 && bmi < 29.9) {
      return "You are overweight.";
    } else {
      return "You are obese.";
    }
  }

  const calculateBmr = (activityFactor) => {
    const bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
    return bmr * activityFactor;
  };

  const handleNext = () => {
    if (height && weight && age && gender) {
      calculateBmi();
      setBmrNormal(calculateBmr(1.2));
      setBmrMedium(calculateBmr(1.55));
    }
  };

  return (
    <div>
      <p>Lets Calculate your BMI and BMR</p>

        <div>
          <h3>Enter your Height : </h3>
          <input
              className=" text-gray-900"
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
          />
        </div>

      <div>
          <h3>Enter your Weight : </h3>
          <input
              className=" text-gray-900"
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
          />
      </div>

      <div>
          <h3>Enter your Age : </h3>
        <input
          className=" text-gray-900"
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <div>
          <h3>Select your gender : </h3> 
        <select value={gender}  className=" text-gray-900" onChange={(e) => setGender(e.target.value)}>
          <option  className=" text-gray-900" value="">Select Gender</option>
          <option  className=" text-gray-900" value="male">Male</option>
          <option  className=" text-gray-900" value="female">Female</option>
        </select>
      </div>

      <button onClick={handleNext} disabled={!height || !weight || !age || !gender}>  Next  </button>
        {bmi && (
          <div>
              <h3>Results : </h3>
            <div>  
            <p>BMI: {bmi}</p>
            <p>{getBmiMessage(bmi)}</p>
            <p>BMR (No Exercise): {bmrNormal.toFixed(0)} calories</p>
            <p>BMR (Medium Exercise): {bmrMedium.toFixed(0)} calories</p>
          </div>
          <Link href={"/MealPlan?bmrNormal="+bmrNormal+"&bmrMedium"+bmrMedium}>Let's Generate Your Meal Plan</Link>
          </div>
          )}
    </div>
    
  );
};

export default HealthIndex;