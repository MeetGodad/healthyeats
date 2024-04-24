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
    <div className="bg-green-900  relative flex items-center justify-center p-2 min-h-screen">
        <svg className="absolute inset-0 z-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#D1FAE5" fillOpacity="0.8" d="M0,160L48,144C96,128,192,96,288,112C384,128,480,192,576,213.3C672,235,768,213,864,197.3C960,181,1056,171,1152,154.7C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
        <div className="absolute inset-x-0 top-10 py-4 text-green-900 text-3xl font-bold text-center">Welcome To Your MealPlan
        </div>
      <div className="mt-28 z-10">
          { mealPlan && mealPlan.week ?
                      Object.keys(mealPlan.week).map((day) => (
                      <div key={day} className="w-full mt-14">
                          <h2 className="text-xl font-bold text-green-200 ">{day.toUpperCase()}</h2>
                          <div className="space-y-2 grid grid-cols-3 gap-4">
                              {mealPlan.week[day].meals.map((meal, id) => (
                                  <div key={id} className="border border-green-900 bg-green-200 p-2 rounded-md z-10"> 
                                      <h3 className="font-bold  text-black"></h3>
                                      <h3 className="text-black">{meal.title}</h3>
                                      <p className="text-black">Ready in minutes: {meal.readyInMinutes}</p>
                                      <p className="text-black">Servings: {meal.servings}</p>
                                      <p><a href={meal.sourceUrl} className="text-blue-500 hover:underline">Recipe link</a></p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))
                  : (
                  <p className="text-black">There is no saved Meal Plan For You</p>)}
                  <div className="flex justify-center space-x-4 mt-8">
                    <button onClick={handleDelete} className="group relative w-3/6 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-green-200 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Delete Meal Plan</button>
                  </div>
      </div>
    </div>
  );
};

export default SavedMealPlanPage;