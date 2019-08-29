import { connect } from 'react-redux'
import { LoginComponent } from '../components/Login/LogInComponent'
import { RootState } from "../redux/rootReduser";
import doLogin from '../redux/login/actions'

const mapStateToProps = (state: RootState) => ({
    isLoggedIn: state.login.isLoggedIn,
    loading: state.login.loading,
    user: state.login.user,
    errorInfo: state.errorData.errorInfo,
    error: state.errorData.error
});
export default connect(mapStateToProps,
    { doLogin }
)(LoginComponent);