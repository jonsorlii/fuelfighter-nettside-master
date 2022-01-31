import { fetch } from 'whatwg-fetch';

import handleResponse from '../_helpers/handleResponse';

// const url = `${process.env.PUBLIC_URL}/backend/admin/user/`;
const url = '/backend/admin/user/';

export default class authenticationService {

  static async isAuthenticated() {
    return fetch(url + 'isAuthenticated.php')
      .then(handleResponse)
  }

  static updatePassword(password, password_repeat) {
    if (password !== password_repeat) {
      alert('Passwords dont match');
      return
    }
    fetch(url + `updatePassword.php?password=${password}&password_repeat=${password_repeat}`)
      .then(handleResponse)
      .then(data => {
        if (data.success) {
          alert('Password updated');
          window.location.reload(false);
        } else {
          alert('Failed to update password');
        }
      })
  }

  static updateUsername(username) {
    fetch(url + `updateUsername.php?username=${username}`)
      .then(handleResponse)
      .then(data => {
        if (data.success) {
          alert('Username updated');
          window.location.reload(false);
        } else {
          alert('Failed to update username');
        }
      })
  }
  
  static newUser(username, firstname, lastname, password, passwordRepeat) {
    return fetch(url + `newUser.php?username=${username}&firstname=${firstname}&lastname=${lastname}&password=${password}&password_repeat=${passwordRepeat}`)
      .then(handleResponse)
      .then(data => {
        if (data.success) {
          alert('User created');
          return true;
        } else {
          alert('Failed to create user');
          return false;
        }
      })
  }

  static async getUserData() {
    return new Promise((resolve, reject) => {
      try {
        let stateCheck = setInterval(() => {
          if (document.readyState === 'complete') {
            clearInterval(stateCheck);
            return fetch(url + 'getUserData.php')
              .then(handleResponse)
              .then(data => {
                if (data !== undefined && data.authenticated === true) {
                  resolve({
                    isAuthenticated: data.authenticated,
                    username: data.username,
                    permission: data.permission
                  });
                }
              })
          }
        }, 100);
      } catch (err) {
        reject(err);
      }
    });
  }

  static logOut() {
    return fetch(url + 'logout.php')
      .then(handleResponse)
      .then(_ => window.location.reload(false))
  }
}