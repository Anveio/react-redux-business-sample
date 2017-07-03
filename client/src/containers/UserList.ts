import UserList, { Props, Handlers } from '../components/UserList';
import * as actions from '../actions/users';
import { connect, Dispatch } from 'react-redux';
import axios from 'axios';

import { rootUrl } from '../constants';

const mapStateToProps = (state: RootState): Props => {
  return {
    userList: state.users.list
  };
};

const mapDispatchToProps = (dispatch: Dispatch<actions.UserListAction>): Handlers => {
  return {
    onLoad: () => {
      axios
        .get(`${rootUrl()}/api/users`)
        .then(
          response => {
            let users: PublicUserInfo[] = response.data;
            dispatch(actions.getUserListSuccess(users));
          },
          error => {
            dispatch(actions.getUserListFailure());
          }
        )
        .catch(reason => {
          console.log(reason); // tslint:disable-line:no-console
        });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);