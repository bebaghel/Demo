import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({
    origin: process.env.CORS_ORIGIN  || 'http://localhost:8000',
    credentials: true,
}))

app.use(express.json({limit: "50kb"}))
app.use(express.urlencoded({extended: true, limit: '50kb'}))
app.use(express.static('public'))
app.use(cookieParser())

// routes 
import userRouter  from './routes/user.routes.mjs';

//routes declaration  url:: http://localhost:8000/api/users/register
app.use('/api/users', userRouter)
// app.use('/api/tweets', tweetRouter)
// app.use('/api/subscriptions', subscriptionsRouter)
// app.use('/api/video', videoRouter)
// app.use('/api/like', likeRouter)
// app.use('/api/comments', commentRouter)
// app.use('/api/tweets', tweetRouter)

export {app}





