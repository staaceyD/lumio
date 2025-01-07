import './Button.css';
import PropTypes from 'prop-types';

const Button = ({ children }) => {
    return (
        <button className="btn"> {children} </button>
    );
};

Button.propTypes = {
    children: PropTypes.string,
};

export default Button;