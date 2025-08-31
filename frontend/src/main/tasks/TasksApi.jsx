const API_URL = "http://localhost:8000";

export async function addTask(task, setTasksData) {
  try {
    const res = await fetch(`${API_URL}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    fetchTasks(setTasksData);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteTasks(taskIds, setTasksData) {
  try {
    const ids = taskIds.join(",");
    await fetch(`${API_URL}/tasks/${ids}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchTasks(setTasksData);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export function fetchTasks(setTasksData) {
  fetch(`${API_URL}/tasks/`)
    .then((response) => response.json())
    .then((json) => setTasksData(json))
    .catch((error) => console.error(error));
}

export async function fetchTask(taskId, setTaskData) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    const modifiedJson = {
      ...json,
      dueDate: json.due_date,
      minutesSpent: json.minutes_spent,
    };
    delete modifiedJson.due_date;
    delete modifiedJson.minutes_spent;

    setTaskData(modifiedJson);
  } catch (error) {
    console.error(error.message);
  }
}

export async function updateTask(task) {
  try {
    // Convert frontend field names to backend field names
    const backendTask = {
      ...task,
      due_date: task.dueDate,
      minutes_spent: task.minutesSpent,
    };

    // Remove frontend field names
    delete backendTask.dueDate;
    delete backendTask.minutesSpent;

    await fetch(`${API_URL}/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendTask),
    });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


export async function fetchLabels() {
  try {
    const response = await fetch(`${API_URL}/labels/`);
    if (response.ok) {
      const labels = await response.json();
      const formattedLabels = labels.map((label) => ({
        value: label.id,
        label: label.name,
        color: label.color || "#6B7280",
      }));
      return formattedLabels;
    }
  } catch (error) {
    console.warn("Could not load labels from backend:", error);
    throw error;
  }
}

export async function createLabel({label_name, color = "#6B7280"}) {
  try {
    const response = await fetch(`${API_URL}/labels/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: label_name,
        color: color, 
      }),
    });
    if (response.ok) {
      const newLabel = await response.json();
      const formattedLabel = {
        value: newLabel.id,
        label: newLabel.name,
        color: newLabel.color || "#6B7280",
      };
      return formattedLabel;
    } else {
        console.error("Failed to create label");
        return null;
      }
    } catch (err) {
      console.error("Error creating label:", err);
      throw err;
    }
  
}