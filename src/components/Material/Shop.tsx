import Card from '@material-ui/core/Card';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/rootReduser';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, Grid, CardActionArea } from '@material-ui/core';
import { Book } from '../../redux/addToCart/types';
import doBuyBook from "../../redux/addToCart/actions"
import { LinkProps, Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginLeft: 20,
        marginTop: 20
    },
    bullet: {
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    price: {
        textAlign: "end"
    },

    text: {
        overflowWrap: "break-word"
    }
});

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link innerRef={ref as any} {...props} />
));

interface ShopProps {
    books: any[];
    doBuyBook: (data: number) => object;
    isLoggedIn: boolean;
}

const Shop: React.FC<ShopProps> = props => {

    const classes = useStyles();

    function buyBook(bookID: number) {
        const { doBuyBook } = props;
        doBuyBook(bookID);
    }

    return (
        <div className={classes.root}>
            <Grid
                container
                xs={12}
                spacing={3}
                justify="center"
            >
                {props.books.map((book: Book) => (
                    <Grid key={book._id} item xs={3}>
                        <Card>
                            <CardActionArea component={AdapterLink} to={{
                                pathname: '/bookInfo',
                                state: { bookInfo: book }
                            }} >
                                <CardContent >
                                    <Grid container xs={12}>
                                        <Grid item xs={6}>
                                            <Typography className={classes.text} variant="h6">
                                                {book.title}
                                            </Typography>
                                        </Grid>
                                        <Grid className={classes.price} item xs={6}>
                                            <Typography >{book.price} UAH</Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography className={classes.text} color="textSecondary" variant="body2" component="p">
                                        {book.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                {props.isLoggedIn ? (
                                    <Button onClick={() => { buyBook(book._id) }} size="small">Add to cart</Button>
                                ) : (
                                        <Button component={AdapterLink} to="/login" size="small">Please Log In to buy</Button>
                                    )
                                }
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>

    );
}

const mapStateToProps = (state: RootState) => ({
    booksData: state.adminData.booksData,
    isLoggedIn: state.login.isLoggedIn
});
export default connect(mapStateToProps, { doBuyBook })(Shop);