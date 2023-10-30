import React from 'react';
import axios from 'axios'
import './css/Index.css';
import './css/Banner.css';
import Model from '../models/model.js';
import Banner from './Banner.js';
import {QuestionsView} from './Questions.js';
import { AnswersView } from './Answers';
import { TagsView } from './Tags';
import { Viewport } from './ViewPort';

export default class FakeStackOverflow extends React.Component {
  constructor(){
    super();
    var model = new Model
    this.state = {
      // possible combinations of mode and page: vq, vt, vqID, pq, pqID
      mode: "v", // 'v' or 'p'
      page: "q", // 'q' or 't' or a question id
      tagFilters: undefined,
      searchFilters: undefined,
      model: model
    }

    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)

  }

  componentDidMount(){
    this.handleUpdate()
  }

  render() {
    return (
      <div className="FakeStackOverflow">
         <Banner
          handlePageChange={this.handlePageChange}
          tags={this.state.model.data.tags}
          mode={this.state.mode}
          page={this.state.page}
         />
         <Viewport
          handlePageChange={this.handlePageChange}
          mode={this.state.mode}
          page={this.state.page}
          model={this.state.model}
          tagFilters={this.state.tagFilters}
          searchFilters={this.state.searchFilters}
         />
      </div>
    )
  }


  /*
    Handlers
  */

  async handlePageChange(page, tagFilters, searchFilters, mode){
    if(page.length > 1 & page!= this.state.page)
      await axios.post('/addView/', {qid: page})
        .then(res =>{
          console.log(`view added to ${page}`)
        })
    await this.handleUpdate();
    if(mode === undefined) mode = "v";
    this.setState({
      page: page,
      mode: mode,
      tagFilters: tagFilters,
      searchFilters: searchFilters
    });
    // if(page.charAt(0) ==="q" && page.length > 1)
    //   for(var i = 0; i < this.state.model.data.questions.length; i++)
    //     if(this.state.model.data.questions[i].qid === page)
    //       this.state.model.data.questions[i].views ++;
  }

  handleUpdate(){
    var model = new Model()
    console.log("updating")
    axios.get('/questions')
      .then(function(res){
        model.updateAllQuestions(res.data)
        return axios.get('/answers')
      }).then( function(res){
        model.updateAllAnswers(res.data)
        return axios.get('/tags')
      }).then( function(res){
        model.updateAllTags(res.data)
      }).then(() => this.setState({model: model}))

  
  }

}
