import React, { useEffect, useContext, useState } from "react";
import WorkoutDetail from "../components/WorkoutDetail";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { EditContext } from "../context/EditContext";
import EditForm from "../components/EditForm";
import { DeleteContext } from "../context/DeleteContext";
import DeleteModal from "../components/DeleteModal";
import Loading from "../components/Loading";
import { useAuthContext } from "../hooks/useAuthContext";

function Home({ baseURL }) {
  const { workouts, dispatch } = useWorkoutsContext();
  const editContext = useContext(EditContext);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const deleteContext = useContext(DeleteContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isDel, setIsDel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {user} = useAuthContext();

  useEffect(() => {
    const fetchWorkOuts = async () => {
      const response = await fetch(baseURL + "/api/workouts",{
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_WORKOUTS",
          payload: json,
        });
      }
      
    };

    if(user){
      fetchWorkOuts();
      
    }
    setIsLoading(false);
    
  }, [dispatch,user]);

  const onClose = () => {
    editContext.setIsOpen(false);
    setCurrentWorkout(null);
  };

  const closeDelModal = () => {
    deleteContext.setIsOpen(false);
  };

  if (isLoading) {
    return <Loading loadingText="Loading..." />;
  }

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
            {isEditing ? (
              <Loading loadingText="Saving Changes..." />
            ) : (
              <EditForm
                setCurrentWorkout={setCurrentWorkout}
                currentWorkout={currentWorkout}
                baseURL={baseURL}
                setIsEditing={setIsEditing}
              />
            )}
          </div>
        </div>
      ) : null}

      {deleteContext.isOpen ? (
        <div className="modal">
          <span className="close" onClick={closeDelModal}>
            &times;
          </span>
          <div className="modal-content">
            {isDel ? (
              <Loading loadingText="Deleting..." />
            ) : (
              <DeleteModal
                setCurrentWorkout={setCurrentWorkout}
                currentWorkout={currentWorkout}
                baseURL={baseURL}
                setIsDel={setIsDel}
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
