import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";


function WorkoutDetail({ workout }) {
  const { dispatch } = useWorkoutsContext();

  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing((prev) => !prev);
  };

  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

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
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <span className='delelteBtn' onClick={handleClick}>Delete</span>
    
      </div>


    </>
  );
}

export default WorkoutDetail;
