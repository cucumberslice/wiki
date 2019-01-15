const express = require('express')
const morgan = require('morgan')
const layout = require('./views/main')
// const { db, User, Page } = require('./models')
const model = require("./models");
const  wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')
// const router = require("express").Router();
const path = require("path");

const app = express()

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())


app.use('/wiki', wikiRouter);
app.use('/user', userRouter)

app.get('/', (req,res,next) => {

    res.redirect('/wiki/')
})



//sync the database
const PORT = 3000;
 
const init = async () => {
    // await Page.sync()
    // await User.sync()
    // await db.sync()
    await model.db.sync()
    // await model.db.sync({force: true})

   

    app.listen(PORT, () => {
        console.log(`App Listening to port ${PORT}`)
    })
}

init()





