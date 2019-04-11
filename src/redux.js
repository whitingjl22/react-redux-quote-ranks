import { createStore } from "redux"

//ACTIONS
export const retrieveProducts = () => ({
  type: "RETRIEVE_PRODUCTS"
})
export const deleteAuthor = (id) => ({
  type: "DELETE_AUTHOR",
  id
})
export const deleteQuote = (quoteId, authorId) => ({
  type: "DELETE_QUOTE",
  quoteId,
  authorId
})
export const createAuthor = (newAuthor) => ({
  type: "CREATE_AUTHOR",
  newAuthor
})
export const createQuote = (newQuote) => ({
  type: "CREATE_QUOTE",
  newQuote
})
export const updateAuthor = (id, updatedAuthor) => ({
  type: "UPDATE_AUTHOR",
  id,
  updatedAuthor
})

///REDUCERS
export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "RETRIEVE_PRODUCTS":
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- RETRIEVE_PRODUCTS | state: ", state)
      console.log(" -- REDUCER -- RETRIEVE_PRODUCTS | action", action)
      return state.products

    case "DELETE_AUTHOR":
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- DELETE_AUTHOR | state: ", state)
      console.log(" -- REDUCER -- DELETE_AUTHOR | action", action)
      let deleteIndex = state.authors.findIndex((obj) => obj["id"] === action.id)
      return {
        ...state,
        authors: [...state.authors.slice(0, deleteIndex), ...state.authors.slice(deleteIndex + 1)]
      }

    case "DELETE_QUOTE": // Nested Object
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- DELETE_QUOTE | state: ", state)
      console.log(" -- REDUCER -- DELETE_QUOTE | action", action)

      return {
        ...state,
        authors: [
          ...state.authors.map((author) => {
            console.log("AUTHOR/QUOTE CHECK: ", author.id, action.authorId)
            if (author.id === action.authorId) {
              console.log("AUTHOR/QUOTE FOUND: ", author.id, action.authorId)

              let deleteIndex = author.quotes.findIndex((obj) => obj["id"] === action.id)

              console.log("delete index: ", deleteIndex)
              if (deleteIndex >= 0) {
                return {
                  ...author,
                  quotes: [...author.quotes.slice(0, deleteIndex), ...author.quotes.slice(deleteIndex + 1)]
                }
              }
            }
            return author
          })
        ]
      }
    // 	...state,
    // 	products: [...state.products.slice(0, deleteIndex), ...state.products.slice(deleteIndex + 1)]
    // }

    case "CREATE_AUTHOR":
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- CREATE_AUTHOR | state: ", state)
      console.log(" -- REDUCER -- CREATE_AUTHOR | action", action)
      console.log(" -- REDUCER -- CREATE_AUTHOR | id ", id)
      id++
      return {
        ...state,
        authors: [
          ...state.authors,
          {
            id,
            name: action.newAuthor.name,
            quotes: []
          }
        ]
      }

    case "CREATE_QUOTE": // Nested Object
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- CREATE_QUOTE | state: ", state)
      console.log(" -- REDUCER -- CREATE_QUOTE | action", action)
      console.log(" -- REDUCER -- CREATE_QUOTE | id ", id)
      id++
      return {
        ...state,
        authors: [
          ...state.authors.map((author) => {
            console.log("AUTHOR CHECK: ", author.id, action.newQuote.id)
            if (author.id === action.newQuote.id) {
              console.log("AUTHOR FOUND: ", author.id, action.newQuote.id)
              return {
                ...author,
                quotes: [
                  ...author.quotes,
                  {
                    id,
                    quote: action.newQuote.quote,
                    votes: 0
                  }
                ]
              }
            }
            return author
          })
        ]
      }

    case "UPDATE_AUTHOR":
      console.log(" -- REDUCER -- UPDATE_AUTHOR | state: ", state)
      console.log(" -- REDUCER -- UPDATE_AUTHOR | action", action)
      return {
        ...state,
        authors: state.authors.map((author) => {
          if (author.id === action.id) {
            return {
              ...author,
              name: action.updatedAuthor.name
            }
          }
          return author
        })
      }

    default:
      return state
  }
}

// Initial State
let id = 2
const initialState = {
  authors: [
    {
      id: 1,
      name: "Billy Bryson",
      quotes: [
        {
          id: 1,
          quote: "Be yourself everyone else is already taken.",
          votes: 0
        },
        {
          id: 2,
          quote: "Whatever the mind can conceive and believe, it can achieve.",
          votes: 0
        }
      ]
    },
    {
      id: 2,
      name: "Ada Lovelace",
      quotes: [
        {
          id: 1,
          quote: "Truth and value.",
          votes: 0
        },
        {
          id: 2,
          quote: "You miss 100% of the shots you don’t take.",
          votes: 0
        }
      ]
    }
  ]
}

// STORE -- store.js
export function configureStore(initialState = initialState) {
  const store = createStore(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  console.log(store)
  return store
}

export const store = configureStore()
