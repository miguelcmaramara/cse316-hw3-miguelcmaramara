import React from 'react'
import './css/Index.css'
import './css/Answer.css'
import './css/Question.css'
import axios from 'axios'

export default class Poster extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errorMsg: "",
            text: "",
            user: "",
            title: "",
            tags: ""
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render(){
        if(!this.props.visible) return null;

        var keyword = "Answer"
        var titleInput = null;
        var tagInput = null
        // if(this.state.questionMode){
        if(this.props.page.length ===1){
            keyword = "Question"
            titleInput = (
                <div class="post__input">
                    <h2 class="post__prompt">Question Title</h2>
                    <i class="post__desc">Title should not be more than 100 characters</i>
                    <textarea 
                        id="title"
                        onChange={this.handleChange}
                        class="post__input" rows="4"></textarea>
                </div>
            )
            tagInput = (
                <div class="post__input post__question">
                    <h2 class="post__prompt">Tags</h2>
                    <i class="post__desc">Add Keywords separated by whitespace</i>
                    <textarea onChange={this.handleChange} id="tags" name="qtags" class="post__input"></textarea>
                </div>
            )
        }

        return(
            <div className="post">
                <form action="" className="post__questions" onSubmit={this.handleSubmit}>
                    <p style={{color:"red", textAlign:"center"}}>{this.state.errorMsg}</p>

                    {titleInput}
                    <div class="post__input post__question">
                        <h2 class="post__prompt">{keyword} Text</h2>
                        <i class="post__desc">Add details.</i>
                        <textarea onChange={this.handleChange} id="text" name="text" rows="10"class="post__input"></textarea>
                    </div>

                    {tagInput}

                    <div class="post__input post__question">
                        <h2 class="post__prompt">Username</h2>
                        <i class="post__desc">Should not be more than 15 characters</i>
                        <textarea onChange={this.handleChange} id="user" class="post__input"></textarea>
                    </div>

                    <button type="submit" onClick={this.handleSubmit} class="post__submit">Post {keyword}</button>
                </form>
            </div>
        );

    }

    handleChange(event){
        var newState = {};
        newState[event.target.id] = event.target.value
        this.setState(newState)

        // console.log(" id" +event.target.id)
        // console.log(" val " +event.target.value)
        // console.log(" state" +this.state.text)
    }

    async handleSubmit(event){
        event.preventDefault();
        var errorMsg = "";
        // console.log(this.state.title)
        // console.log(this.state.text)
        // console.log(this.state.tags)
        // console.log(this.state.user)
        if(this.state.title.length >= 100 && this.props.page.length === 1)
            errorMsg += "Title cannot be than 100 characters! "

        if(this.state.title.length === 0 && this.props.page.length === 1)
            errorMsg += "Title cannot empty! "

        if(this.state.text.length === 0)
            errorMsg += "Text cannot be empty! "

        if(this.state.user.length > 15)
            errorMsg += "User cannot be more than 15 characters! "

        if(this.state.user.length == 0 && this.props.page.length > 1)
            errorMsg += "User cannot be empty! "

        if(this.state.tags.length == 0 && this.props.page.length === 1)
            errorMsg += "Tags cannot be empty! "



        if(errorMsg.length > 0){
            this.setState({
                errorMsg: errorMsg
            })
            errorMsg=""
        } else {
            this.setState({
                errorMsg: ""
            })
            // add to the model

            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            var today = new Date();
            const model = this.props.model;
          
            var storedTags = model.data.tags;
            var tags = this.state.tags.split(' ');
            var stored = false;
            // // var tagIdLst = []
            // // var numStoredTags = storedTags.length;

            var newTagLst = [];
            var oldTagLst = [];

            if(this.props.page.length===1){
                for(let i = 0; i < tags.length; i++){
                    console.log("here")
                    if(model.nameMatches(tags[i], model.data.tags)){
                        console.log(`Matches: ${tags[i]}`)
                        oldTagLst.push(tags[i])
                    } else {
                        newTagLst.push(tags[i])
                        console.log(`no Matches: ${tags[i]}`)
                    }

                }
                // console.log("--------------------")
                // console.log(storedTags[3].name)
                // console.log("--------------------")

                // for(let i = 0; i < tags.length; i++){
                //   for (let j = 0; j < storedTags.length; j++){
                //     console.log(`${i} ${j}`)
                //     console.log(`${tags[i].toLowerCase()} ${storedTags[j].name.toLowerCase()} ${tags[i].toLowerCase() == storedTags[j].name.toLowerCase()}`)
                //     // console.log(`${tags[i].toLowerCase()} ${storedTags[j]} ${tags[i].toLowerCase() == storedTags[j].name.toLowerCase()}`)
                //     console.log("after")
                //     if(tags[i].toLowerCase() == storedTags[j].name.toLowerCase()){
                //       stored = true;
                //     //     console.log(`${tags[i]} : ${storedTags[j].name.toLowerCase()}`)
                //     //   console.log(storedTags[j].name)
                //     //   tagIdLst.push(storedTags[j].tid)
                //     }
                //   }

                // //   console.log("outside ")
                // //   console.log(stored)
                //   if(stored == false){
                //     // console.log(`false: ${tags[i]}`)
                //     newTagLst.push(tags[i])
                //     stored = false;
                //     // tagIdLst.push('t' + (numStoredTags+1))
                //     // storedTags[numStoredTags] = {
                //     //   tid: 't' + (numStoredTags+1),
                //     //   name: tags[i]
                //     // }
                //     // numStoredTags ++;
                //   } else {
                //     // console.log(`true: ${tags[i]}`)
                //     oldTagLst.push(tags[i].toLowerCase())
                //   }
                // }



                // model.data.questions[model.data.questions.length] =
                //                 {
                //                 qid: 'q' + model.data.questions.length,
                //                 title: this.state.title,
                //                 text: this.state.text,
                //                 tagIds: tagIdLst,
                //                 // tagIds: ['t1', 't2'],
                //                 askedBy : this.state.user,
                //                 askedOn: "" + (months[today.getMonth()]) +" " + today.getDate() + ", " + today.getFullYear(),
                //                 askedAt: today.getHours() + ":" + today.getMinutes(),
                //                 answers: [],
                //                 views: 0,
                //                 }

                let newQuestion = {
                    title: this.state.title,
                    text: this.state.text,
                    newTags: newTagLst,
                    oldTags: oldTagLst,
                    askedBy : this.state.user,
                }

                await axios.post('http://localhost:3000/post/question', newQuestion)
                    .then( res => {
                        // console.log(res);
                        // console.log(res.data);
                        console.log("finished first")
                        this.props.handlePageChange(this.props.page);
                        this.setState({
                            text: "",
                            user: "",
                            title: "",
                            tags: ""
                        });
                        return
                    })

            } else{
                let newAnswer = {
                        text: this.state.text,
                        ansBy : this.state.user,
                        qid: this.props.page
                    }

                await axios.post('http://localhost:3000/post/answer', newAnswer)
                    .then( res => {
                        console.log("handling answer")
                        console.log(res);
                        this.setState({
                            text: "",
                            user: "",
                            title: "",
                            tags: ""
                        });
                        this.props.handlePageChange(this.props.page);
                    })
              
                // model.data.answers[model.data.answers.length] =
                //                 {
                //                   aid: 'a' + (model.data.answers.length + 1),
                //                   text: this.state.text,
                //                   ansBy : this.state.user,
                //                   ansOn: "" + (months[today.getMonth()]) +" " + today.getDate() + ", " + today.getFullYear(),
                //                   ansAt: today.getHours() + ":" + today.getMinutes()
                //                 }
            }


            console.log("made it to the end")

            // this.props.handlePageChange(this.props.page)
        }
    }
}
