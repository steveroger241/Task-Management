import axios from 'axios';
import '../App.css';
import { useEffect, useState } from 'react';
import EditTaskWindow from './EditTaskWindow';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

function SearchBar() {
    const [text, setText] = useState('');
    const [searched, setSearched] = useState(false);
    const [found, setFound] = useState(false);
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editid, setEditid] = useState('');
    const [head, setHead] = useState('');
    const [desc, setDesc] = useState('');
    const [auth, setAuth] = useAuth();

    async function search() {
        try {
            const result = await axios.post(
                `/task/search`,
                { email: auth.user, searchTerm: text }
            )
            if (result.data.success) {
                // alert(result.data.message);
                // console.log(result.data.result);
                setData(result.data.result);
                setSearched(true);
                setFound(true);
            }
            else {
                // alert(result.data.error);
                setSearched(true);
                setFound(false);
            }
        }
        catch (err) {
            alert("Browser error");
        }
    }

    async function handleDelete(taskid) {
        try {
            const result = await axios.post(
                `/task/delete`,
                { id: taskid }
            );

            if (result.data.success) {
                // alert(result.data.message);
                search();
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
                search();
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
                search();
            }
            else {
                alert(result.data.error);
            }
        }
        catch (err) {
            alert("Browser error");
        }
    }

    useEffect(() => {
        if (edit) {
            search();
        }
    }, [edit])

    return (
        <div className='search-outer-window-wrapper'>
            {
                auth.user ? (
                    <>
                        <input
                            type='text'
                            placeholder='search anything'
                            value={text}
                            onChange={(e) => { setText(e.target.value) }}
                            className='search-input'
                        />
                        <button className='search-btn' onClick={search}>Search</button>
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
                        <div className='search-window-display-task-wrapper'>
                            {
                                searched ? (
                                    found ? (
                                        data.map((dt, i) => {
                                            return (
                                                <div key={i} className='search-window-display-task-box'>
                                                    <div className='search-window-heading'>
                                                        {dt.heading}
                                                    </div>
                                                    <div className='search-window-description'>
                                                        {dt.description}
                                                    </div>
                                                    <div className='search-window-display-task-tools'>
                                                        <button
                                                            onClick={
                                                                () => {
                                                                    setEdit(true);
                                                                    setEditid(dt.taskid);
                                                                    setHead(dt.heading);
                                                                    setDesc(dt.description);
                                                                }
                                                            }
                                                            className='search-window-display-edit-btn'
                                                        >
                                                            Edit
                                                        </button>

                                                        <button className='search-window-display-delete-btn' onClick={() => { handleDelete(dt.taskid) }}>
                                                            Delete
                                                        </button>
                                                        {
                                                            dt.completed ? (
                                                                <button className='search-window-display-mark-btn' onClick={() => { handleUnDone(dt.taskid) }}>
                                                                    Mark as undone
                                                                </button>
                                                            ) : (
                                                                <button className='search-window-display-mark-btn' onClick={() => { handleDone(dt.taskid) }}>
                                                                    Mark as done
                                                                </button>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div className='search-window-nothing'>
                                            No matching tasks found
                                        </div>
                                    )
                                ) : (
                                    <div className='search-window-nothing'>
                                        Searched tasks will display here
                                    </div>
                                )
                            }
                        </div>
                    </>
                ) : (
                    <div className='task-window-message-wrapper'>
                        You need to be a reistered user to use the task management web app
                        <Link to='/login'><button className='option-btn'>Login</button></Link>
                        <Link to='/signup'><button className='option-btn'>Signup</button></Link>
                    </div>
                )
            }
        </div>
    );
}

export default SearchBar;