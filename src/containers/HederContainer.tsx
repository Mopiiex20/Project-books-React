import { connect } from 'react-redux'
import  Header from '../components/Header/HeaderComponent'
import { RootState } from "../redux/rootReduser";

const mapStateToProps = (state: RootState) => ({
    isLoggedIn : state.login.isLoggedIn,
    user : state.login.user,
    isAdmin : state.login.isAdmin,
});
export default connect(mapStateToProps)(Header);
