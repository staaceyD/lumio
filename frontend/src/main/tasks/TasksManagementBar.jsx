import { useState } from "react";
import styles from './TasksManagementBar.module.css'
import TasksModal from "./TaskModal";
import { createPortal } from 'react-dom';
import { deleteTasks } from "./TasksApi";
import PropTypes from 'prop-types'; 
import Button from "../common/Button";
import { useNavigate } from 'react-router-dom';

const TasksManagementBar = ({ setTasksData, getSelectedIds, taskSelectedData }) => {
    const navigate = useNavigate();
    const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);

    const handleTaskDelete = () => {
        const selectedTasksIds = getSelectedIds();
        deleteTasks(selectedTasksIds, setTasksData);
    }

    return (
        <>
            <div className={styles.managementBar}>
                {taskSelectedData.length ==1 &&<Button style={{ "marginRight": "32px" }} onClick={()=> {navigate(`/details/${taskSelectedData[0].id}`)}}> Edit Task </Button>}
                {taskSelectedData.length > 0 && <Button style={{ "marginRight": "32px" }} onClick={handleTaskDelete} > Delete Task </Button>}
                <Button onClick={() => setTaskModalIsOpen(true)} > Add Task </Button>
            </div >
            {taskModalIsOpen && createPortal(<TasksModal setTasksData={setTasksData} setModalIsOpen={setTaskModalIsOpen} />, document.body)}

        </>
    );
};

TasksManagementBar.propTypes = {
    setTasksData: PropTypes.func.isRequired,
    getSelectedIds: PropTypes.func.isRequired,
    taskSelectedData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default TasksManagementBar;
