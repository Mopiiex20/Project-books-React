import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles, Theme } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { connect } from 'react-redux';
import { RootState } from '../../redux/rootReduser';
import { Menu, MenuItem } from '@material-ui/core';
import { increment, decrement, clearCart } from "../../redux/addToCart/actions"

const StyledBadge = withStyles((theme: Theme) => ({
    badge: {
        top: '50%',
        right: -3,
        // The border color match the background color.
        border: `2px solid ${
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
            }`,
    },
}))(Badge);
let counterForQuantity = 0;

interface ICartProps {
    increment: Function;
    decrement: Function;
    clearCart: Function;
    books: any[];

}

const Cart: React.FC<ICartProps> = props => {
    const { increment } = props;
    const { decrement } = props;
    const { clearCart } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    let badge: number = 0
    counterForQuantity++;

    let totalPrice = 0;

    props.books.length !== 0 ? props.books.forEach((book: any) => (totalPrice = totalPrice + (book.quantity * book.price))) : totalPrice = 0;
    props.books.length !== 0 ? props.books.forEach((book: any) => (badge = (badge + book.quantity))) : badge = 0;

    return (
        <div style={{ height: "100%" }}>
            <IconButton onClick={handleClick}>
                <StyledBadge badgeContent={badge} color="primary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    props.books.length === 0 ? (
                        <MenuItem>Add please some books to cart </MenuItem>
                    ) : (
                            props.books.map((book: any) => (
                                <div key={book._id}>
                                    <MenuItem>
                                        <div>
                                            {book.title}
                                        </div>
                                    </MenuItem>
                                    <label>Quantity : {book.quantity}</label>
                                    <button onClick={() => { increment(book._id, props.books, counterForQuantity) }} >+</button>
                                    <button onClick={() => { decrement(book._id, props.books, counterForQuantity) }}>-</button>
                                </div>
                            ))
                        )
                }
                <MenuItem> Total Price :{totalPrice} </MenuItem>
                <button onClick={() => { clearCart() }}>Clear Cart</button>

            </Menu>
        </div>
    );
}

const mapStateToProps = (state: RootState) => ({
    books: state.cart.books,
    quant: state.cart.quant
});

export default connect(mapStateToProps, { increment, decrement, clearCart })(Cart);
