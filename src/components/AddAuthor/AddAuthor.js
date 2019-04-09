import React from "react"
import "./AddAuthor.css"

import { connect } from "react-redux"
import { createProduct } from "../../redux"
import { Redirect, Link } from "react-router-dom"

class AddAuthor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {})
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
                      value={this.state.image}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <input type="submit" value="Cancel" />
            <input type="submit" value="Create" disabled={!this.state.titleValid || !this.state.priceValid} />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  makeProduct: (newProduct) => dispatch(createProduct(newProduct))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAuthor)
