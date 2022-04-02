import React, { useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
    const { note, updateNote } = props
    const context = useContext(NoteContext);
    const { deleteNote } = context;


    return (
        <>
            <div className='col-xxl-3 col-xl-4 col-lg-4 col-md-6'>
                <div className="card bg-light text-center my-4">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <hr />
                        <p className="card-text">{note.description}</p>
                        <div className="d-flex justify-content-center gap-2">
                            <div onClick={() => { deleteNote(note._id); props.showAlert('Task has been Deleted successfully', 'info', 'Deleted!!'); }} className='btn btn-outline-danger fs-4'>
                                <i className='bx bxs-trash'></i>
                            </div>
                            <div onClick={() => { updateNote(note) }} className='btn btn-success fs-4'>
                                <i className='bx bxs-edit'></i>
                            </div>
                        </div>
                        <hr />
                        <div className="mt-2">
                            <div className="text-center fw-bold">i<span style={{ color: '#6f42c1' }}>Note</span>book</div>
                        </div>
                        <span className="position-absolute top-0 start-50 translate-middle text-wrap badge" style={{ backgroundColor: '#6f42c1' }}>
                            {note.tag}
                        </span>
                    </div>
                </div>
            </div >
        </>
    );
};

export default NoteItem;
