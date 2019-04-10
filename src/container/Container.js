import React from "react"

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"

import "./Container.css"
import AuthorList from "../components/AuthorList/AuthorList"
import AddAuthor from "../components/AddAuthor/AddAuthor"
import EditAuthor from "../components/EditAuthor/EditAuthor"
import QuoteList from "../components/QuoteList/QuoteList"
import AddQuote from "../components/AddQuote/AddQuote"

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    console.log("CONTAINER PAGE PROPS:", this.props)
    console.log("CONTAINER PAGE STATE:", this.state)

    return (
      <div className="containerPage">
        <h1>Quote Ranks</h1>
        <BrowserRouter>
          <div className="contentContainer">
            <Switch>
              <Route exact path="/" component={AuthorList} />
              <Route path="/new" component={AddAuthor} />
              <Route path="/edit/:id" render={(props) => <EditAuthor {...props} />} />
              <Route path="/quotes/:id" render={(props) => <QuoteList {...props} />} />
              <Route path="/write/:id" render={(props) => <AddQuote {...props} />} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
