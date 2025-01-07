import { useState } from "react";
import './TasksManagementBar.css'
import TasksModal from "./TaskModal";
import { createPortal } from 'react-dom';

const TasksManagementBar = () => {
    const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);

    return (
        <>
            <div className={"management-bar"}>
                <button className="delete-btn btn"> Delete Task </button>
                <button className="edit-btn btn"> Edit Task </button>
                <button onClick={() => setTaskModalIsOpen(true)} className="create-btn btn"> Add Task </button>
            </div >
            {taskModalIsOpen && createPortal(<TasksModal modalIsOpen={taskModalIsOpen} setModalIsOpen={setTaskModalIsOpen} />, document.body)}

        </>
    );
};

export default TasksManagementBar;
