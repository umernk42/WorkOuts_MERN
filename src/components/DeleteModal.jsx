import React,{useContext} from "react";
import { DeleteContext } from "../context/DeleteContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function DeleteModal({ setCurrentWorkout,currentWorkout, baseURL }) {

  const deleteContext = useContext(DeleteContext);  
  const { dispatch } = useWorkoutsContext();

  const handleNo = () => {
    deleteContext.setIsOpen(false);
  }

  const handleDlt = async () => {
    const response = await fetch(baseURL + "/api/workouts/" + currentWorkout._id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }

    deleteContext.setIsOpen(false);
    setCurrentWorkout(null);
  };

  return (
    <div>
      <h2>Are you sure you want to delete this workout?</h2>
      <div className="delOptions">
        <button onClick={handleDlt} >Yes</button>
        <button onClick={handleNo}>No</button>
      </div>
    </div>
  );
}

export default DeleteModal;
