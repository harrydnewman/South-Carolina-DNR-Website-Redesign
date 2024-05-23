// imports express library
const express = require('express')
// include body parser library
const parser = require('body-parser')
const encodedParser = parser.urlencoded({extended: true})
// include multer library
const multer = require('multer')
const uploadProcessor = multer({dest:'public/project3/upload'})



// initialize express
const app = express()

// initialize public folder for assets
app.use(express.static('public'))
app.use('/images', express.static('images'));
// initialize body parser with the app
app.use(encodedParser)

// initialize template engine to look at views folder for rendering
app.set('view engine', 'ejs')

// TODO INCLASS: SET UP ROUTES!
app.get('/project3/', (req, res)=>{
    res.render('index.ejs', {})
})

app.get('/project3/about', (req, res)=>{
    res.render('about.ejs', {})
})

app.get('/project3/joe', (req, res)=>{
    res.render('joe.ejs', {})
})

app.get('/project3/social', (req, res)=>{
    const alldata = {
        allposts: data
    }

    res.render('social.ejs', alldata)
})

app.get('/project3/hs/safe', (req, res)=>{
    res.render('huntSAFE.ejs', {})
})

app.get('/project3/hs', (req, res)=>{
    res.render('hunterSafety.ejs', {})
})

app.get('/project3/hs/bow', (req, res)=>{
    res.render('bowCourses.ejs', {})
})

app.get('/project3/hs/trapper', (req, res)=>{
    res.render('trapperSafety.ejs', {})
})

app.get('/project3/hunting', (req, res)=>{
    res.render('hunting.ejs', {})
})

app.get('/project3/hunting/wra', (req, res)=>{
    res.render('wra.ejs', {})
})

// app.get('/project3/hunting/social', (req, res)=>{
//     res.render('social.ejs', {})
// })

app.get('/project3/hunting/regulations', (req, res)=>{
    res.render('regulations.ejs', {})
})

app.get('/project3/hunting/turkeyregulations', (req, res)=>{
    res.render('turkeyregulations.ejs', {})
})

app.get('/project3/education', (req, res)=>{
    res.render('education.ejs', {})
})

app.get('/project3/education/wra', (req, res)=>{
    res.render('wra.ejs', {})
})

app.get('/project3/education/sustainability', (req, res)=>{
    res.render('sustainability.ejs', {})
})

app.get('/project3/news/', (req, res)=>{
    res.render('news.ejs', {})
})

app.get('/project3/form/', (req, res)=>{
    res.render('form.ejs', {})
})
// array that stores all of the data on the server
let data = []
// global variable to keep track of how many posts
let postId = 0
// new route to handle uploaded data
app.post('/project3/upload', uploadProcessor.single('theimage'), (req, res)=>{
    
    let now = new Date()
    
    // message object that holds the data from the form
    let message = {
        id: postId,
        text: req.body.text,
        date: now.toLocaleString()
    }

    // incrementing number after every post is created to generate a new id
    postId++
    // checks to see if a file has been uplaoded
    if(req.file){
        message.imgSrc = 'upload/'+req.file.filename
    }

    // adding the most recent message to the top of the array
    data.unshift(message)

    res.redirect('/project3/social')
})

app.get('/project3/delete', (req, res) => {
    // console.log(req.query.postId)
    for(let i = 0; i < data.length; i++){
        let post = data[i]
        if(post.id == req.query.postId){
            data.splice(i, 1)
        }
    }
    // data.forEach( (post) => {})
    res.redirect('/project3/social')
})

app.get('/project3/public/project3/images/:filename', (req, res) => {
    const fileName = req.params.filename;
    // Specify the directory where the images are stored
    const filePath = __dirname + '/public/images/' + fileName;

    // Serve the file
    res.sendFile(filePath);
});

// setting up the server to start
// LAST PIECE OF CODE
// for projects going forward, it CANNOT be 80
app.listen(5555, ()=> {
    console.log('server starts')
})

