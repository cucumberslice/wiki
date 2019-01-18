const express = require("express")
const router = express.Router();
const {addPage, wikiPage, main} = require('../views')
const { Page, User }= require('../models')


router.get('/', async (req,res,next) => {
    // res.send(`go to/wiki`)
    try {




        const pages = await Page.findAll()
        res.send(main(pages))
    } catch (error) {
        next(error)
    }
   
})


router.post('/', async (req,res,next) => {
    // res.json(req.body)
    // console.log(req.body.content)
    // const page = await Page.create(req.body)
    
    // const page = new Page(req.body)

        //  try {
        //     await page.save();
        //     res.redirect('/')
        // } catch (error) {
        //     next(error)
        // }
       try { const [user, wasCreated] = await User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        })

        const page = await Page.create(req.body);
        // console.log('what is', page)
        await page.setAuthor(user)

        res.redirect(`/wiki/${page.slug}`)
    } catch (error) {
        next(error)
    }
    })
    
    // /wiki/add
    router.get('/add', (req,res,next) =>{
        res.send(addPage())
    })
    
    router.get('/:slug', async(req,res, next) => {

        try {

            const page = await Page.findOne({
                where: {
                    slug: req.params.slug,
                   
                }
            });

            const author =  await page.getAuthor();
           if(page === null) {
               res.sendStatus(404)
           } else {

            //    console.log('what is', author)
               res.send(wikiPage(page,author))
           }
            
           
        } catch (error) {
            next(error)
        }
            // res.send(`hit dynamic route at ${req.params.slug}`)
        })
    
  

    

module.exports = router;
