import { useState, useRef, useCallback, useMemo } from "react";
import styles from './TaskTable.module.css'
import {
    AllCommunityModule, ModuleRegistry, themeQuartz
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { fetchTasks, updateTask } from "./TasksApi.jsx";
import TasksManagementBar from "./TasksManagementBar.jsx";
import Notification from '../common/Notification';
import { useNavigate } from 'react-router-dom';

ModuleRegistry.registerModules([AllCommunityModule]);

const colDefs = [
    { field: "title", cellEditor: "agTextCellEditor", },
    { field: "description", cellEditor: "agTextCellEditor" },
    { field: "label", cellEditor: "agTextCellEditor" },
    { field: "priority", cellEditor: "agTextCellEditor" },
    { field: "status", cellEditor: "agTextCellEditor" },
    { headerName: "Time Spent", field: "minutes_spent", cellEditor: "agNumberCellEditor" },
    { headerName: "Last Updated", field: "modified_at", editable: false },
    { headerName: "Due Date", field: "due_date", cellEditor: "agDateStringCellEditor" },
    { field: "note", cellEditor: "agTextCellEditor" },
]

const TasksTable = () => {
    const navigate = useNavigate();
    const gridRef = useRef(null);
    const [tasksData, setTasksData] = useState([]);
    const [notification, setNotification] = useState('');
    const [taskSelectedData, setTaskSelectedData] = useState({});

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
                updateTask(task);
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
            setTaskSelectedData(() => selectedData);
        }
    }

    const onCellDoubleClicked = (event) => {
        const selectedCell = event.data;
        navigate(`/details/${selectedCell.id}`);

    }

    return (<>
        <Notification message={notification} onClose={() => setNotification('')} />
        <TasksManagementBar setTasksData={setTasksData} getSelectedIds={getSelectedRowIds} taskSelectedData={taskSelectedData} />
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
                onCellDoubleClicked={onCellDoubleClicked}
            />
        </div >
    </>
    );
};

export default TasksTable;
