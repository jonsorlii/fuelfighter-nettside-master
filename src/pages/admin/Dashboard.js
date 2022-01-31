import React from 'react';
import { Route, Switch } from "react-router-dom";

// components
import authenticationService from '../../_services/authentication.service';
import BlogMenu from './BlogMenu';
import Account from './Account';
import AccountManage from './AccountManage';
import NewUser from './NewUser';
import { Option, Options, StyledLink, Content, Body, Username } from '../../components/admin.style';
import ManageMenbers from './ManageMembers';

export default function Dashboard({ match, history, user }) {
  return (
    <Body>
      <Username>{user.username}</Username>
      <Switch>
        <Route path={`${match.path}/account`} component={Account} />
        <Route path={`${match.path}/manage_account`} render={(props) => <AccountManage {...props} user={user} />} />
        <Route path={`${match.path}/new_user`} component={NewUser} />
        <Route path={`${match.path}/blogs`} component={BlogMenu} />
        <Route path={`${match.path}/manage_members`} render={(props) => <ManageMenbers {...props} user={user} />} />
        <Route exact path={`${match.path}`} render={() => <DashboardMenu permission={user.permission} match={match} />} />

        {/* default */}
        <Route render={() => history.push('/admin')} />
      </Switch>
    </Body>
  )
}

function DashboardMenu({ permission, match }) {
  return (
    <Content>
      <Options>
        <StyledLink to="/admin/blogs" ><Option>Blog</Option></StyledLink>
        <StyledLink to="/admin/account" ><Option>Account</Option></StyledLink>
        {+permission === 2
          ? <><StyledLink to={`${match.path}/manage_account`}><Option>Manage Accounts</Option></StyledLink>
            <StyledLink to={`${match.path}/manage_members`}><Option>Manage Members</Option></StyledLink></>
          : ''
        }
        <Option onClick={authenticationService.logOut}>Log out</Option>
      </Options>
    </Content>
  )
}