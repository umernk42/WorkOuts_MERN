import React, { useState,useContext } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { EditContext } from "../context/EditContext";

function EditForm({setCurrentWorkout,currentWorkout,baseURL,setIsEditing}) {
  const editContext = useContext(EditContext);
  const {dispatch} = useWorkoutsContext(); 
  const currentTitle = currentWorkout.title;
  const currentLoad = currentWorkout.load;
  const currentReps = currentWorkout.reps;

  const [title, setTitle] = useState(currentTitle);
  const [load, setLoad] = useState(currentLoad);
  const [reps, setReps] = useState(currentReps);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const workout = {title, load, reps};
    
    const response = await fetch(baseURL+"/api/workouts/"+currentWorkout._id, {
      method: "PATCH",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      console.log('Response not OK');
    }

    console.log(error);
    console.log(emptyFields);

    if (response.ok) {
      setIsEditing(true);
      const updatedWorkout = await fetch(baseURL+"/api/workouts/"+currentWorkout._id, {
        method: "GET"
      });

      const updatedJson = await updatedWorkout.json();

      setTitle("");
      setLoad("");
      setReps("");
      setEmptyFields([]);
      editContext.setIsOpen(false);
      setError(null);
      setCurrentWorkout(null);
      console.log("Changes Saved ", updatedJson);
      dispatch({
        type: 'EDIT_WORKOUT',
        payload: updatedJson
      });
      console.log('Response Ok');
      setIsEditing(false);
    }

  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <h3>Edit </h3>

      <label>Excersize Title: </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className= {emptyFields.includes('title') ? 'error': '' }
      />

      <label>Load(kg) : </label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className= {emptyFields.includes('load') ? 'error': ''}
      />

      <label>Reps: </label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className= {emptyFields.includes('reps') ? 'error': '' }
      />

      <button>Save Changes</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default EditForm;
