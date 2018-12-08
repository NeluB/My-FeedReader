import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import HomePage from './HomePage'
import BrowsePage from './SearchPage'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  //Stores books
  state = {
  	myBooks: []
  }
  /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

  //Fetches books  
  refreshBooks = () => {
    BooksAPI.getAll().then((myBooks) => {this.setState({ myBooks })})
  }
  

  componentDidMount() {
  	this.refreshBooks()
  }

  //moves book to another shelf
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
 	this.refreshBooks()
  }

  render() {
    
    return (
      <div className="app">
         <Route exact path="/search" render={() => (
            <BrowsePage
                myBooks={this.state.myBooks}
                moveBook={this.moveBook} 
            />
		)} />
       <Route exact path="/" render={() => (
           <HomePage
                myBooks={this.state.myBooks}
                moveBook={this.moveBook} 
           />
		)} />
      </div>
    )

  }

}

export default BooksApp
