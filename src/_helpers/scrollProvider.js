export default class ScrollProvider {
  static _updatePosition() {
    this.position = window.scrollY;
  }

  static getPosition() {
    if (typeof this.position === 'undefined') {
      this.position = window.scrollY;
      window.addEventListener('scroll', ScrollProvider._updatePosition);
      window.addEventListener('resize', ScrollProvider._updatePosition);
    }
    return this.position;
  }

  static listener(func) {

  }
}