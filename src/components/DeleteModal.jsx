import React, { useContext, useState } from "react";
import { DeleteContext } from "../context/DeleteContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import Loading from "./Loading";

function DeleteModal({ setCurrentWorkout, currentWorkout, baseURL,setIsDel }) {
  const deleteContext = useContext(DeleteContext);
  const { dispatch } = useWorkoutsContext();
 

  const handleNo = () => {
    deleteContext.setIsOpen(false);
  };

 
  const handleDlt = async () => {
    setIsDel(true);
    const response = await fetch(
        baseURL + "/api/workouts/" + currentWorkout._id,
        {
          method: "DELETE",
        }
      );
  
      const json = await response.json();
  
      if (response.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: json });
      }
      deleteContext.setIsOpen(false);
      setCurrentWorkout(null);
      setIsDel(false);
  }

  return (
    <>
      <div>
        
            <h2>Are you sure you want to delete this workout?</h2>
            <div className="delOptions">
              <button onClick={handleDlt}>Yes</button>
              <button onClick={handleNo}>No</button>
            </div>
      </div>
    </>
  );
}

export default DeleteModal;
