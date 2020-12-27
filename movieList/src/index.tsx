import React from "react"
import ReactDOM from "react-dom"
import { MovieList } from "./containers/MovieList"

const App = () => {
  return <MovieList />
}

ReactDOM.render(<App />, document.getElementById("root"))
