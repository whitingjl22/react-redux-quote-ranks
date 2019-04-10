import React from "react"
import "./QuoteList.css"

import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { deleteQuote } from "../../redux"

class QuoteList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      quotes: [],
      authorId: null
    }
  }

  componentDidMount = () => {
    let name = ""
    let quotes = []
    let authorId = null

    for (let i = 0; i < this.props.authors.length; i++) {
      if (parseInt(this.props.match.params.id) === this.props.authors[i].id) {
        name = this.props.authors[i].name
        quotes = this.props.authors[i].quotes
        authorId = this.props.authors[i].id

        this.setState({ name: name, quotes: quotes, authorId: authorId })
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
          <div className="quoteList_resultContainer">
            <table>
              <thead>
                <tr>
                  <th>Quote</th>
                  <th>Votes</th>
                  <th>Actions available</th>
                </tr>
              </thead>
              <tbody>
                {this.state.quotes.map((quote, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{quote.quote}</td>
                      <td>{quote.votes}</td>
                      <td>
                        <button>Vote Up</button>
                        <button>Vote Down</button>
                        <button
                          onClick={() => {
                            this.props.removeQuote(quote.id, this.state.authorId)
                          }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authors: state.authors
})

const mapDispatchToProps = (dispatch) => ({
  removeQuote: (quoteId, authorId) => dispatch(deleteQuote(quoteId, authorId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteList)
