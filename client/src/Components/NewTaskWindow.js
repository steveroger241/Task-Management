import '../App.css';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

function NewTaskWindow(props) {
    const [tname, setname] = useState('');
    const [desc, setdesc] = useState('');
    const [auth, setAuth] = useAuth();

    function handleChange(e) {
        if (e.target.name === 'heading') {
            setname(e.target.value)
        }
        if (e.target.name === 'description') {
            setdesc(e.target.value)
        }
    }

    async function handleClick() {
        try {
            const result = await axios.post(
                `/task/create`,
                { email: auth.user, heading: tname, description: desc }
            )

            if (result.data.success) {
                // alert(result.data.message);
                props.setClick(false)
            }
            else {
                alert(result.data.error);
            }
        }
        catch (err) {
            console.log(err);
            alert("Browser error");
        }
    }

    return (
        <div className='new-task-wrapper'>

            <div className='new-task-popup'>
                <input
                    type='text'
                    name='heading'
                    placeholder='Task Name'
                    value={tname}
                    onChange={handleChange}
                    className='new-task-input'
                />

                <br />

                <textarea
                    type='text'
                    name='description'
                    placeholder='Task Description'
                    value={desc}
                    onChange={handleChange}
                    className='new-task-input'
                />

                <br />

                <button className='new-task-add-btn' onClick={handleClick}>Add</button>
            </div>

        </div>
    )
}

export default NewTaskWindow;