"use client";

import { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { loadMealPlan , deleteMealPlan} from '../servecies/healthyeats-service'; // Import the service

// ...

const SavedMealPlanPage = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    let unsubscribe = null;
  
    const load = async () => {
        if (userId) {
          unsubscribe = await loadMealPlan(userId, setMealPlan);
        }
      };
    
      load();
    // Clean up the listener when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId]);

  const handleDelete = async () => {
    try {
      await deleteMealPlan(userId); // Delete the meal plan
      setMealPlan(null); // Clear the meal plan from state
      alert('Meal plan deleted successfully!');
    } catch (error) {
      console.error('Failed to delete meal plan:', error);
      alert('Failed to delete meal plan. Please try again later.');
    }
  };


  return (
    <div>
         { mealPlan && mealPlan.week ?
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
                    <p>There is no saved Meal Plan For You</p>)}
        <button onClick={handleDelete} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Delete Meal Plan</button>
    </div>
  );
};

export default SavedMealPlanPage;