import * as React from 'react';
import req from '../../services/Request';
import { connect } from 'react-redux'
import { RootState } from "../../redux/rootReduser";
import Table1 from './UserTable';


interface IAdminUserTableState {
  data: any;
  editIdx: number
}
interface IAdminUserTableProps {
  token: string;
  usersData: any[]
}
interface User {
  firstName: string
  _id: any;
  email: string;
}
class AdminUsersTable extends React.Component<IAdminUserTableProps, IAdminUserTableState> {

  state: any = {
    data: [],
    editIdx: -1
  };

  componentDidMount() {
    req('users', "GET")
      .then(books => {
        this.setState({
          data: books.data
        })
      })
  }

  handleRemove = (id: any) => {
    console.log(id);

    let conf = window.confirm("Do you realy want delete this user ?")
    if (conf) {
      req(`users/${id}`, "DELETE");
      this.setState(
        (state: { data: { filter: (arg0: (row: any) => boolean) => void; }; }) => ({
          data: state.data.filter((user: User) => user._id !== id)
        }));
    }
  };

  startEditing = (i: any) => {
    this.setState({ editIdx: i });
  };

  stopEditing = (id: any) => {

    this.setState({ editIdx: -1 });
    const body = this.state.data.find((user: User) => user._id === id);
    req(`users/${id}`, 'PUT', body, this.props.token)
  };

  handleChange = (e: { target: { value: any; }; }, name: string, i: number) => {
    const { value } = e.target;
    let newData = this.state.data.map(
      (user: User, j: number) => (j === i ? { ...user, [name]: value } : user)
    )
    this.setState({
      data: newData
    });
  };

  render() {

    let data = this.state.data;
    data.forEach((elem: any, i: any) => {
      elem.edit = `edit${i}`;
      elem.delete = `delete${i}`;
    });

    return (
      <div>
        {this.state.data.length === 0 ? (
          <div> </div>
        ) : (
            <div>
              <Table1
                data={data}
                handleRemove={(i: number) => { this.handleRemove(i) }}
                startEditing={(i: number) => { this.startEditing(i) }}
                stopEditing={(id: number) => { this.stopEditing(id) }}
                handleChange={(e: any, name: string, i: number) => { this.handleChange(e, name, i) }}
                editIdx={this.state.editIdx}
                header={[
                  {
                    name: "ID",
                    prop: "_id"
                  },
                  {
                    name: "First name",
                    prop: "firstName"
                  },
                  {
                    name: "Email",
                    prop: "email"
                  },
                  {
                    name: "Age",
                    prop: "age"
                  },
                  {
                    name: "edit",
                    prop: "edit"
                  },
                  {
                    name: "delete",
                    prop: "delete"
                  }
                ]}
              />
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  usersData: state.adminData.usersData,
  token: state.login.token
});
export default connect(mapStateToProps)(AdminUsersTable);