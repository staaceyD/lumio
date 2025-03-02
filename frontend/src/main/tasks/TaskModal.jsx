import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import PropTypes from 'prop-types';
import styles from './TaskModal.module.css';
import { addTask } from './TasksApi.jsx';


const TasksModal = ({ setModalIsOpen, setTasksData }) => {
    const [title, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [note, setNote] = useState('');
    const [dueDate, setDueDate] = useState(undefined);

    function handleCloseModal() { setModalIsOpen((currentModalState) => !currentModalState); }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ title, description, note, due_date: dueDate, minutesSpent:0 }, setTasksData);
        handleCloseModal();
    };

    return (
        <div>
            <Modal
                onClose={handleCloseModal}
                title="New task"
            >
                <form onSubmit={handleSubmit}>
                    <div className={styles.taskField}>
                        <label >Task Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.taskField}>
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}

                        />
                    </div>
                    <div className={styles.taskField}>
                        <label>Note</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}

                        />
                    </div>
                    <div className={styles.taskField}>
                        <label>Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}

                        />
                    </div>
                    <Button style={{ marginRight: '32px' }} type="submit">Submit</Button>
                    <Button type="button" onClick={handleCloseModal}>Cancel</Button>
                </form>
            </Modal>
        </div >
    );
};

TasksModal.propTypes = {
    setTasksData: PropTypes.func,
    setModalIsOpen: PropTypes.func,
};

export default TasksModal;