const express = require("express")
const router = express.Router();
const {addPage} = require('../views')
const { Page, User }= require('../models')


router.get('/', (req,res,next) => {
    res.send(`go to/wiki`)
})


router.post('/', async (req,res,next) => {
    // res.json(req.body)
    // console.log(req.body.content)
    // const page = await Page.create(req.body)
    
    const page = new Page(req.body)
    // console.log('what is ', page)
    //    const page = new Page({
        //        title: req.body.title,
        //        content: req.body.content
        //    })
        
        try {
            await page.save();
            res.redirect('/')
        } catch (error) {
            next(error)
        }
    })
    
    // /wiki/add
    router.get('/add', (req,res,next) =>{
        res.send(addPage())
    })
    
    router.get('/:slug', (req,res, next) => {
            res.send(`hit dynamic route at ${req.params.slug}`)
        })

module.exports = router;
