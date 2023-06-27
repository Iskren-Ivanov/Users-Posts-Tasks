import React, { useEffect, useState } from "react";
import Message from "../Message/Message";
import { useGetTasksQuery, useGetTasksLengthQuery } from "../../Redux/TasksSlice";
import PaginationButtons from './components/PaginationButtons';

import styles from "./Tasks.module.css";

const Tasks: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 10;
    const { data: tasksLength = 0, isError: isErrorGetTasksLength } = useGetTasksLengthQuery();
    const { data: tasks = [], refetch, isError: isErrorGetTasks } = useGetTasksQuery({
        page: currentPage,
        limit: tasksPerPage,
    });
 
    useEffect(() => {
        refetch();
    }, [currentPage, refetch]);

    if (isErrorGetTasksLength || isErrorGetTasks) {
        return <Message status="error" title="Something went wrong, contact the administrators."
            label="Refresh Page" />
    }

    const totalPages = Math.ceil(tasksLength / tasksPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.taskTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.completed ? 'Completed' : 'Incomplete'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.tableNavigation}>
                <button
                    className={styles.navButton}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <PaginationButtons handlePageChange={handlePageChange} totalPages={totalPages} currentPage={currentPage} />
                <button
                    className={styles.navButton}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};


export default Tasks;