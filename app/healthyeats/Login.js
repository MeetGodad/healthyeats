"use client";

import {  useUserAuth } from "./_utils/auth-context";
import HealthIndex from "./HealthIndex";
import Image from "next/image";

export default function Login({}) {

const {user ,  gitHubSignIn, googleSignIn , firebaseSignOut} = useUserAuth();

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-green-300 py-12 px-4 sm:px-6 lg:px-8" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'10\'/%3E%3Ccircle cx=\'70\' cy=\'70\' r=\'15\'/%3E%3Ccircle cx=\'130\' cy=\'130\' r=\'20\'/%3E%3Ccircle cx=\'50\' cy=\'150\' r=\'10\'/%3E%3Ccircle cx=\'150\' cy=\'50\' r=\'15\'/%3E%3C/g%3E%3C/svg%3E")'}}>
            <div className="absolute top-0 right-20 mt-[-20px]">
                <Image src="/images/logo.jpg" alt="Logo" width={500/5} height={300/5} />
            </div>
            {user ? (
            <div className="max-w-md w-full space-y-8">
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome To HealthyEats , Eat Healty Live Wealthy </h1>
                <h1 className="mt-6 text-center text-2xl font-extrabold text-gray-900">Hi {user.displayName} </h1>
                <HealthIndex />
                <button onClick={firebaseSignOut} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Sign Out </button>
            </div> ):(
            <div className="max-w-md w-full space-y-8">
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome To HealthyEats </h1>
                <h2 className="mt-6 text-center text-2x1 font-extrabold text-gray-900">Eat Healty Live Wealthy </h2>
                <button onClick={gitHubSignIn} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Login with GitHub</button>
                <button onClick={googleSignIn} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Login with Google</button>
            </div>
            )}
        </div>
    );
}