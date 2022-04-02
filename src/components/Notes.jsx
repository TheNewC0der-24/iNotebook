import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';
import AddNote from "./AddNote";

const Notes = (props) => {

    const navigate = useNavigate();

    const context = useContext(NoteContext);
    const { notes, getNote, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNote();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const onChange = (e) => {
        // ... Spread operator
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert('Task has been edited successfully', 'info', 'Edited!!');
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <div ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="staticBackdropLabel">Edit Note</h5>
                            <div type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></div>
                        </div>
                        <div className="modal-body">
                            <form>

                                <style jsx='true'>
                                    {`
                                        .saveBtn:hover {
                                            background-color: #61428f !important;
                                        }
                                    `}
                                </style>

                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} style={{ textDecoration: "none", outline: "none", boxShadow: "none" }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} style={{ textDecoration: "none", outline: "none", boxShadow: "none" }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} style={{ textDecoration: "none", outline: "none", boxShadow: "none" }} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <div ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</div>
                            <div onClick={handleClick} type="button" className="btn saveBtn" style={{ color: '#ffffff', backgroundColor: '#6f42c1' }}>Save Changes</div>
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div className="container">
                <div className='row my-3'>
                    <h1 className='textCenter fw-bold'>Your Notes</h1>
                    {notes.length === 0 && <h5 style={{ color: '#6f42c1' }}>No Note Yet!!</h5>}
                    {notes.map((note) => {
                        //~ In MongoDB, each document stored in a collection requires a unique _id field that acts as a primary key. If an inserted document omits the _id field, the MongoDB driver automatically generates an ObjectId for the _id field. 
                        return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    );
};

export default Notes;
