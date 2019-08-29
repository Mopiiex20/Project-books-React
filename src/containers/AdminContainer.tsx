import { connect } from 'react-redux'
import  AdminComponent from '../components/AdminComponent'
import { RootState } from "../redux/rootReduser";
import doAdmin from "../redux/admin/actions"

const mapStateToProps = (state: RootState) => ({
    adminData : state.adminData,
    isAdmin : state.login.isAdmin
});
export default connect(mapStateToProps,{doAdmin})(AdminComponent);