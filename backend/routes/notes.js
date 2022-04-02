const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

//~ Get all notes: GET "/api/notes/fetchallnotes" 
// ROUTE: 1 /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//~ Add a note: POST "/api/notes/addnote" 
//~ Login required
// ROUTE: 2 /api/notes/addnote
router.post('/addnote', fetchuser, [
    body('title', 'Enter Title'),
    body('description', 'Enter Description'),
], async (req, res) => {

    try {
        //? If there are errors, return 400 (Bad) status code and errors.
        const errors = validationResult(req);

        const { title, description, tag } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();

        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//~ Update a note: PUT "/api/notes/updatenote/:id" 
// ROUTE: 3 /api/notes/updatenote/:id

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//~ Delete a note: DELETE "/api/notes/deletenote/:id" 
// ROUTE: 4 /api/notes/deletenote/:id

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        // Allow only the user who created the note to delete it
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Success, Note has been deleted', note });
    } catch (error) {

    }
});

module.exports = router;