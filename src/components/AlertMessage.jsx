import React from "react";


const AlertMessage = ( {message, type, onClose})=> {
    if (!message) return null;
    return (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-md text-white ${type === "error" ? "bg-darkGray" : "bg-darkGray"}`}>
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 font-bold border border-whiteGray px-2 rounded-md">X</button>
      </div>
    );
};

export default AlertMessage;