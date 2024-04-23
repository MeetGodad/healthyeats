"use client"

import { useState, useEffect } from "react";

export default function MealPlan({searchParams}) {
    let bmrNormal = searchParams.bmrNormal;
    let bmrMedium = searchParams.bmrMedium;
    
    const [mealPlan, setMealPlan] = useState([]);
    const [medianCalories, setMedianCalories] = useState(0);
    const [dietRestrictions , setDietRestriction ] = useState("None");
    const [allergies, setAllergies] = useState("None");

    const median = (bmrNormal, bmrMedium) => {
        const medianValue = Math.floor((bmrNormal + bmrMedium) / 2);
        setMedianCalories(medianValue);
    }
    
    const fetchMealPlan = async ( {medianCalories} ) => {
        const response = await fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=85fd6345419b416d9c744fd732238359&timeFrame=week&targetCalories=${medianCalories}&diet=${dietRestrictions}&exclude=${allergies}`);   
        const data = await response.json();
        console.log(data);
        return data;
    }
    const loadMealPlan = async () => {
        if (bmrMedium !== "") {
            const data = await fetchMealPlan({medianCalories});
            setMealPlan(data);
        };
    }
    useEffect(() => {
        loadMealPlan();
    }, [dietRestrictions , allergies]);
    return (
        <div className={`flex justify-center items-center min-h-screen bg-green-400 text-white`}  style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\' viewBox=\'0 0 100 100\'%3E%3Cpolygon fill=\'%23ffffff\' fill-opacity=\'0.25\' points=\'50,0 100,0 0,100 0,50\'/%3E%3C/svg%3E")', backgroundPosition: '50% 50%'}} >
            <div className={`p-6 max-w-7xl mx-auto rounded-xl shadow-md flex flex-col items-center space-y-4 border-4 border-white bg-green-900`}>    
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4">Select Your Dietary Restriction</h2>
                    <div className="flex flex-col space-y-4">
                        <div className="flex justify-around ">
                            <label >Gluten Free</label>
                            <input type="radio" id="glutenFree" name="diet" value="glutenFree"  onChange={(e) => setDietRestriction(e.target.value)} />
                            <label >Ketogenic</label>
                            <input type="radio" id="ketogenic" name="diet" value="ketogenic" onChange={(e) => setDietRestriction(e.target.value)} />
                            <label >Vegetarian</label>
                            <input type="radio" id="vegetarian" name="diet" value="vegetarian" onChange={(e) => setDietRestriction(e.target.value)} />
                            <label >Vegan</label>
                            <input type="radio" id="vegan" name="diet" value="vegan" onChange={(e) => setDietRestriction(e.target.value)} />
                        </div>
                        <div className="flex justify-around ">
                            <label >Pescetarian</label>
                            <input type="radio" id="pescetarian" name="diet" value="pescetarian" onChange={(e) => setDietRestriction(e.target.value)} />
                            <label >Paleo</label>
                            <input type="radio" id="paleo" name="diet" value="paleo" onChange={(e) => setDietRestriction(e.target.value)} />
                            <label >Primal</label>
                            <input type="radio" id="primal" name="diet" value="primal" onChange={(e) => setDietRestriction(e.target.value)} />
                            <label >Whole30</label>
                            <input type="radio" id="whole30" name="diet" value="whole30" onChange={(e) => setDietRestriction(e.target.value)} />
                            <label >None</label>
                            <input type="radio" id="none" name="diet" onChange={(e) => setDietRestriction(null)} />
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4"> Write The Allgeries (If You Have Any) :   </h2>
                    <input 
                    type="text"
                    value={allergies} 
                    onChange={(e) => setAllergies(e.target.value)}
                    className=" w-full px-3 py-2 border border-green-300 rounded-md text-green-950 "/>
                </div>
            {dietRestrictions != "None"  && mealPlan.week ?
                    Object.keys(mealPlan.week).map((day) => (
                    <div key={day} className="w-full">
                        <h2>{day.toUpperCase()}</h2>
                        <ul className="space-y-2">
                            {mealPlan.week[day].meals.map((meal, id) => (
                                <li key={id} className="border border-green-300 p-2 rounded-md"> 
                                    <h3 className="font-bold"></h3>
                                    <h3>{meal.title}</h3>
                                    <p>Ready in minutes: {meal.readyInMinutes}</p>
                                    <p>Servings: {meal.servings}</p>
                                    <p><a href={meal.sourceUrl} className="text-blue-500 hover:underline">Recipe link</a></p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
                : (
                    <p>Please Select Dietary Restrictions .....</p>)}
            </div>
        </div>
    );
}