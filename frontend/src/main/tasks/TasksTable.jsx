import { useState, useRef, useCallback } from "react";
import './TaskTable.css'
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { fetchTasks } from "./TasksApi.jsx";
import TasksManagementBar from "./TasksManagementBar.jsx";

ModuleRegistry.registerModules([AllCommunityModule]);

const colDefs = [
    { field: "title" },
    { field: "description" },
    { field: "label" },
    { field: "priority" },
    { field: "status" },
    { field: "time spent" },
    { field: "last updated" },
    { field: "note" },
]

const TasksTable = () => {
    const gridRef = useRef(null);
    const [tasksData, setTasksData] = useState([]);

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
        console.log(selectedData);
        let selectedTasksIds = [];
        if (selectedData) {
            selectedTasksIds = selectedData.map(task => task.id);
        }
        return selectedTasksIds;

    };


    return (<>
        <TasksManagementBar setTasksData={setTasksData} getSelectedIds={getSelectedRowIds} />
        <div className={"task-table"}>
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
                defaultColDef={{
                    flex: 1,
                }}
            />
        </div >
    </>
    );
};

export default TasksTable;
