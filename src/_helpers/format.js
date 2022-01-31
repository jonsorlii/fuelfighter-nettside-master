export default class Format {
  static date(milliseconds) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Descember"];
    var date = new Date(+milliseconds);
		var formattedDate = `${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`;
		return formattedDate;
  }
}