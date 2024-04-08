//Group7 code from https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

const Note = require('../models/note.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content || !req.body.topic) {
        return res.status(400).send({
            message: "Note content and topic are required"
        });
    }

    // Validate topic value
    const validTopics = ['business', 'family', 'entertainment'];
    if (!validTopics.includes(req.body.topic)) {
        return res.status(400).send({
            message: "Invalid topic. Allowed values are 'business', 'family', or 'entertainment'"
        });
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note", 
        content: req.body.content,
        topic: req.body.topic
    });

    // Save Note in the database mongo Note
    note.save()
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

// Retrieve and return all notes from the database mongo Note
exports.findAll = (req, res) => {
    Note.find()
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Find a single note with a noteId mongo Note
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.status(200).json(note);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content || !req.body.topic) {
        return res.status(400).send({
            message: "Note content and topic are required"
        });
    }

    // Validate topic value
    const validTopics = ['business', 'family', 'entertainment'];
    if (!validTopics.includes(req.body.topic)) {
        return res.status(400).send({
            message: "Invalid topic. Allowed values are 'business', 'family', or 'entertainment'"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content,
        topic: req.body.topic
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.status(200).json(note);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndDelete(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.status(200).send({ message: "Note deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
};
