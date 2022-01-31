import React, { useState } from 'react';

import { ButtonBorder } from '../../components/general.style';
import { Content, BackButton, Input, InputField, InputLabel } from '../../components/admin.style.js';
import reroute from '../../_helpers/reroute';
import authenticationService from '../../_services/authentication.service';

export default function NewUser({ history, location }) {

  const [ values, setValues ] = useState({username: '', firstname: '', lastname: '', password: '', passwordRepeat: ''});

  const updateField = (data) => {
    setValues({...values, ...data});
  }

  const newUser = () => {
    authenticationService.newUser( values.username, values.firstname, values.lastname, values.password, values.passwordRepeat)
      .then(bool => {
        if (bool === true) {
          reroute.toParent(history, location);
        }
      })
  }

  return (
    <Content>
      <BackButton onClick={() => reroute.toParent(history, location)} >Back</BackButton>
      <div>
        <Input>
          <InputLabel>Username</InputLabel>
          <InputField onChange={e => updateField({ username: e.target.value })} type="text" />
        </Input>
        <Input>
          <InputLabel>Firstname</InputLabel>
          <InputField onChange={e => updateField({ firstname: e.target.value })} type="text" />
        </Input>
        <Input>
          <InputLabel>Lastname</InputLabel>
          <InputField onChange={e => updateField({ lastname: e.target.value })} type="text" />
        </Input>
        <Input>
          <InputLabel>Password</InputLabel>
          <InputField onChange={e => updateField({ password: e.target.value })} type="password" />
        </Input>
        <Input>
          <InputLabel>Repeat password</InputLabel>
          <InputField onChange={e => updateField({ passwordRepeat: e.target.value })} type="password" />
        </Input>
        <ButtonBorder onClick={newUser} >Create User</ButtonBorder>
      </div>
    </Content>
  )
}