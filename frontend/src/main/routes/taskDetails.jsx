import { useEffect, useState } from 'react';

import { FormProvider, useForm } from "react-hook-form";
import PropTypes from 'prop-types';

import Button from '../common/Button';
import { useParams } from "react-router-dom";
import { fetchTask, updateTask } from '../tasks/TasksApi.jsx';
import CreatableSelect from 'react-select';
import styles from './taskDetails.module.css';

// TODO: remove this when labels are implemented on BE

const LABELS = [
    { value: 'personal', label: 'Personal'},
    { value: 'work', label: 'Work'},
    { value: 'shopping', label: 'Shopping'},
    { value: 'others', label: 'Others'},
]

const PRIORITY = [
    { value: 'low', label: 'Low'},
    { value: 'medium', label: 'Medium'},
    { value: 'high', label: 'High'},
    { value: 'critical', label: 'Critical'}]

const STATUS = [
    { value: 'not_started', label: 'Not Started'},
    { value: 'progress', label: 'In Progress'},
    { value: 'completed', label: 'Completed'},
    { value: 'blocked', label: 'Blocked'}]

const TaskDetails = () => {
    const methods = useForm();
    const { id: taskId } = useParams();
    const [taskData, setTaskData] = useState({});

    let updatedTaskData = { ...taskData };

    useEffect(() => {
        fetchTask(taskId, setTaskData)
    }, [taskId]);


    const buildSelectValue = (options, value) => {
        if (value){
            const found = options.find(option => option.value.toLowerCase() == value.toLowerCase());

            return {label:found.label, value: value}
        } else {
            return ''
        }
    }

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setTaskData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const hadleSelectChange = (event, actionMeta) => {
        const name = actionMeta.name;
        let value = event.value;

        setTaskData(prevState => ({
            ...prevState,
            [name]: value
        }));
      }
    const onSubmit = () => {
        updateTask(updatedTaskData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className={styles.detailSection}>
                    <label >Task Title</label>
                    <input
                        type="text"
                        name="title"
                        value={taskData.title || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.detailSection}>
                    <label>Description</label>
                    <textarea
                        name='description'
                        value={taskData.description || ''}

                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.detailSection}>
                    <label>Note</label>
                    <input
                        name='note'
                        value={taskData.note || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.detailSection}>
                        <label>Due Date</label>
                        <input
                            style={{maxWidth: "fit-content"}}
                            name="dueDate"
                            type="date"
                            value={taskData.dueDate || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                <div className={styles.detailSection}>
                    <div className={styles.dropdownContainer}>
                        <label className={styles.dropdownLabel}>Priority</label>
                        <CreatableSelect
                            name="priority"
                            options={PRIORITY}
                            value={buildSelectValue(PRIORITY, taskData.priority)}
                            isClearable
                            onChange={hadleSelectChange}
                        />
                        <label className={styles.dropdownLabel} style={{marginLeft:"30px", marginRight:'10px'}}>Status</label>
                        <CreatableSelect
                            name="status"
                            options={STATUS}
                            value={buildSelectValue(STATUS, taskData.status)}
                            isClearable
                            onChange={hadleSelectChange}
                        />
                        <label className={styles.dropdownLabel} style={{marginLeft:"30px", marginRight:'10px'}}>Label</label>
                        <CreatableSelect
                            name="label"
                            isMulti
                            value={buildSelectValue(LABELS, taskData.label)}
                            options={LABELS}
                            isClearable
                            onChange={hadleSelectChange}
                        >
                        </CreatableSelect>
                    </div>
                </div>  
                <div className={styles.detailSection}>
                        <label>Minutes spent:</label> {taskData.minutesSpent}       
                </div>
                <Button style={{ margin: '20px 10%' }} type="submit">Save task</Button>
            </form>
        </FormProvider>
    );
};

TaskDetails.propTypes = {
    taskId: PropTypes.string,
};

export default TaskDetails;