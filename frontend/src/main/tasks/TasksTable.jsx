import { useState, useRef, useEffect } from "react";
import './TaskTable.css'
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { fetchTasks } from "./TasksApi.jsx";

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

const TasksTable = ({ tasksData, setTasksData }) => {
    const gridRef = useRef(null);

    useEffect(() => {
        fetchTasks(setTasksData)
    }, []);

    const tableTheme = themeQuartz.withParams({
        backgroundColor: "rgb(246, 215, 239)",
        foregroundColor: "rgb(126, 46, 132)",
        headerTextColor: "rgb(255, 255, 255)",
        headerBackgroundColor: "rgb(209, 64, 129)",
        oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
        headerColumnResizeHandleColor: "rgb(126, 46, 132)",
    });

    // const getSelectedRows = () => {
    //     const selectedRows = gridRef.current.api.getSelectedRows();
    // };

    return (
        <div className={"task-table"}>
            <AgGridReact
                ref={gridRef}
                rowSelection={{
                    mode: 'multiRow',
                    enableClickSelection: true,
                }}
                theme={tableTheme}
                rowData={tasksData}
                columnDefs={colDefs}
                defaultColDef={{
                    flex: 1,
                }}
            />
        </div >
    );
};

export default TasksTable;
