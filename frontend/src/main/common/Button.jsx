import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ children, ...props }) => {
    return (
        <button className={styles.btn} {...props}> {children} </button>
    );
};

Button.propTypes = {
    children: PropTypes.string,
};

export default Button;