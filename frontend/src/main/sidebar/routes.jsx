import TasksTable from '../tasks/TasksTable';
import styles from './routes.module.css';

export function Home() {
    return (
        <div className={styles.home}>
            <h2>Home </h2>
            <TasksTable />

        </div>
    );
}

export function Team() {
    return (
        <div className={styles.team}>
            <h1>Team</h1>
        </div>
    );
}

export function Support() {
    return (
        <div className={styles.support}>
            <h1>Support</h1>
        </div>
    );
}
