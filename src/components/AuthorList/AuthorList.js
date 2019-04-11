import React from "react"
import "./AuthorList.css"

import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { deleteAuthor } from "../../redux"

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
          <div className="authorList_resultContainer">
            <table>
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Actions available</th>
                </tr>
              </thead>
              <tbody>
                {this.props.authors.map((author, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{author.name}</td>
                      <td>
                        <Link to={"/quotes/" + author.id}>
                          <button>View Quotes</button>
                        </Link>
                        <Link to={"/edit/" + author.id}>
                          <button>Edit</button>
                        </Link>
                        <button
                          onClick={() => {
                            this.props.removeAuthor(author.id)
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
  removeAuthor: (id) => dispatch(deleteAuthor(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorList)
