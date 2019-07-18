var express = require('express');
var app = express();
// var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var flash = require('express-flash');

//naming the database
mongoose.connect('mongodb://localhost/Authors');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(flash());

// app.use(session({
//     secret: 'GET IN MAH BELLY!',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 60000
//     }
// }))

var AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Author's name is required"],
        minlength: [3, "Name must be at least 3 characters long"],
    },
}, {
    timestamps: true
})


mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author');
module.exports = {
    Author
}

app.get('/authors', (req, res) => {
    Author.find({}, function (err, all_authors) {
        if (err) {
            console.log('something went wrong', err);
            res.json({
                message: "Error",
                error: err
            });
        } else { // else console.log that we did well and then res.json the data
            console.log('successfully displaying all authors');
            res.json({
                message: 'Success',
                data: all_authors
            });
        };
    });
});

app.post('/authors', (req, res) => {
    console.log('*****************************************')
    console.log(req.body)
    console.log('*****************************************')
    Author.create(req.body, (err, new_author) => {
        if (err) {
            console.log('You werent able to create', err);
            res.json({
                message: "Error",
                error: err
            });
        } else { // else console.log that we did well and then res.json the data
            console.log('successfully added a new author!', new_author);
            res.json({
                message: 'Success',
                data: new_author
            });
        };
    });
});

app.delete('/authors/:id', (req, res) => {
    Author.deleteOne({
        _id: req.params.id
    }, (err) => {
        if (err) {
            console.log('You werent able to delete', err);
            res.json({
                message: "Error",
                error: err
            });
        } else { // else console.log that we did well and then res.json the data
            console.log('successfully deleted a author!');
            res.json({
                message: 'Success',
            });
        };
    });
});

app.get('/authors/:id', (req, res) => {
    Author.findOne({
        _id: req.params.id
    }, (err, data) => {
        if (err) {
            console.log('You werent able to find author', err);
            res.json({
                message: "Error",
                error: err
            });
        } else { // else console.log that we did well and then res.json the data
            console.log('successfully got the author', data);
            res.json({
                message: 'Success',
                data: data
            });
        };
    });
});

app.put('/authors/:id', (req, res) => {
    Author.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {runValidators: true, new: true}, (err, data) => {
        if (err) {
            console.log('You werent able to find author WRONG', err);
            res.json({
                message: "Error",
                error: err
            });
        } else { // else console.log that we did well and then res.json the data
            console.log('successfully updated AUTHER', data);
            res.json({
                message: 'Successful update',
                data: data
            });
        };
    });
});

// reviews routs--------------------------------------------------------------

app.post('/reviews/:id', (req, res) => {
    // console.log('*****************************************')
    // console.log(req.body)
    // console.log('*****************************************')
    Review.create(req.body, (err, new_review) => {
        if (err) {
            console.log('You werent able to add review', err.message);
            res.json({
                message: "Error",
                error: err
            });
            res.redirect('/')
        } else { // else console.log that we did well and then res.json the data
            Author.findOneAndUpdate({
                _id: req.body.author_id
            }, {
                $push: {
                    comment: new_review
                }
            }, (err, new_review) => {
                if (err) {
                    console.log("Error adding comment to message")
                }
            })
            console.log('successfully added a new review!', new_review);
            res.json({
                message: 'Success',
                data: new_review
            });
        };
    });
});

app.put('/reviews/:id', (req, res) => {
    Review.findOneAndUpdate({
        _id: req.params.id
    }, req.body, (err, author) => {
        if (err) {
            console.log('You werent able to find author', err);
            res.json({
                message: "Error",
                error: err
            });
        } else { // else console.log that we did well and then res.json the data
            console.log('successfully updated', author);
            res.json({
                message: 'Successful update',
                data: author
            });
        };
    });
});

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (request, response) {
    response.send("404")
});

app.listen(8000, function () {
    console.log("listening on port 8000");
})