import { fetch } from 'whatwg-fetch';

const url = '/backend/instagram/';

export default class instagramService {
  static async posts() {
    return fetch(`${url}instagram_posts.php`)
      .then((data) => data.json());
  }
}