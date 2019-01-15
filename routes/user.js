const router = require('express').Router();
const { Page, User } = require('../models')
const { userList, userPages } = require('../views')

router.get('/', async (req,res,next) => {

    try {


        const users = await User.findAll();
    
        res.send(userList(users))
    } catch(error) {
        next(error)
    }

})

router.get(`/:${id}`, async (req,res,next) => {
    
    try{
        
        const user = await User.findById(req.params.id);
        res.send(userPages(user))
    } catch (error) {
        next(error)
    }
})


module.exports =     router
