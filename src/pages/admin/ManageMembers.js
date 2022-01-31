import React, { useEffect } from 'react';

import { Option, Options, Content, BackButton, StyledLink } from '../../components/admin.style.js';
import reroute from '../../_helpers/reroute';

export default function AccountManage({ user, history, location }) {

  useEffect(() => {
    if (+user.permission !== 2) {
      history.push('/admin');
    }
  }, [user, history]);

  return (
    <Content>
      <BackButton onClick={() => reroute.toParent(history, location)} >Back</BackButton>
      <Options>
        <StyledLink to="/admin/new_user" ><Option style={{textAlign: 'center'}} >+</Option></StyledLink>
        <Option>Test</Option>
      </Options>
    </Content>
  )
}