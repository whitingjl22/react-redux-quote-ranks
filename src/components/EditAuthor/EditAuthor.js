import React from "react"
import "./EditAuthor.css"

import { connect } from "react-redux"
import { updateAuthor, deleteAuthor } from "../../redux"
import { Redirect, Link } from "react-router-dom"

class EditAuthor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      nameValid: false,
      toAuthorList: false
    }
  }

  componentDidMount = () => {
    let name = ""

    for (let i = 0; i < this.props.authors.length; i++) {
      if (parseInt(this.props.match.params.id) === this.props.authors[i].id) {
        name = this.props.authors[i].name

        this.setState({ name: name })
        break
      }
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.name.length < 3) {
        this.setState({ nameValid: false })
      } else {
        this.setState({ nameValid: true })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleUpdateButton = () => {
    this.props.reviseAuthor(parseInt(this.props.match.params.id), {
      name: this.state.name
    })

    this.setState({
      toAuthorList: true
    })
  }

  handleDeleteButton = () => {
    this.props.removeAuthor(parseInt(this.props.match.params.id))

    this.setState({
      toAuthorList: true
    })
  }

  render() {
    if (this.state.toAuthorList === true) {
      return <Redirect to="/" />
    }
    return (
      <div className="editAuthorContainer">
        <Link to={"/"}>
          <p>Home</p>
        </Link>
        <p>Edit author:</p>
        <div className="table">
          <form onSubmit={this.handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>
                    <br />
                    <br />
                    <br />
                    <input
                      className="nameInput"
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      value={this.state.name}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Link to={"/"}>
              <button>Cancel</button>
            </Link>
            <input type="submit" value="Update" disabled={!this.state.nameValid} onClick={this.handleUpdateButton} />
            <button onClick={this.handleDeleteButton}>Delete</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authors: state.authors
})

const mapDispatchToProps = (dispatch) => ({
  reviseAuthor: (id, updatedAuthor) => dispatch(updateAuthor(id, updatedAuthor)),
  removeAuthor: (id) => dispatch(deleteAuthor(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAuthor)
