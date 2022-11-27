class Util {
  array = [];
  title = "";
  fileFormat = "";

  constructor(title, array) {
    this.title = title;
    this.array = array;
  }

  convertArrayToText() {
    let temp = getTitle() + "\n";
    for (link in getArray()) {
      temp += link + "\n";
    }

    return temp;
  }

  getFileFormat() {
    return this.fileFormat;
  }

  setFileFormat(fileFormat) {
    this.fileFormat = fileFormat;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }

  getArray() {
    return this.array;
  }

  setArray(array) {
    this.array = array;
  }

  toString() {
    return this.title + this.array.toString();
  }
}
