import './css/Answer.css'
// import { QuestionTags } from './Tags'


export function AnswersView(props){
    /**
     * Required props:
     *      props.qid
     *      props.questions
     *      props.answers (from model)
     */

    // unused
    // var question;
    // for(var i = 0; i < props.questions.length; i++)
    //     if(props.qid===props.questions[i].qid)
    //         question = props.questions[i]


    const allAnswers = props.question.answers.map(
        (aid)=>
        <Answer
            key={aid}
            aid={aid}
            allAnswers={props.answers}
        />
    )

    return(
        // TODO: encapsulate this
        <div id="view__answer" className="view__answers">
            <div className="topic">
                <div className="topic__content__box question__stats">
                    <h3 className="topic__views">{props.question.views} views</h3>
                    <h3 className="topic__views">{props.question.answers.length} Answers</h3>
                </div>
                <div className="topic__content__box topic__proper">
                    <p className="topic__text">{props.question.text}</p>
                </div>
                <div className="topic__content__box topic__meta">
                    <span className="topic__author">Asked by {props.question.askedBy}</span>
                    <br/>
                    <span className="topic__date">On {props.question.askedOn}</span>
                    <br/>
                    <span className="topic__time">At {props.question.askedAt}</span>
                </div>
            </div>

            <div className="answers">
                {allAnswers}
            </div>
            <div class="button__wrapper">
                <button onClick={() =>props.handlePageChange(props.question.qid, [], [], "p")} id="ask_ans__button" class="ask_ans__button">Post Answer</button>
            </div>
        </div>
    )
}

function Answer(props){
    /**
     * props.answers (list of answerIds)
     * props.aid
     */
    let answer = {
        text: 'if you see this, there is an error',
        ansBy: 'error',
        ansOn: 'error',
        ansAt: 'error'
    }
    for(var i = 0; i < props.allAnswers.length; i++)
        if(props.allAnswers[i].aid === props.aid){
            answer = props.allAnswers[i]
            break;
        }
    return(
        <div className="answer">
            <div className="answer__content__box answer__proper">
                <p className="answer__text">{answer.text}</p>
            </div>
            <div className="answer__content__box answer__meta">
                <span className="answer__author">Ans by {answer.ansBy}</span>
                <br/>
                <span className="answer__date">On {answer.ansOn}</span>
                <br/>
                <span className="answer__time">At {answer.ansAt}</span>
            </div>
        </div>
    )
}