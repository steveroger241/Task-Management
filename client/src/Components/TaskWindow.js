import '../App.css';
import { useState, useEffect } from 'react';
import NewTaskWindow from './NewTaskWindow.js';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext.js';
import { Link, useNavigate } from 'react-router-dom';
import EditTaskWindow from './EditTaskWindow.js';

function TaskWindow() {
    const [click, setClick] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [auth, setAuth] = useAuth();
    const [edit, setEdit] = useState(false);
    const [editid, setEditid] = useState('');
    const [head, setHead] = useState('');
    const [desc, setDesc] = useState('');
    const [allow, setAllow] = useState(false);
    const navigate = useNavigate();

    async function callme() {
        const result = await axios.post(
            `/task/read`,
            { email: auth.user }
        );

        if (result.data.success) {
            // alert(result.data.message);
            setTasks(result.data.result);
            // console.log(result.data.result[0].task[0].completed);
            // console.log(result.data.result[0].task[1].completed);
        }
        else {
            alert(result.data.error);
        }
    }

    useEffect(() => {
        if (auth.user) {
            callme();
        }
    }, [click, auth.user, edit])

    async function handleDelete(taskid) {
        try {
            const result = await axios.post(
                `/task/delete`,
                { id: taskid }
            );

            if (result.data.success) {
                // alert(result.data.message);
                callme();
            }
            else {
                alert(result.data.error);
            }
        }
        catch (err) {
            alert("Browser error");
        }
    }

    async function handleDone(taskid) {
        try {
            const result = await axios.post(
                `/task/done`,
                { id: taskid }
            );

            if (result.data.success) {
                // alert(result.data.message);
                callme();
            }
            else {
                alert(result.data.error);
            }
        }
        catch (err) {
            alert("Browser error");
        }
    }

    async function handleUnDone(taskid) {
        try {
            const result = await axios.post(
                `/task/undone`,
                { id: taskid }
            );

            if (result.data.success) {
                // alert(result.data.message);
                callme();
            }
            else {
                alert(result.data.error);
            }
        }
        catch (err) {
            alert("Browser error");
        }
    }

    return (
        <div className='task-outer-window-wrapper'>

            {
                auth.user ? (
                    <div className='task-window-wrapper'>
                        <div className='task-window-options-wrapper'>
                            Click to add new tasks
                            <button
                                onClick={() => { setClick(true) }}
                                className='task-window-add-btn'
                            >
                                New
                            </button>

                            <button className='task-window-search-btn' onClick={() => { navigate('/searchpage') }}>Search Tasks</button>

                            <div className='task-window-checkbox-wrapper'>
                                Show Completed Tasks
                                <input
                                    type='checkbox'
                                    onChange={() => { setAllow(!allow) }}
                                />
                            </div>
                        </div>

                        {
                            click ? (
                                <div>
                                    <NewTaskWindow setClick={setClick} />
                                </div>
                            ) : (
                                null
                            )
                        }

                        {
                            edit ? (
                                <div>
                                    <EditTaskWindow
                                        setEdit={setEdit}
                                        editid={editid}
                                        head={head}
                                        desc={desc}
                                    />
                                </div>
                            ) : (
                                null
                            )
                        }

                        <div className='task-window-display-task-wrapper'>
                            {
                                tasks && tasks.length > 0 ? (
                                    tasks[0].task
                                        .filter(dt => allow || !dt.completed)
                                        .map((dt, i) => {
                                            return (
                                                <div key={i} className='task-window-display-task-box'>
                                                    <div className='task-window-heading'>
                                                        {i + 1}- {dt.heading}
                                                    </div>
                                                    <div className='task-window-description'>
                                                        {dt.description}
                                                    </div>
                                                    <div className='task-window-display-task-tools'>
                                                        <button
                                                            onClick={() => {
                                                                setEdit(true);
                                                                setEditid(dt.taskid);
                                                                setHead(dt.heading);
                                                                setDesc(dt.description);
                                                            }}
                                                            className='task-window-display-edit-btn'
                                                        >
                                                            Edit
                                                        </button>

                                                        <button className='task-window-display-delete-btn' onClick={() => { handleDelete(dt.taskid) }}>
                                                            Delete
                                                        </button>
                                                        {
                                                            dt.completed ? (
                                                                <button className='task-window-display-mark-btn' onClick={() => { handleUnDone(dt.taskid) }}>
                                                                    Mark as undone
                                                                </button>
                                                            ) : (
                                                                <button className='task-window-display-mark-btn' onClick={() => { handleDone(dt.taskid) }}>
                                                                    Mark as done
                                                                </button>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                ) : (
                                    <div className='task-window-nothing'>
                                        No tasks yet
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ) : (
                    <div className='task-window-message-wrapper'>
                        You need to be a reistered user to use the task management web app
                        <Link to='/login'><button className='option-btn'>Login</button></Link>
                        <Link to='/signup'><button className='option-btn'>Signup</button></Link>
                    </div>
                )
            }

        </div >
    )
}

export default TaskWindow;