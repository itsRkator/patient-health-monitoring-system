import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white text-lg font-bold" to="/">
          Healthcare App
        </Link>
        <div className="flex items-center">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-white px-4">
              Logout
            </button>
          ) : (
            <>
              <Link className="text-white px-4" to="/login">
                Login
              </Link>
              <Link className="text-white px-4" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
