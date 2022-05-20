const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const searchRouter = require('./routes/search.router');
const videoRouter = require('./routes/video.router');
const permissionRouter = require('./routes/permission.router')
const promptRouter = require('./routes/prompt.router')
const linkRouter = require('./routes/link.router');



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* User route */
app.use('/api/user', userRouter);
app.use('/api/search', searchRouter);

/* Video route */
app.use('/api/video', videoRouter);

/* Permission route (to the "shared_videos" table) */
app.use('/api/permission', permissionRouter);

/* Permission route (to the "prompts" table) */
app.use('/api/prompt', promptRouter);

/* route to shorten URLs */
app.use('/api/link', linkRouter);



// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
