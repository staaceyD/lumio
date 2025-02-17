const API_URL = 'http://localhost:8000';

export async function addTask(task, setTasksData) {
    try {
        console.log('task', task)
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
    fetch('http://127.0.0.1:8000/tasks/')
        .then(response => response.json())
        .then(json => setTasksData(json))
        .catch(error => console.error(error));
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