export default class HolbertonCourse {
  constructor(name, length, students) {
    this.constructor.checkPropertiesType(name, length, students);
    this._name = name;
    this._length = length;
    this._students = students;
  }

  static checkPropertiesType(name = null, length = null, students = null) {
    if (name !== null && typeof name !== 'string') {
      throw TypeError('Name must be a string');
    }
    if (length !== null && typeof length !== 'number') {
      throw TypeError('Length must be a number');
    }
    if (students !== null) {
      if (Array.isArray(students)) {
        for (const student of students) {
          if (typeof student !== 'string') {
            throw TypeError('Students must be an array of strings');
          }
        }
      } else {
        throw TypeError('Students must be an array of strings');
      }
    }
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this.constructor.checkPropertiesType(name);
    this._name = name;
  }

  get length() {
    return this._length;
  }

  set length(length) {
    this.constructor.checkPropertiesType(null, length);
    this._length = length;
  }

  get students() {
    return this._students;
  }

  set students(students) {
    this.constructor.checkPropertiesType(null, null, students);
    this._students = students;
  }
}
