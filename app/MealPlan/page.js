"use client";

import { useState, useEffect } from "react";
import { saveMealPlan, updateMealPlan } from "../servecies/healthyeats-service";
import { useUserAuth } from "../_utils/auth-context";

export default function MealPlan({ searchParams }) {
  let bmrNormal = searchParams.bmrNormal;
  let bmrMedium = searchParams.bmrMedium;
  
  const { user } = useUserAuth();

  const [mealPlan, setMealPlan] = useState([]);
  const [medianCalories, setMedianCalories] = useState("");
  const [dietRestrictions, setDietRestriction] = useState("None");
  const [allergies, setAllergies] = useState("");


  
  const fetchMealPlan = async ({ medianCalories }) => {
    const response = await fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=3bf6dfc6c45a42e2b93c062a49076c17&timeFrame=week&targetCalories=${medianCalories}&diet=${dietRestrictions}&exclude=${allergies}`);
    const data = await response.json();
    console.log(data);
    return data;
  };
  useEffect(() => {
    let isCancelled = false;
    let median = (parseFloat(bmrNormal) + parseFloat(bmrMedium)) / 2;
    console.log(median);
    setMedianCalories(median);

    const loadMealPlan = async () => {
      if (!isCancelled && medianCalories !== "") {
        const data = await fetchMealPlan({ medianCalories });
        setMealPlan(data);
      };
    };
    loadMealPlan();
    return () => {
      isCancelled = true;
    }
  }, [medianCalories, dietRestrictions, allergies]);
  const handleSave = async () => {
    try {
      await saveMealPlan(user.uid, mealPlan); // Save the meal plan
      alert('Meal plan saved successfully!');
    } catch (error) {
      console.error('Failed to save meal plan:', error);
      alert('Failed to save meal plan. Please try again later.');
    }
  };
  const handleUpdate = async () => {
    try {
      await updateMealPlan(user.uid, mealPlan); // Update the meal plan
      alert('Meal plan updated successfully!');
    } catch (error) {
      console.error('Failed to update meal plan:', error);
      alert('Failed to update meal plan. Please try again later.');
    }
  };
  return (
    <div className="bg-green-900  relative flex items-center justify-center p-2 min-h-screen">
        <svg className="absolute inset-0 z-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#D1FAE5" fillOpacity="0.8" d="M0,160L48,144C96,128,192,96,288,112C384,128,480,192,576,213.3C672,235,768,213,864,197.3C960,181,1056,171,1152,154.7C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
        <div className="p-4 w-3/4 max-w-screen-lg mx-auto rounded-xl shadow-md flex flex-col justify-between items-center space-y-4 border-4 border-white bg-green-200 relative z-10">
          <div className="flex flex-col justify-center items-center space-y-4 w-full mt-12">
            <h2 className="text-3xl font-bold text-green-950 mb-4">Select Your Dietary Restriction</h2>
            <div className="flex flex-col space-y-4">
                <div className="flex justify-around">
                    <label className="text-black flex items-center" >
                    <input type="radio" id="glutenFree" name="diet" value="glutenFree" onChange={(e) => setDietRestriction(e.target.value)} className="mr-2 leading-tight text-green-500" />Gluten Free</label>
                    <label className="text-black flex items-center ml-6">
                    <input type="radio" id="ketogenic" name="diet" value="ketogenic" onChange={(e) => setDietRestriction(e.target.value)}  className="mr-2 leading-tight text-green-500" />Ketogenic</label>
                    <label className="text-black flex items-center ml-6">
                    <input type="radio" id="vegetarian" name="diet" value="vegetarian" onChange={(e) => setDietRestriction(e.target.value)}  className="mr-2 leading-tight text-green-500"/>Vegetarian</label>
                    <label className="text-black flex items-center ml-6">
                    <input type="radio" id="vegan" name="diet" value="vegan" onChange={(e) => setDietRestriction(e.target.value)}  className="mr-2 leading-tight text-green-500"/>Vegan</label>
                </div>
                <div className="flex justify-around">
                    <label className="text-black flex items-center">
                    <input type="radio" id="pescetarian" name="diet" value="pescetarian" onChange={(e) => setDietRestriction(e.target.value)} className="mr-2 leading-tight text-green-500" />Pescetarian</label>
                    <label className="text-black flex items-center ml-6">
                    <input type="radio" id="paleo" name="diet" value="paleo" onChange={(e) => setDietRestriction(e.target.value)}  className="mr-2 leading-tight text-green-500"/>Paleo</label>
                    <label className="text-black flex items-center ml-6">
                    <input type="radio" id="primal" name="diet" value="primal" onChange={(e) => setDietRestriction(e.target.value)}  className="mr-2 leading-tight text-green-500"/>Primal</label>
                    <label className="text-black flex items-center ml-6">
                    <input type="radio" id="whole30" name="diet" value="whole30" onChange={(e) => setDietRestriction(e.target.value)}  className="mr-2 leading-tight text-green-500"/>Whole30</label>
                    <label className="text-black flex items-center ml-6">
                    <input type="radio" id="none" name="diet" onChange={(e) => setDietRestriction(null)}  className="mr-2 leading-tight text-green-500"/>None</label>
                </div>
            </div>
            <div className="w-full flex flex-col items-center">
                <div className="w-full flex justify-center">
                <h2 className="text-3xl font-bold text-green-950 mb-4">Write Any Allergies (If You Have Any)</h2>
                </div>
                <div className="w-full flex justify-center">
                <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="w-full max-w-md px-3 py-2 border border-green-300 rounded-md text-green-950 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Enter allergies..."
                />
                </div>
            </div>
            {dietRestrictions !== "None" && mealPlan.week ?
                Object.keys(mealPlan.week).map((day) => (
                <div key={day} className="w-full">
                    <h2 className="text-xl font-bold text-green-950">{day.toUpperCase()}</h2>
                    <div className="space-y-2 grid grid-cols-3 gap-4">
                    {mealPlan.week[day].meals.map((meal, id) => (
                        <div key={id} className="border border-green-950 bg-green-900 p-2 rounded-md  ">
                            <h3 className="font-bold text-black"></h3>
                            <h3 className="text-green-200">{meal.title}</h3>
                            <p className="text-green-200">Ready in minutes: {meal.readyInMinutes}</p>
                            <p className="text-green-200">Servings: {meal.servings}</p>
                            <p><a href={meal.sourceUrl} className="text-blue-500 hover:underline">Recipe link</a></p>
                        </div>
                    ))}
                    </div>
                </div>
                ))
                : (
                <p className="text-black">Please Select Dietary Restrictions...</p>)}
                <div className="flex justify-center space-x-4 mt-8">
                    <button onClick={handleSave} className="w-full flex-shrink-0  py-3 px-4 bg-green-600 text-black font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700">Save Meal Plan</button>
                    <button onClick={handleUpdate} className="w-full flex-shrink-0 py-3 px-4 bg-green-600 text-black font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700">Update Saved Meal Plan</button>
                </div>
            </div>
        </div>
    </div>
  );
}
