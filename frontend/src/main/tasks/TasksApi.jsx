const API_URL = 'http://localhost:8000';

export async function addTask(task) {
    try {
        const res = await fetch(`${API_URL}/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }


}

export async function fetchTasks(setTasksData) {
    fetch('http://127.0.0.1:8000/tasks/')
        .then(response => response.json())
        .then(json => setTasksData(json))
        .catch(error => console.error(error));
}