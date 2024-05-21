import axios from 'axios';
import '../App.css'
import { useState } from 'react';

function EditTaskWindow(props) {
    const [tname, setname] = useState(props.head);
    const [desc, setdesc] = useState(props.desc);
    // console.log("editid, setEdit", props.editid, props.setEdit);

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
                `/task/update`,
                { id: props.editid, heading: tname, description: desc }
            );

            if (result.data.success) {
                // alert(result.data.message);
                props.setEdit(false);
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

                <input
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

export default EditTaskWindow;