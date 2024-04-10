"use client";

import {  useUserAuth } from "./_utils/auth-context";
import HealthIndex from "./HealthIndex";

export default function Login() {

const {user ,  gitHubSignIn, googleSignIn , firebaseSignOut} = useUserAuth();

    return (
        <div>
        {user ? (
            <div>
            <h1>Welcome To HealthyEats , Eat Healty Live Wealthy </h1>
            <h1>Hi {user.displayName} </h1>
            <HealthIndex />
            <button onClick={firebaseSignOut} className=" m-2">Sign Out </button>
            </div> )
            :
            (<div>
                <h1>Welcome To HealthyEats , Eat Healty Live Wealthy </h1>
                <button onClick={gitHubSignIn} className=" m-2">Login with GitHub</button>
                <button onClick={googleSignIn} className=" m-2">Login with Google</button>
            </div>)}
        </div>
    );
}