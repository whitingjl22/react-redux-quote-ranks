import React from "react"
import "./AddAuthor.css"

import { connect } from "react-redux"
import { createAuthor } from "../../redux"
import { Redirect, Link } from "react-router-dom"

class AddAuthor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      nameValid: false,
      toAuthorList: false
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

    this.props.makeAuthor({
      name: this.state.name
    })

    this.setState({
      toAuthorList: true
    })
  }

  render() {
    if (this.state.toAuthorList === true) {
      return <Redirect to="/" />
    }
    return (
      <div className="addAuthorContainer">
        <Link to={"/"}>
          <p>Home</p>
        </Link>
        <p>Add a new quotable author:</p>
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
            <input type="submit" value="Create" disabled={!this.state.nameValid} />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  makeAuthor: (newAuthor) => dispatch(createAuthor(newAuthor))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAuthor)
