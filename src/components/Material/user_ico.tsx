import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { LinkProps, Link } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../../redux/rootReduser";
import { Avatar } from "@material-ui/core";
import { logOut } from '../../redux/login/actions'
import { clearCart } from "../../redux/addToCart/actions"

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link innerRef={ref as any} {...props} />
));

interface UserIconProps {
    user: any;
    isAdmin: boolean;
    avatar: string;
    logOut: Function;
    clearCart: Function

}

const UserIcon: React.FC<UserIconProps> = props => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }
    function logOut() {
        const { logOut, clearCart } = props;
        clearCart()
        logOut();

    }
    let img = props.avatar;
    return (
        <div>
            <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Avatar sizes="legal" alt="" src={img} />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={logOut} >Log out</MenuItem>
                <MenuItem onClick={handleClose} component={AdapterLink} to="/profile">Profile</MenuItem>
                {props.isAdmin ? (
                    <MenuItem onClick={handleClose} component={AdapterLink} to="/admin">Admin Panel</MenuItem>
                ) : (<div> </div>)}
            </Menu>
        </div>
    );
}
const mapStateToProps = (state: RootState) => ({
    isAdmin: state.login.isAdmin,
    user: state.login.user,
    avatar: state.login.avatar
});

export default connect(mapStateToProps, { logOut, clearCart })(UserIcon)