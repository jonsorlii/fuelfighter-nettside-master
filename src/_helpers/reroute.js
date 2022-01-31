export default class reroute {
  static to(history, path) {
    history.push(path || '/');
  }

  static toParent(history, location) {
    let pathList = location.pathname.split('/');
    pathList.splice(-1, 1);
    let newPath = pathList.join('/');
    history.push(newPath);
  }
}