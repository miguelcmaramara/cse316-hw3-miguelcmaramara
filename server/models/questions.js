// Question Document Schema
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var QuestionSchema = new Schema(
    {
        title: {
            type: String,
            max: [100, 'title too long (more than 100 characters)'],
            required: true
        },
        text: {type: String, required: true},
        tags: [{type: Schema.Types.ObjectId, ref: 'Tag', required: true}],
        answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
        asked_by: {type: String, default: "Anonymous"},
        ask_date_time: {type: Date, default: Date.now},
        views: {type: Number, default: "0"},
    }
)

QuestionSchema.virtual('url').get(
    function() {
        return `/posts/question/${this._id}`
    }
)


// TODO: to be deleted
// function newQuestion(instance){
    /**
     * instance: {
     *      Required members:
     *          title: String,
     *          text: String,
     *          tags: String list
     *      Optional members:
     *          askedBy: String,
     *      
     * }
     */
//}


module.exports = mongoose.model('Question', QuestionSchema)