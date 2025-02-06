import { useState, useRef, useCallback, useMemo } from "react";
import styles from './TaskTable.module.css'
import {
    AllCommunityModule, ModuleRegistry, themeQuartz
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { fetchTasks, updateTask } from "./TasksApi.jsx";
import TasksManagementBar from "./TasksManagementBar.jsx";
import Notification from '../common/Notification';

ModuleRegistry.registerModules([AllCommunityModule]);

const colDefs = [
    { field: "title", cellEditor: "agTextCellEditor", },
    { field: "description", cellEditor: "agTextCellEditor" },
    { field: "label", cellEditor: "agTextCellEditor" },
    { field: "priority", cellEditor: "agTextCellEditor" },
    { field: "status", cellEditor: "agTextCellEditor" },
    { headerName: "Time Spent", field: "minutes_spent", cellEditor: "agNumberCellEditor" },
    { headerName: "Last Updated", field: "modified_at", editable: false },
    { field: "note", cellEditor: "agTextCellEditor" },
]

const TasksTable = () => {
    const gridRef = useRef(null);
    const [tasksData, setTasksData] = useState([]);
    const [notification, setNotification] = useState('');
    const [isTaskSelected, setIsTaskSelected] = useState(false);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            editable: true,
        }
    }, []);

    const cellEditingStoppedListenner = useCallback(
        (event) => {
            if (event.valueChanged) {
                const task = event.data;
                updateTask(task, setTasksData);
                setNotification('Request was sent successfully!');
                setTimeout(() => setNotification(''), 3000);

            }
        },
        []);

    const onGridReady = useCallback(() => {
        fetchTasks(setTasksData);
    }, []);

    const tableTheme = themeQuartz.withParams({
        backgroundColor: "rgb(246, 215, 239)",
        foregroundColor: "rgb(126, 46, 132)",
        headerTextColor: "rgb(255, 255, 255)",
        headerBackgroundColor: "rgb(209, 64, 129)",
        oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
        headerColumnResizeHandleColor: "rgb(126, 46, 132)",
    });


    const getSelectedRowIds = () => {
        const selectedData = gridRef.current.api.getSelectedRows();
        let selectedTasksIds = [];
        if (selectedData) {
            selectedTasksIds = selectedData.map(task => task.id);
        }
        return selectedTasksIds;

    };

    const onSelectionChanged = () => {
        const selectedData = gridRef.current.api.getSelectedRows();

        if (selectedData) {
            setIsTaskSelected((current) => !current);
        } else {
            setIsTaskSelected((current) => !current);
        }

    }

    return (<>
        <Notification message={notification} onClose={() => setNotification('')} />
        <TasksManagementBar setTasksData={setTasksData} getSelectedIds={getSelectedRowIds} isTaskSelected={isTaskSelected} />
        <div className={styles.taskTable}>
            <AgGridReact
                ref={gridRef}
                rowSelection={{
                    mode: 'multiRow',
                    enableClickSelection: true,
                }}
                theme={tableTheme}
                rowData={tasksData}
                onGridReady={onGridReady}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                onCellEditingStopped={cellEditingStoppedListenner}
                onSelectionChanged={onSelectionChanged}
            />
        </div >
    </>
    );
};

export default TasksTable;
