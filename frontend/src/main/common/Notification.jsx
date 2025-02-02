import PropTypes from 'prop-types';
import styles from './Notification.module.css';
import Button from './Button';

const Notification = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className={styles.notification}>
            {message}
            <Button onClick={onClose}>x</Button>
        </div>
    );
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Notification;