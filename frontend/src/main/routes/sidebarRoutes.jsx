import TasksTable from '../tasks/TasksTable';
import styles from './routes.module.css';

export function Home() {
    return (
        <div className={styles.route}>
            <h2>Home </h2>
            <TasksTable />

        </div>
    );
}

export function Team() {
    return (
        <div className={styles.route}>
            <h1>Team</h1>
        </div>
    );
}

export function Support() {
    return (
        <div className={styles.route}>
            <h1>Support</h1>
        </div>
    );
}
