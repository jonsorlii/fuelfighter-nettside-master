import {fetch} from 'whatwg-fetch';

// const url = `${process.env.PUBLIC_URL}/backend/team/`;
const url = '/backend/team/';

export default class teamService {
  static async team(year, number) {
    return fetch(`${url}team.php?&number=${number}${year !== null ? '&year='+year : ''}`)
      .then(data => data.json());
  }

  static async allYears() {
    return fetch(`${url}all_years.php`)
      .then(data => data.json());
  }
}