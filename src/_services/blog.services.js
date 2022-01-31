// ${process.env.PUBLIC_URL}/backend/
// const url = `${process.env.PUBLIC_URL}/backend/`;
const url = '/backend/';

export default class blogService {
  static async blogposts(limit) {
    var data = '';
    if (typeof limit !== 'undefined') {
      data = '?limit='+limit;
    }
    return fetch(`${url}blogposts.php${data}`)
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  static async blogpost(id) {
    return fetch(`${url}blogpost.php?id=${id}`)
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  static async lazyBlogposts(offset = 0, limit = 1) {
    return fetch(`${url}lazyBlogposts.php?offset=${offset}&limit=${limit}`)
      .then(res => res.json())
      .catch(err => console.log(err))
  }
}