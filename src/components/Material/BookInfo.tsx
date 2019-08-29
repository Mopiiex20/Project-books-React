import React from 'react'
import { Grid, Paper } from '@material-ui/core';


const BookInfo: React.FC<any> = props => {

    const book = props.location.state.bookInfo;
    console.log(book);


    return (
        <div >
            <Paper>
                <Grid
                 container 
                 xl={12}
                 direction = "column"
                 alignItems = "center"
                 alignContent = "center"
                 >
                    <Grid item xl={3}>
                        BOOK id :{book._id}
                    </Grid>
                    <Grid item xl={3}>
                        BOOK title :{book.title}
                    </Grid>
                    <Grid item xl={3}>
                        BOOK description : {book.description}
                    </Grid>
                    <Grid item xl={3}>
                        BOOK price :{book.price}
                    </Grid>
                </Grid>
            </Paper>

        </div>
    );
}

export default BookInfo