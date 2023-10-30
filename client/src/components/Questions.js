import './css/Question.css'
import { QuestionTags } from './Tags'


export function QuestionsView(props){
    /**
     * Required props:
     *      props.question (from model)
     *      props.tags (from model)
     *      props.tagFilters (from model)
     */
    const allQuestions = props.questions.filter(
        (question) =>{
            if(props.searchFilters === undefined) return true;
            if(props.searchFilters.length === 0) return true;

            for(var i = 0; i < props.searchFilters.length; i++){
                if( question.text.toLowerCase().indexOf(props.searchFilters[i]) > -1||
                    question.title.toLowerCase().indexOf(props.searchFilters [i]) > -1
                )
                    return true;

            }
            return false
        }
    ).filter(
        (question) =>{
            if(props.tagFilters === undefined) return true;
            if(props.tagFilters.length === 0) return true;

            for(var i = 0; i < props.tagFilters.length; i++){
                if(question.tagIds.includes(props.tagFilters[i][0]))
                    return true

            }
            return false
        }
    ).map(
        (question)=>
        <Question
            key={question.qid}
            handlePageChange={props.handlePageChange}
            question={question}
            tags={props.tags}
        />
    )

    let title = ""
    if(props.searchFilters === undefined && props.tagFilters ===undefined){
        title = "All Questions"
    } else if(props.searchFilters === undefined){
        title = `Questions tagged [${props.tagFilters[0][1]}]`;
    } else if(allQuestions.length > 0){
        title = "Search results"
    } else {
        title = "No Questions Found"
    }
    // if(props.searchFilters!= undefined & )
    // if(props.tagFilters != undefined)
    if (props.headerParams.count != allQuestions.length || 
        props.headerParams.title != title)
        props.setHeaderParams({
            count: allQuestions.length,
            title: title,
        })

    return(
        <div id="view__questions" className="view__questions">
            {allQuestions}
        </div>
    )
}

export function Question(props){
    return(
        <div className="question">
            <div className="question__content__box question__stats">
                <h3 className="question__views">{props.question.views} views</h3>
                <h3 className="question__answers">{props.question.answers.length} Answers</h3>
            </div>
            <div className="question__content__box question__proper">
                <h3 onClick={() => props.handlePageChange(props.question.qid)}className="question__title">{props.question.title}</h3>
                {/* Tags start */}
                <QuestionTags
                    tagIds={props.question.tagIds}
                    tags={props.tags}
                />
                {/* Tags end */}
            </div>
            <div className="question__content__box question__meta">
                <span className="question__author">Asked by {props.question.askedBy}</span>
                <br/>
                <span className="question__date">On {props.question.askedOn}</span>
                <br/>
                <span className="question__time">At {props.question.askedAt}</span>
            </div>
        </div>
    )
}