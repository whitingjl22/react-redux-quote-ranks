import React from "react"
import "./QuoteList.css"

import { connect } from "react-redux"
import { Link } from "react-router-dom"

class QuoteList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      quotes: []
    }
  }

  componentDidMount = () => {
    let name = ""
    let quotes = []

    for (let i = 0; i < this.props.authors.length; i++) {
      if (parseInt(this.props.match.params.id) === this.props.authors[i].id) {
        name = this.props.authors[i].name
        quotes = this.props.authors[i].quotes

        this.setState({ name: name, quotes: quotes })
        break
      }
    }
  }

  render() {
    console.log("Quote List Props: ", this.props)
    console.log("Quote List State: ", this.state)

    return (
      <div className="quoteListContainer">
        <Link to={"/"}>
          <p>Home</p>
        </Link>
        <Link to={"/write/" + this.props.match.params.id}>
          <p>Add a quote</p>
        </Link>
        <p>Quotes by {this.state.name}:</p>
        <div className="quoteList_contentContainer">
          <h3>Quote</h3>
          <h3>Votes</h3>
          <h3>Actions available</h3>
          <hr />
          <div className="quoteList_resultContainer">
            <ul>
              {this.state.quotes.map((quote) => {
                return (
                  <li key={quote.id}>
                    <h4>"{quote.quote}"</h4>
                    <h4>{quote.votes}</h4>
                    <button>Vote Up</button>
                    <button>Vote Down</button>
                    <button>Delete</button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authors: state.authors
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteList)
