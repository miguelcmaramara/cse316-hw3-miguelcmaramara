import "./css/Banner.css";
import React from 'react'

export default class Banner extends React.Component{
    /**
     * props.handlePageChange
     * props.view
     * props.page
     * props.tags
     */
    constructor(props){
        super(props);
        this.state = {
            searchQuery: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        

    }

    render(){
        return(
            <div className="banner">
                <div 
                    onClick={() => this.props.handlePageChange("q")} 
                    className={"banner__item " + (this.props.mode==="v" && this.props.page==="q" ?"banner__item--selected":"")}>
                    {/* className="banner__item banner__item--selected"> */}
                        <h2 className="banner__link">Questions</h2>
                </div>
                <div 
                    onClick={() => this.props.handlePageChange("t")}
                    className={"banner__item " + (this.props.mode==="v" && this.props.page==="t" ?"banner__item--selected":"")}>
                    {/* className="banner__item "> */}
                        <h2 className="banner__link">Tags</h2>
                </div>

                <h1 className="title">Fake Stack Overflow</h1>

                <form action="" className="search"
                    onSubmit={this.handleSubmit}
                >
                <input 
                    placeholder="Search..." 
                    type="text" 
                    className="search__input"
                    onChange={this.handleChange}
                ></input>
                {/* <button className="search__button"></button> */}
                </form >
            </div>
        )
    }

    componentDidMount(){

    }

    handleChange(event){
        this.setState({
            searchQuery: event.target.value
        });
    }
    
    handleSubmit(event){
        event.preventDefault();
        var wordArr = this.state.searchQuery.split(" ")
        this.props.handlePageChange("q",
            wordArr.filter(
                (word) => (word.charAt(0) ==="[" && word.charAt(word.length - 1) === "]")
            ) .map(
                (tagName) => {
                    console.log(tagName)
                    for(var i = 0; i < this.props.tags.length; i++)
                        if(this.props.tags[i].name.toLowerCase()===tagName.substring(1, tagName.length - 1).toLowerCase())
                            return [this.props.tags[i].tid, this.props.tags[i].name]
                    return "NO-TAG-ID"
                }
            ),
            wordArr.filter(
                (word) => !(word.charAt(0) ==="[" && word.charAt(word.length - 1) === "]")
            ).map(
                (word) => word.toLowerCase()
            )
        )
    }

}