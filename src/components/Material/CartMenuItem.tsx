import React from 'react';
import { RootState } from '../../redux/rootReduser';
import { connect } from 'react-redux';
import { increment, decrement } from "../../redux/addToCart/actions"

interface MenuItemProps {
    increment: Function;
    decrement: Function;
    books: any;
    bookId: number;
    bookTitle: string;
}


const MenuItems: React.FC<MenuItemProps> = props => {
    const { increment } = props;
    const { decrement } = props;
    let quant = 0;
    props.books.forEach(
        (elem: any) =>
            elem.id === props.bookId ? quant = elem.quantity : null
    )
    console.log(props.books);

    return (
        <div>
            <div>
                {props.bookTitle}
            </div>
            <div>
                {quant}
                <button onClick={() => { increment(props.bookId, props.books) }} >+</button>
                <button onClick={() => { decrement(props.bookId, props.books) }}>-</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    books: state.cart.books,
    quant: state.cart.quant
});

export default connect(mapStateToProps, { increment, decrement })(MenuItems);