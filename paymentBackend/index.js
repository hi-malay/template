const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
const userRoutes = require('./routes/user-routes');
const HttpError = require('./models/http-error');
const authRoutes = require('./routes/auth-routes');
const transRoutes = require('./routes/trans-routes');
const app = express();
app.use(cors())
app.use(bodyParser.json());//parse obj string in to json object
// app.use  it gets executed every time no matter what URL's been hit
app.use('/api/user', userRoutes); // => /api/places...
app.use('/api/auth', authRoutes);
app.use('/api/trans', transRoutes);
app.use((req, res, next) => {
    throw new HttpError('Could not find this route.', 404);
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
    .connect('mongodb+srv://malay:malaygo@cluster0.sxbnt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Serve at http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

