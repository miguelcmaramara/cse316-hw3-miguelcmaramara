import "./css/Tags.css"

export function TagsView(props){
    /**
     * props.tags
     * props.questions
     */
    var tagArr = []
    var tagRes = [];
    for(var i = 0; i < props.tags.length; i++){
        tagArr.push(props.tags[i]);
        if(i % 3 === 2 || i === props.tags.length - 1){
            tagRes.push(tagArr)
            tagArr = [];
        }
    }
    
    var allTags = tagRes.map(
        (tagArr) =>
            <TagRow
                handlePageChange={props.handlePageChange}
                tags={tagArr}
                questions={props.questions}
            />
    )

    return(
        <div className="view__tags">
            {allTags}
        </div>
    )
}

function TagRow(props){
    /**
     * props.tags
     * props.questions
     */
    var tags = props.tags.map(
        (tag) =>
            <Tag
                handlePageChange={props.handlePageChange}
                key={tag.tid}
                tag={tag}
                questions={props.questions}
            />
    )
    return(
        <div className="tag__row">
            {tags}
        </div>
    )

}

function Tag(props){
    /**
     * props.tag
     * props.questions
     */

    var numQuestions = 0;
    for(var i = 0; i< props.questions.length; i++)
        for(var j = 0; j < props.questions[i].tagIds.length; j++)
            if(props.tag.tid === props.questions[i].tagIds[j])
                numQuestions++;

    return (
        <div className="tag__box">
            <h3 onClick={() => props.handlePageChange("q", [[props.tag.tid, props.tag.name]])}>{props.tag.name}</h3>
            <p>{numQuestions} questions</p>
        </div>

    );
}


export function QuestionTags(props){
    return props.tagIds.map(
        (tid, index) => 
            <QuestionTag
                tid={tid}
                index={index}
                allTags={props.tags}
            />
    );

}

function QuestionTag(props){
    /**
     * props requirement:
     *      props.allTags
     *      props.tid
     *      props.index
     */
    var tagText = props.tid;
    for(var i = 0; i < props.allTags.length; i++)
        if(props.allTags[i].tid === props.tid){
            tagText = props.allTags[i].name;
            break;
        }

    let opBreak = ""
    if (props.index %4 ===3)
        opBreak = <br/>

    return(
        <span className="question__tag">{tagText}{opBreak}</span>
    )
}