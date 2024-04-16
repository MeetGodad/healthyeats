"use client "

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function MealPlan({maxCalories, minCalories}) {
    
    const [mealPlan, setMealPlan] = useState([]);
    const [medianCalories, setMedianCalories] = useState(0);
    const [dietRestrictions , setDietRestriction ] = useState("None");
    const [allergies, setAllergies] = useState("None");

    const median = (minCalories, maxCalories) => {
        const medianValue = Math.floor((minCalories + maxCalories) / 2);
        setMedianCalories(medianValue);
    }
    
    const fetchMealPlan = async ( {medianCalories} ) => {
        const response = await fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=85fd6345419b416d9c744fd732238359&timeFrame=week&targetCalories=${medianCalories}&diet=${dietRestrictions}&exclude=${allergies}`);   
        const data = await response.json();
        console.log(data);
        return data;
    }
    const loadMealPlan = async () => {
        if (maxCalories !== "") {
            const data = await fetchMealPlan({medianCalories});
            setMealPlan(data);
        };
    }
    useEffect(() => {
        loadMealPlan();
    }, [dietRestrictions , allergies]);
     return (
        <div>
            <div>
                <h2>Select Your Dietary Restriction</h2>
                <label >Gluten Free</label>
                <input type="radio" id="glutenFree" name="diet" value="glutenFree"  onChange={(e) => setDietRestriction(e.target.value)} />
                <label >Ketogenic</label>
                <input type="radio" id="ketogenic" name="diet" value="ketogenic" onChange={(e) => setDietRestriction(e.target.value)} />
                <label >Vegetarian</label>
                <input type="radio" id="vegetarian" name="diet" value="vegetarian" onChange={(e) => setDietRestriction(e.target.value)} />
                <label >vegan</label>
                <input type="radio" id="vegan" name="diet" value="vegan" onChange={(e) => setDietRestriction(e.target.value)} />
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
            <div>
                <h2> Write The Allgeries (If You Have Any) :   </h2>
                <input 
                type="text"
                value={allergies} 
                onChange={(e) => setAllergies(e.target.value)}
                className=" text-gray-900 " />
            </div>
        {dietRestrictions != "None"  && mealPlan.week ?
                Object.keys(mealPlan.week).map((day) => (
                <div key={day}>
                    <h2>{day.toUpperCase()}</h2>
                    <ul>
                        {mealPlan.week[day].meals.map((meal, index) => (
                            <li key={index}>
                                <h3>{meal.title}</h3>
                                <p>Ready in minutes: {meal.readyInMinutes}</p>
                                <p>Servings: {meal.servings}</p>
                                <p><a href={meal.sourceUrl}>Recipe link</a></p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))
            : (
                <p>Loading meal plan...</p>)}
        </div>
    );
}