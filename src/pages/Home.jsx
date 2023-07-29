import React, { useEffect, useState } from "react";
import WorkoutDetail from "../components/WorkoutDetail";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function Home() {
  const {workouts,dispatch} = useWorkoutsContext();
  
  //  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkOuts = async () => {
      const response = await fetch("https://workouts-mern-backend.onrender.com/api/workouts");
      const json = await response.json();

      if (response.ok) {
        //setWorkouts(json);
        dispatch({
          type: 'SET_WORKOUTS',
          payload: json
        });
      }
    };

    fetchWorkOuts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => {
          return (
          <WorkoutDetail key={workout._id} workout={workout} />
          );
        })}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
