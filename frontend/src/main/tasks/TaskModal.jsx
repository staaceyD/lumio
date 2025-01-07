import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import PropTypes from 'prop-types';
import './TaskModal.css';


const TasksModal = ({ modalIsOpen, setModalIsOpen }) => {
    const [title, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [note, setNote] = useState('');
    const [dueDate, setDueDate] = useState('');

    function handleCloseModal() { setModalIsOpen((currentModalState) => !currentModalState); }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ title, description, dueDate });
        handleCloseModal();
    };

    return (
        <div>
            <Modal
                onClose={handleCloseModal}
                title="New task"
            >
                <form onSubmit={handleSubmit}>
                    <div className='task-field'>
                        <label >Task Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className='task-field'>
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}

                        />
                    </div>
                    <div className='task-field'>
                        <label>Note</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}

                        />
                    </div>
                    <div className='task-field'>
                        <label>Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}

                        />
                    </div>
                    <Button type="submit">Submit</Button>
                    <Button type="button" onClick={handleCloseModal}>Cancel</Button>
                </form>
            </Modal>
        </div >
    );
};

TasksModal.propTypes = {
    modalIsOpen: PropTypes.bool,
    setModalIsOpen: PropTypes.func,
};

export default TasksModal;