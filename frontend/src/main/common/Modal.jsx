
import styles from './Modal.module.css';

import PropTypes from 'prop-types';

const Modal = ({ onClose, title, children }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalHeader}>{title}</h2>
                    <button className={styles.modalClose} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
