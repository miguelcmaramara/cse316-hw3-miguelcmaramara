import "./css/Index.css"
import { QuestionsView } from "./Questions"
import { AnswersView } from "./Answers"
import { TagsView } from "./Tags"
import Poster from "./Post"
import {useState} from 'react';

export function Viewport(props){
    /**
     * props.mode
     * props.page
     * props.model
     */

    const [headerParams, setHeaderParams] = useState({count: 0, title: ""})

    return(
        <div className="main">
            <View
                handlePageChange={props.handlePageChange}
                visible={props.mode === 'v'}
                page={props.page}
                questions={props.model.data.questions}
                answers={props.model.data.answers}
                tags={props.model.data.tags}
                tagFilters={props.tagFilters}
                searchFilters={props.searchFilters}
                setHeaderParams={setHeaderParams}
                headerParams={headerParams}
            />
            <Poster
                visible={props.mode ==='p'}
                handlePageChange={props.handlePageChange}
                page={props.page}
                model={props.model}
            />
        </div>
    )
}

function View(props){
    /**
     * props.page
     * props.questions
     * props.answers
     * props.tags
     * props.tagFilters
     * props.searchFilters
     */
    // alert(props.visible)
    if(!props.visible) return null;

    var viewContents;
    var counterNumber;
    var counterLabel;
    var headerName;
    if(props.page === 'q'){ // viewing all questions
        viewContents = (
            <QuestionsView
                handlePageChange={props.handlePageChange}
                questions={props.questions}
                tags={props.tags}
                tagFilters={props.tagFilters}
                searchFilters={props.searchFilters}
                setHeaderParams={props.setHeaderParams}
                headerParams={props.headerParams}
            />
        )
        counterNumber = props.headerParams.count//props.questions.length;
        counterLabel = "Questions";
        headerName = props.headerParams.title//"All Questions";
    } else if(props.page ==='t'){ //viewing all tags
        viewContents = (
            <TagsView
                handlePageChange={props.handlePageChange}
                questions={props.questions}
                tags={props.tags}
            />
        )
        counterNumber = props.tags.length;
        counterLabel = "Tags";
        headerName = "All Tags";
    } else{ // viewing all answers
        var question;
        for(var i = 0; i < props.questions.length; i++)
            if(props.page===props.questions[i].qid)
                question = props.questions[i]
        viewContents = (
            <AnswersView
                handlePageChange={props.handlePageChange}
                question={question}
                questions={props.questions}
                answers={props.answers}
                qid={props.page}
            />
        )
        counterNumber = question.answers.length;
        counterLabel = "Answers";
        headerName = question.title;

    }

    return(
        <div className="view">

            <div class="header">
            <div class="header__counter">
                <h3>{counterNumber} {counterLabel}</h3>
            </div>
            <div class="header__title">
                <h3 id="header__title" >{headerName} </h3>
            </div>
            <div class="header__question">
                <button onClick={()=> props.handlePageChange("q", [], [], "p")} id="ask_q__button" class="ask_q__button">Ask A Question</button>
            </div>
            </div>

            {viewContents}

        </div>

    )
}


function Post(props){
    return(
        <p>Hello world</p>
    )
}