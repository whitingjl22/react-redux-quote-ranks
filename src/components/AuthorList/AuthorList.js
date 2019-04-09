import React from "react"
import "./AuthorList.css"

import { connect } from "react-redux"
import { Link } from "react-router-dom"

class AuthorList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    console.log("AUTHOR-LIST PAGE PROPS:", this.props)
    console.log("AUTHOR-LIST PAGE STATE:", this.state)

    return (
      <div className="authorListContainer">
        <Link to={"/new"}>
          <p>Add a quotable author</p>
        </Link>
        <p>We have quotes by:</p>
        <div className="authorList_contentContainer">
          <h3>Author</h3>
          <h3>Actions available</h3>
          <hr />
          <div className="authorList_resultContainer">
            <ul>
              {this.props.authors.map((author) => {
                return (
                  <li key={author.id}>
                    <div className="test">
                      <h4>{author.name}</h4>
                      <Link to={"/quotes/" + author.id}>
                        <button>View Quotes</button>
                      </Link>
                      <Link to={"/edit/" + author.id}>
                        <button>Edit</button>
                      </Link>
                    </div>
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
)(AuthorList)
