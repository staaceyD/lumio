import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../common/Button';
import { useParams } from "react-router-dom";
import { fetchTask, updateTask } from '../tasks/TasksApi.jsx';
import styles from './taskDetails.module.css';

// TODO: remove this when labels are implemented on BE
const LABELS = ['','Personal', 'Work', 'Shopping', 'Others']

const PRIORITY = ['','Low', 'Medium', 'High', 'Critical']
const STATUS = ['Not Started', 'In Progress', 'Completed', 'Blocked']

const TaskDetails = () => {
    const { id: taskId } = useParams();
    const [taskData, setTaskData] = useState({});

    let updatedTaskData = { ...taskData };
    
    useEffect(() => {
        fetchTask(taskId, setTaskData)
    }, [taskId]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTask(updatedTaskData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.detailSection}>
                    <label >Task Title</label>
                    <input
                        type="text"
                        name="title"
                        value={taskData.title || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.detailSection}>
                    <label>Description</label>
                    <textarea
                        name='description'
                        value={taskData.description || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.detailSection}>
                    <label>Note</label>
                    <input
                        name='note'
                        value={taskData.note || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.detailSection}>
                    <div className={styles.dropdownContainer}>
                        <label>Priority</label>
                        <select
                            name="priority"
                            value={taskData.priority || ''}
                            onChange={handleChange}
                        >
                            {PRIORITY.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
                        </select>
                        <label style={{marginLeft:"30px", marginRight:'10px'}}>Status</label>
                        <select
                            name="status"
                            value={taskData.status || ''}
                            onChange={handleChange}
                        >
                            {STATUS.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
                        </select>
                    </div>
                    <div className={styles.dropdownContainer}>
                        <label>Label</label>
                        <select
                            name="label"
                            value={taskData.label || ''}
                            onChange={handleChange}
                        >
                            {LABELS.map((label) => <option key={label} value={label}>{label}</option>)}
                        </select>

                        <label style={{marginLeft:"30px", marginRight:'10px'}}>Due Date</label>
                        <input
                            name="dueDate"
                            type="date"
                            value={taskData.dueDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={styles.detailSection}>
                    <label>Minutes spent:</label> {taskData.minutesSpent}
                </div>
                <Button style={{ margin: '20px 10%' }} type="submit">Save task</Button>
            </form>
        </div >
    );
};

TaskDetails.propTypes = {
    taskId: PropTypes.string,
};

export default TaskDetails;