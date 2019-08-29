import React, { Component } from 'react';
import req from '../../services/Request';
import Shop from '../Material/Shop';

interface HomeState{
    books: any[]
}
export default class Home extends Component<HomeState> {
    state = {
        books: []
    }
    componentDidMount() {
        req('books', "GET")
        .then(books => {
            this.setState({
                books: books.data
            })
        }) 
        
        
    }
    render() {
        return (
            this.state.books.length === 0 ? (
                <div></div>
            ) : (
                    <div>
                        <Shop books = {this.state.books}/>
                    </div>
                )
                 )
    }
}