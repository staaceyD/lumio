import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select";

import Button from "../common/Button";
import { fetchTask, updateTask, fetchLabels, createLabel } from "../tasks/TasksApi.jsx";
import styles from "./taskDetails.module.css";


const PRIORITY = [
  { value: "low", label: "Low", color: "#6B7280" },
  { value: "medium", label: "Medium", color: "#F59E0B" },
  { value: "high", label: "High", color: "#EF4444" },
  { value: "critical", label: "Critical", color: "#DC2626" },
];

const STATUS = [
  { value: "not_started", label: "Not Started", color: "#6B7280" },
  { value: "progress", label: "In Progress", color: "#3B82F6" },
  { value: "completed", label: "Completed", color: "#10B981" },
  { value: "blocked", label: "Blocked", color: "#EF4444" },
];

const TaskDetails = () => {
  const methods = useForm({
    mode: "onBlur",
  });
  const { id: taskId } = useParams();
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [availableLabels, setAvailableLabels] = useState([]);

  useEffect(() => {
    const loadLabels = async () => {
      try {
        const formattedLabels = await fetchLabels()
        setAvailableLabels(formattedLabels);
      } catch {
        setError("Failed to load labels. Please try again.");
      }
    };

    const loadTask = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await fetchTask(taskId, setTaskData);
      } catch (err) {
        setError("Failed to load task details. Please try again.");
        console.error("Error loading task:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLabels();
    if (taskId) {
      loadTask();
    }
  }, [taskId]);

  const buildSelectValue = (options, value, isMulti = false) => {
    if (isMulti) {
      if (Array.isArray(value) && value.length > 0) {
        return value
          .map((val) => {
            const found = options.find(
              (option) =>
                String(option.value) === String(val) ||
                (typeof val === "string" &&
                  option.value.toLowerCase() === val.toLowerCase()),
            );
            return found ? { label: found.label, value: found.value } : null;
          })
          .filter(Boolean);
      }
      return [];
    } else {
      if (value) {
        const found = options.find(
          (option) =>
            String(option.value) === String(value) ||
            (typeof value === "string" &&
              option.value.toLowerCase() === value.toLowerCase()),
        );
        return found ? { label: found.label, value: found.value } : null;
      }
      return null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear success message when user starts editing
    if (saveSuccess) {
      setSaveSuccess(false);
    }
  };

  const handleCreateLabel = async (inputValue) => {
    try{
      const formattedLabel = await createLabel(inputValue)
      // Add to available labels
      setAvailableLabels((prev) => [...prev, formattedLabel]);

      // Add to current task labels
      const currentLabels = taskData.labels || [];
      setTaskData((prevState) => ({
        ...prevState,
        labels: [...currentLabels, formattedLabel.value],
      }));
    } catch (err) {
      console.error("Error creating label:", err);
      return null;
    }
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    const name = actionMeta.name;
    let value;
    let fieldName = name;

    if (name === "labels") {
      // Handle multi-select for labels
      value = selectedOption
        ? selectedOption.map((option) => option.value)
        : [];
    } else {
      // Handle single select for priority and status
      value = selectedOption ? selectedOption.value : null;
    }

    setTaskData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));

    // Clear success message when user starts editing
    if (saveSuccess) {
      setSaveSuccess(false);
    }
  };

  const onSubmit = async () => {
    try {
      setIsSaving(true);
      setError(null);

      const updatedData = { ...taskData };
      await updateTask(updatedData);

      setSaveSuccess(true);
      // Clear success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError("Failed to save task. Please try again.");
      console.error("Error saving task:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const getPriorityBadgeStyle = (priority) => {
    const priorityOption = PRIORITY.find((p) => p.value === priority);
    if (priorityOption) {
      return {
        backgroundColor: priorityOption.color,
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "500",
      };
    }
    return {};
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading task details...</p>
        </div>
      </div>
    );
  }

  if (error && !taskData.title) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3>Unable to Load Task</h3>
          <p>{error}</p>
          <Button onClick={() => navigate("/")}>Back to Tasks</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/")}
          type="button"
        >
          ← Back to Tasks
        </button>
        <h1 className={styles.title}>Task Details</h1>
        {taskData.priority && (
          <span style={getPriorityBadgeStyle(taskData.priority)}>
            {PRIORITY.find((p) => p.value === taskData.priority)?.label}
          </span>
        )}
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          {error}
        </div>
      )}

      {saveSuccess && (
        <div className={styles.successMessage}>
          <span className={styles.successIcon}>✅</span>
          Task saved successfully!
        </div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
          {/* Main Task Information */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Task Information</h2>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Task Title <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="title"
                className={styles.input}
                value={taskData.title || ""}
                onChange={handleInputChange}
                placeholder="Enter task title..."
                required
              />
              {methods.formState.errors.title && (
                <span className={styles.errorText}>
                  {methods.formState.errors.title.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
              <textarea
                name="description"
                className={styles.textarea}
                value={taskData.description || ""}
                onChange={handleInputChange}
                placeholder="Describe the task in detail..."
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Notes</label>
              <input
                type="text"
                name="note"
                className={styles.input}
                value={taskData.note || ""}
                onChange={handleInputChange}
                placeholder="Add any additional notes..."
              />
            </div>
          </div>

          {/* Task Scheduling */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Scheduling</h2>

            <div className={styles.formGroup}>
              <label className={styles.label}>Due Date</label>
              <input
                name="dueDate"
                type="date"
                className={styles.input}
                value={taskData.dueDate || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Time Spent</label>
              <div className={styles.readOnlyField}>
                <span className={styles.timeSpent}>
                  {taskData.minutesSpent || 0} minutes
                </span>
                <small className={styles.helpText}>
                  Time is automatically tracked
                </small>
              </div>
            </div>
          </div>

          {/* Task Properties */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Properties</h2>

            <div className={styles.propertiesGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Priority</label>
                <CreatableSelect
                  name="priority"
                  options={PRIORITY}
                  value={buildSelectValue(PRIORITY, taskData.priority)}
                  onChange={handleSelectChange}
                  placeholder="Select priority..."
                  className={styles.select}
                  classNamePrefix="select"
                  isClearable
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Status</label>
                <CreatableSelect
                  name="status"
                  options={STATUS}
                  value={buildSelectValue(STATUS, taskData.status)}
                  onChange={handleSelectChange}
                  placeholder="Select status..."
                  className={styles.select}
                  classNamePrefix="select"
                  isClearable
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Labels</label>
                <CreatableSelect
                  name="labels"
                  options={availableLabels}
                  value={buildSelectValue(
                    availableLabels,
                    taskData.labels,
                    true,
                  )}
                  onChange={handleSelectChange}
                  onCreateOption={handleCreateLabel}
                  placeholder="Add labels..."
                  className={styles.select}
                  classNamePrefix="select"
                  isMulti
                  isClearable
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <Button
              type="button"
              onClick={() => navigate("/")}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className={styles.saveButton}
            >
              {isSaving ? (
                <>
                  <span className={styles.spinner}></span>
                  Saving...
                </>
              ) : (
                "Save Task"
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

TaskDetails.propTypes = {
  taskId: PropTypes.string,
};

export default TaskDetails;
