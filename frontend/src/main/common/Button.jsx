import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ children, className, ...props }) => {
  const buttonClass = className ? `${styles.btn} ${className}` : styles.btn;

  return (
    <button className={buttonClass} {...props}>
      {" "}
      {children}{" "}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
