import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    //? Get all notes
    const getNote = async () => {
        //~ Api call to get all notes
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json);
    };

    //? Add a Note
    const addNote = async (title, description, tag) => {
        //~ Api call to add a note
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        //~ Add note in Client Side 
        setNotes(notes.concat(note));
    }

    //? Delete a Note
    const deleteNote = async (id) => {
        //~ Api call to delete a note
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        // eslint-disable-next-line
        const json = response.json();

        //~ Delete note in Client Side 
        setNotes(notes.filter(note => note._id !== id));
    }

    //? Edit a Note
    const editNote = async (id, title, description, tag) => {
        //~ Api call to edit note 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        // eslint-disable-next-line
        const json = await response.json();

        let newNote = JSON.parse(JSON.stringify(notes));
        //~ Edit a Note in Client Side
        for (let index = 0; index < newNote.length; index++) {
            if (newNote[index]._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }
        setNotes(newNote);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;