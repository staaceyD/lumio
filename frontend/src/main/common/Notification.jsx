import PropTypes from "prop-types";
import styles from "./Notification.module.css";
import Button from "./Button";

const Notification = ({ message, type = "success", onClose }) => {
  if (!message) return null;

  const notificationClass = `${styles.notification} ${type !== "success" ? styles[type] : ""}`;

  return (
    <div className={notificationClass}>
      <div className={styles.notificationIcon}>
        {type === "success" && "✅"}
        {type === "error" && "⚠️"}
        {type === "warning" && "⚠️"}
        {type === "info" && "ℹ️"}
      </div>
      <p className={styles.notificationText}>{message}</p>
      <Button onClick={onClose}>✕</Button>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  onClose: PropTypes.func.isRequired,
};

export default Notification;
