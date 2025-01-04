

import TasksTable from '../tasks/TasksTable';

export function Home() {
    return (
        <div className="home">

            <h2>Home </h2>
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
