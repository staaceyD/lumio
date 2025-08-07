const API_URL = 'http://localhost:8000';

export async function addTask(task, setTasksData) {
    try {
        const res = await fetch(`${API_URL}/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        const data = await res.json();
        fetchTasks(setTasksData);
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }


}

export async function deleteTasks(taskIds, setTasksData) {
    try {
        const ids = taskIds.join(',')
        await fetch(`${API_URL}/tasks/${ids}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        fetchTasks(setTasksData);

    } catch (error) {
        console.error('Error:', error);
        throw error

    }
}

export function fetchTasks(setTasksData) {
    fetch(`${API_URL}/tasks/`)
        .then(response => response.json())
        .then(json => setTasksData(json))
        .catch(error => console.error(error));
}

export async function fetchTask(taskId, setTaskData) {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`);
        if (!response.ok) {
           throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        const modifiedJson = { ...json, dueDate: json.due_date };
        delete modifiedJson.due_date;

        setTaskData(modifiedJson);
    } catch (error) {
        console.error(error.message);
    }
  }

export async function updateTask(task) {
    try {
        await fetch(`${API_URL}/tasks/${task.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}