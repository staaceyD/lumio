import { useState } from "react";
import './TasksManagementBar.css'
import TasksModal from "./TaskModal";
import { createPortal } from 'react-dom';
import { deleteTasks } from "./TasksApi";

const TasksManagementBar = ({ setTasksData, getSelectedIds }) => {
    const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);

    const handleTaskDelete = () => {
        const selectedTasksIds = getSelectedIds();
        deleteTasks(selectedTasksIds);
    }
    return (
        <>
            <div className={"management-bar"}>
                {<><button onClick={handleTaskDelete} className="delete-btn btn"> Delete Task </button>
                    <button className="edit-btn btn"> Edit Task </button></>}

                <button onClick={() => setTaskModalIsOpen(true)} className="create-btn btn"> Add Task </button>
            </div >
            {taskModalIsOpen && createPortal(<TasksModal setTasksData={setTasksData} setModalIsOpen={setTaskModalIsOpen} />, document.body)}

        </>
    );
};

export default TasksManagementBar;
