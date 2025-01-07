

import TasksManagementBar from '../tasks/TasksManagementBar';
import TasksTable from '../tasks/TasksTable';
import './routes.css';

export function Home() {
    return (
        <div className="home">
            <div className='head-management'>
                <h2>Home </h2>
                <TasksManagementBar />
            </div>
            <TasksTable />

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
