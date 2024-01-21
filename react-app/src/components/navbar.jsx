import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GiBeastEye } from "react-icons/gi";

export default function Navbar({ userId, logged }) {
    const [isLoggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        setLoggedIn(logged)
    }, [])
    
    return (
        <nav className="flex justify-between items-center p-6 bg-white text-black">
            <div className="flex items-center">
                <div className="flex flex-row space-x-4 items-center">
                    <GiBeastEye size={50} className=""/>
                    {isLoggedIn ? 
                        (<span className="select-none text-black font-bold text-xl">VocalVision</span>) : 
                        (<Link to="/" className="text-black font-bold text-xl">VocalVision</Link>)
                    }
                </div>
            </div>

            <div className="flex items-center">
            {!isLoggedIn ? (
                <div>
                    <Link to="/login" className="btn-login">Login</Link>
                    <Link to="/signup" className="btn-signup hover:bg-blue-700 transition ease-in-out duration-300">Create your account</Link>
                </div>
            ) : (
                <div>
                    <Link to={`/dashboard/${userId}`} className="text-gray-500 mr-6">dashboard</Link>
                    <button className="btn-signup hover:bg-blue-700 transition ease-in-out duration-300">Sign Out</button>
                </div>
            )}
            </div>
        </nav>
    )
}