import { Component } from 'react';
import { fetch } from 'whatwg-fetch';

import handleResponse from '../_helpers/handleResponse';

// const url = `${process.env.PUBLIC_URL}/backend/admin/blog/`;
const url = '/backend/admin/blog/';

export default class blogService extends Component {
  static async getBlogposts(limit) {
    return fetch(`${url}blogposts.php${limit !== undefined ? `?limit=${limit}` : ''}`)
      .then(handleResponse);
  }

  static async getBlogpost(id) {
    return fetch(`${url}blogpost.php?id=${id}`)
      .then(handleResponse)
  }

  static async updateBlog(json) {
    return fetch(`${url}updateBlogpost.php`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(json)
    })
      .then(handleResponse)
      .then(res => {
        if (typeof res.success !== 'undefined' && res.success === true) {
          alert('Blogpost updated');
        } else {
          alert('Failed to update');
          console.log(res);
        }
      })
  }

  static async deleteBlog(id) {
    return fetch(`${url}deleteBlogpost.php?id=${id}`)
      .then(handleResponse)
  }

  static async newBlog() {
    return fetch(`${url}newBlogpost.php`)
      .then(handleResponse)
      .then(val => {
        if (val.blogpostId !== null && val.blogpostId > 0) {
          return val.blogpostId;
        }
      })
  }
}