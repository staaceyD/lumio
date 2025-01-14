

import TasksManagementBar from '../tasks/TasksManagementBar';
import TasksTable from '../tasks/TasksTable';
import './routes.css';
import { useState } from 'react';

export function Home() {
    const [tasksData, setTasksData] = useState([]);

    return (
        <div className="home">
            <div className='head-management'>
                <h2>Home </h2>
                <TasksManagementBar setTasksData={setTasksData} />
            </div>
            <TasksTable tasksData={tasksData} setTasksData={setTasksData} />

        </div>
    );
}

export function Team() {
    return (
        <div className="team">
            <h1>Team</h1>
        </div>
    );
}

export function Support() {
    return (
        <div className="support">
            <h1>Support</h1>
        </div>
    );
}
