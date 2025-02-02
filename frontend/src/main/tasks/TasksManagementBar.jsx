import { useState } from "react";
import styles from './TasksManagementBar.module.css'
import TasksModal from "./TaskModal";
import { createPortal } from 'react-dom';
import { deleteTasks } from "./TasksApi";
import PropTypes from 'prop-types'; 
import Button from "../common/Button";

const TasksManagementBar = ({ setTasksData, getSelectedIds }) => {
    const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);

    const handleTaskDelete = () => {
        const selectedTasksIds = getSelectedIds();
        deleteTasks(selectedTasksIds, setTasksData);
    }
    return (
        <>
            <div className={styles.managementBar}>
                {<><Button style={{ "margin-right": "32px" }} onClick={handleTaskDelete} > Delete Task </Button>
                    <Button style={{ "margin-right": "32px" }}> Edit Task </Button></>}

                <Button onClick={() => setTaskModalIsOpen(true)} > Add Task </Button>
            </div >
            {taskModalIsOpen && createPortal(<TasksModal setTasksData={setTasksData} setModalIsOpen={setTaskModalIsOpen} />, document.body)}

        </>
    );
};

TasksManagementBar.propTypes = {
    setTasksData: PropTypes.func.isRequired,
    getSelectedIds: PropTypes.func.isRequired,
};

export default TasksManagementBar;
