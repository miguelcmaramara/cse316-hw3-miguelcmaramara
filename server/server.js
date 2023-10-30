// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
const express = require('express')
const cors = require('cors')
const app = express();
const port = 8000;

const mongoose = require('mongoose');
var mongoDb = 'mongodb://127.0.0.1:27017/fake_so';
mongoose.connect(mongoDb, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection err, pls fix'))

let Question = require('./models/questions')
let Answer = require('./models/answers')
let Tag = require('./models/tags');

getQuestions = async () => {
    var allQuestions = await Question.find().exec();
    console.log(allQuestions)
    var modQuestions = allQuestions.map(question => question._id + ", " + question.url);
    console.log(modQuestions);
    return modQuestions;
}

getQuestions()
    .then((res) => console.log(res))
    .catch((err) => console.log('got nothin ' + err))


// main().catch(err => console.log(err))

// async function main() {
//     await mongoose.connect('mongodb://localhost:27017/fake_so')
// }



app.use(cors())
app.use(express.json())
app.get('/questions/', async function(req, res){
    res.send(await Question.find().exec())
})

app.get('/answers/', async function(req, res){
    res.send(await Answer.find().exec())
})

app.get('/tags/', async function(req, res){
    res.send(await Tag.find().exec())
})

app.post('/post/answer/', async function(req, res){
    console.log("Receiving answer")
    a = req.body;
    console.log(a)

    let questionDoc = await Question.findOne({_id: a.qid})
    let newAnswer = new Answer({
        text: a.text,
        ans_by: a.ansBy,
    })

    newAnswer.save();
    questionDoc.answers.push(newAnswer)
    questionDoc.save();

    res.send("Answer Recieved")
})

app.post('/post/question/', async function(req, res){
    console.log("Receiving post request")
    q = req.body;
    console.log(q)

    tagLst = []
    for(let i = 0; i < q.oldTags.length; i++){
        tagLst.push(await Tag.findOne({name: {$regex: new RegExp("^" + q.oldTags[i], "i")}}))
    }

    for(let i = 0; i < q.newTags.length; i++){
        let newTag = new Tag({ name: q.newTags[i]});
        tagLst.push(newTag)
        console.log( newTag.save());

    }

    let newQuestion = new Question({
        title: q.title,
        text: q.text,
        asked_by: (q.askedBy === "") ? undefined : q.askedBy,
        tags: tagLst,
        answers:[]

    })

    let questionDoc = new Question(newQuestion);
    questionDoc.save();

    res.send("Question Recieved")
})

app.get('/posts/question/:qid', async function(req, res){
    res.send(await Question.findOne({_id: req.params.qid}).exec())
})

app.get('/posts/answer/:aid', async function(req, res){
    res.send(await Answer.findOne({_id: req.params.aid}).exec())
})

app.get('/posts/tag/:tid', async function(req, res){
    res.send(await Tag.findOne({_id: req.params.tid}).exec())
})

app.post('/addView/', async function(req, res){
    let question = await Question.findOne({_id: req.body.qid})
    question.views += 1;
    question.save()
    console.log(req.body.qid)
    res.send("view added")
})

app.get('/', (req,res) => {
    res.send('Hello World?')
})

app.listen(port, () => {
    console.log(`example app on ${port}`)
})