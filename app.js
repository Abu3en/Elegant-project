const express = require('express');
const mongoose = require('mongoose');
const Task = require('./modules/task');


const app = express();

const URI = 'mongodb+srv://yazan:test123@list.va0q7.mongodb.net/TODO?retryWrites=true&w=majority&appName=List';

mongoose.connect(URI)
    .then((result) => {
        console.log('Connected to the database');
        app.listen(3000);
    })
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


//routes
app.get('/', (req, res) => {
    res.redirect('/home');
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About', page: 'About' });
});
app.get('/create', (req, res) => {
    res.render('create', { title: 'Create', page: 'Create' });
});


//requests
app.post('/home', (req, res) => {
    const task = new Task(req.body)
    task.save()
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log("error with post request" + err)
        })
})

app.get('/home/:id', (req, res) => {
    const id = req.params.id;
    Task.findById(id)
        .then(result => {
            res.render('details', { title: 'task', page: 'task', task: result })
        })
        .catch(err => console.log("error finding the task" + err))

})

app.delete('/home/:id', (req, res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/home' })
        })
        .catch(err => console.log("error within the delete request " + err))
})





app.get('/home', (req, res) => {
    Task.find().sort({ startDate: 1 })
        .then(result => {
            res.render('index', { title: 'Home', page: 'Home', tasks: result });
        })
        .catch(err => console.log(err))
})

//page not found
app.use((req, res) => {
    res.status(404).render('404', { title: "Not Found" });
})