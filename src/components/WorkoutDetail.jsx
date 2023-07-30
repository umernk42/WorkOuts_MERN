import React, { useState,useContext } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {AiFillDelete,AiFillEdit} from "react-icons/ai";
import { EditContext } from "../context/EditContext";
import { DeleteContext } from "../context/DeleteContext";

function WorkoutDetail({ workout, baseURL,setCurrentWorkout }) {
  const { dispatch } = useWorkoutsContext();
  const editContext = useContext(EditContext);
  const deleteContext = useContext(DeleteContext);

  const handleEdit = () => {
    editContext.setIsOpen(true);
    setCurrentWorkout(workout);
  };

  const askDlt = () => {
    deleteContext.setIsOpen(true);
    setCurrentWorkout(workout);
  }


/*   const handleDlt = async () => {
    const response = await fetch(
      baseURL+"/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  }; */

  return (
    <>
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.updatedAt), {
            addSuffix: true,
          })}
        </p>
        <span className='editBtn' onClick={handleEdit}><AiFillEdit /></span>
        <span className='delelteBtn' onClick={askDlt}><AiFillDelete /></span>
      </div>


    </>
  );
}

export default WorkoutDetail;
