import { useState, useRef, useEffect } from "react";
import './TaskTable.css'
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

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
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/tasks/')
            .then(response => response.json())
            .then(json => setRowData(json))
            .catch(error => console.error(error));
    }, []);


    const getSelectedRows = () => {
        const selectedRows = gridRef.current.api.getSelectedRows();
    };


    return (
        <div className={"task-table"}> <AgGridReact
            ref={gridRef}
            rowSelection={{
                mode: 'multiRow',
                enableClickSelection: true,
            }}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={{
                flex: 1,
            }}
        />
        </div >
    );
};

export default TasksTable;
