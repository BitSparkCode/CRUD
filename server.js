const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

let tasks = [];
let currentId = 1;

// CRUD Operations

// Create - Leere Aufgabe erstellen und zur Liste zurückleiten
app.post('/tasks', (req, res) => {
    const newTask = { id: currentId++, title: '', description: '' };
    tasks.push(newTask);
    res.redirect('/');
});

// Read - Alle Aufgaben lesen
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Read - Einzelne Aufgabe per ID lesen
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Update - Aufgabe aktualisieren
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete - Aufgabe löschen
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});

// Serve the index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'tasks', 'index.html'));
});

// Serve the edit page
app.get('/tasks/:id/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'tasks', 'edit.html'));
});

// Serve the show page
app.get('/tasks/:id/show', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'tasks', 'show.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
