import React, { useEffect, useContext, useState } from "react";
import WorkoutDetail from "../components/WorkoutDetail";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { EditContext } from "../context/EditContext";
import EditForm from "../components/EditForm";
import { DeleteContext } from "../context/DeleteContext";
import DeleteModal from "../components/DeleteModal";

function Home({ baseURL }) {
  const { workouts, dispatch } = useWorkoutsContext();
  const editContext = useContext(EditContext);
  //  const [workouts, setWorkouts] = useState(null);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const deleteContext = useContext(DeleteContext);

  useEffect(() => {
    const fetchWorkOuts = async () => {
      const response = await fetch(baseURL + "/api/workouts");
      const json = await response.json();

      if (response.ok) {
        //setWorkouts(json);
        dispatch({
          type: "SET_WORKOUTS",
          payload: json,
        });
      }
    };

    fetchWorkOuts();
  }, []);

  const onClose = () => {
    editContext.setIsOpen(false);
    setCurrentWorkout(null);
  };

  const closeDelModal = () => {
    deleteContext.setIsOpen(false);
  };

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => {
            return (
              <WorkoutDetail
                key={workout._id}
                workout={workout}
                baseURL={baseURL}
                setCurrentWorkout={setCurrentWorkout}
              />
            );
          })}
      </div>
      <WorkoutForm baseURL={baseURL} />
      {editContext.isOpen ? (
        <div className="modal">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <div className="modal-content">
            <EditForm
              setCurrentWorkout={setCurrentWorkout}
              currentWorkout={currentWorkout}
              baseURL={baseURL}
            />
          </div>
        </div>
      ) : null}

      {deleteContext.isOpen ? (
        <div className="modal">
          <span className="close" onClick={closeDelModal}>
            &times;
          </span>
          <div className="modal-content">
            <DeleteModal
              setCurrentWorkout={setCurrentWorkout}
              currentWorkout={currentWorkout}
              baseURL={baseURL}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
