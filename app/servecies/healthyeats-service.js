

import { db } from "../_utils/firebase";
import { doc, setDoc, deleteDoc, updateDoc, getDoc , collection , onSnapshot} from "firebase/firestore";

// Reference to the mealPlans collection
const mealPlanRef = collection(db, 'mealPlans');

// Function to save a meal plan
export const saveMealPlan = async (userId, mealPlan) => {
  const userDocRef = doc(mealPlanRef, userId);
  await setDoc(userDocRef, { mealPlan });
};

// Function to delete a meal plan
export const deleteMealPlan = async (userId) => {
  const userDocRef = doc(mealPlanRef, userId);
  await deleteDoc(userDocRef);
};

// Function to update a meal plan
export const updateMealPlan = async (userId, mealPlan) => {
  const userDocRef = doc(mealPlanRef, userId);
  await updateDoc(userDocRef, { mealPlan });
};

// Function to load a meal plan
export const loadMealPlan = async (userId, callback) => {
    const userDocRef = doc(mealPlanRef, userId);
  
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        callback(docSnap.data().mealPlan);
      } else {
        callback(null);
      }
    });
  
    // Return the unsubscribe function so you can stop listening for updates
    return unsubscribe;
  };