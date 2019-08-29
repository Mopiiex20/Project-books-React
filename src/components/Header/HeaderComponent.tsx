import * as React from "react";
import './header.scss';
import { Link, LinkProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Userico from "../Material/user_ico"
import Cart from "../Material/Cart";
import { Chip, Avatar, IconButton, Typography, Grid } from "@material-ui/core";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import { connect } from "react-redux";
import { RootState } from "../../redux/rootReduser";

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link innerRef={ref as any} {...props} />
));

function HomeIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}
interface IHeaderProps {
    user: {
        firstName: string;

    }
    isLoggedIn: boolean;
    firstName: string
}
class Header extends React.Component<IHeaderProps, any> {
    render() {
        return (
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <IconButton
                    size="small"
                    aria-controls="menu-appbar"
                    component={AdapterLink} to="/"
                    color="inherit"
                >
                    <HomeIcon />
                    <Typography>LOGO</Typography>
                </IconButton>
                <Typography>WELCOME TO THE BOOK SHOP !</Typography>
                {(this.props.isLoggedIn) ? (
                    <div className="login" >
                        <Chip
                            style={{ alignSelf: "center" }}
                            avatar={<Avatar>HI</Avatar>}
                            label={this.props.firstName}
                        />
                        <Userico />
                        <Cart />
                    </div>
                ) : (
                        <Button color="secondary" component={AdapterLink} to="/login"> Log In </Button>
                    )
                }
            </Grid >
        )
    }
}
const mapStateToProps = (state: RootState) => ({
    firstName: state.login.firstName
})
export default connect(mapStateToProps)(Header)