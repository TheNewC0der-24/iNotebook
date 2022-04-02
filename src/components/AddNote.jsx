import React, { useContext, useState } from 'react';
import NoteContext from "../context/notes/NoteContext";

const AddNote = (props) => {

    const context = useContext(NoteContext);
    const { addNote } = context;


    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        if (note.title.length !== 0 && note.description.length !== 0) {
            addNote(note.title, note.description, note.tag);
            setNote({ title: "", description: "", tag: "" });
            props.showAlert('Task has been added successfully', 'info', 'Added!!');
        } else {
            props.showAlert('Please Enter Title and Description', 'info', 'Added!!');
        }
    }

    const onChange = (e) => {
        // ... Spread operator
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className='container col-lg-8 col-md-6'>
            <h1 className='text-center fw-bold mt'>What's the Plan for Today?</h1>
            <h3 className='fw-bold mb-3'>Write Your Note 👇</h3>
            <form>
                <style jsx='true'>
                    {`
                        .addBtn {
                            background-color: #6f42c1;
                            color: #fff;
                            text-decoration: none !important;
                            outline: 0 !important;
                            box-shadow : none !important;
                        }

                        .addBtn:hover {
                            color: #fff;
                            background-color: #61428f !important;
                        }
                    `}
                </style>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' onChange={onChange} value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length === 0 && note.description.length === 0} onClick={handleClick} type="submit" className="btn addBtn d-block col-xxl-3 col-xl-4 col-lg-4 col-md-6 mx-auto">Add Note</button>
            </form>
        </div>
    );
};

export default AddNote;
