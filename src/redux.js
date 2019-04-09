import { createStore } from "redux"

//ACTIONS
export const retrieveProducts = () => ({
  type: "RETRIEVE_PRODUCTS"
})
export const deleteProduct = (id) => ({
  type: "DELETE_PRODUCT",
  id
})
export const createAuthor = (newAuthor) => ({
  type: "CREATE_AUTHOR",
  newAuthor
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

    case "DELETE_PRODUCT":
      console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
      console.log(" -- REDUCER -- DELETE_PRODUCT | state: ", state)
      console.log(" -- REDUCER -- DELETE_PRODUCT | action", action)
      let deleteIndex = state.products.findIndex((obj) => obj["id"] === action.id)
      return {
        ...state,
        products: [...state.products.slice(0, deleteIndex), ...state.products.slice(deleteIndex + 1)]
      }

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
          quote: "Be yourself; everyone else is already taken.",
          votes: 0
        },
        {
          id: 2,
          quote: "Whatever the mind of man can conceive and believe, it can achieve.",
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
