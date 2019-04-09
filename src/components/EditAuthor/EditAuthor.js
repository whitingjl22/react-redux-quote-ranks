import React from "react"
import "./EditAuthor.css"

import { connect } from "react-redux"
import { createProduct } from "../../redux"
import { Redirect, Link } from "react-router-dom"

class EditAuthor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      nameValid: false
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
    console.log(`changing ${e.target.name}`)

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

    this.props.makeProduct({
      title: this.state.title,
      price: this.state.price,
      image: this.state.image
    })

    this.setState({
      toProductList: true
    })
  }

  render() {
    if (this.state.toProductList === true) {
      return <Redirect to="/products" />
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
            <input type="submit" value="Update" disabled={!this.state.nameValid} />
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
  makeProduct: (newProduct) => dispatch(createProduct(newProduct))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAuthor)
