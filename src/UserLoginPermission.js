import React, {Component} from 'react';
import Error401 from "./Error401";

class UserLoginPermission extends Component {
    render() {
        return sessionStorage.getItem('userLoggedIn') === 'true' ? this.props.component : <Error401/>
    }
}

export default UserLoginPermission;