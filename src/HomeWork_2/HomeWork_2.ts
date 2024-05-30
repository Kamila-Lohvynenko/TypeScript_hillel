type LecturerAlias = {
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: string;
  courses: Array<string>;
  contacts: { phone?: number; email?: string };
};
type GradesAlias = {
  math?: number;
  geography?: number;
  literature?: number;
};
type workNameAlias = 'math' | 'geography' | 'literature';

class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
  _areas: Array<Area> = [];
  _lecturers: Array<LecturerAlias> = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Array<Area> {
    return this._areas;
  }
  addArea(area: Area): void {
    this._areas.push(area);
  }
  removeArea(areaName: string): void {
    this._areas = this._areas.filter((area: Area) => area.name !== areaName);
  }

  get lecturers(): Array<LecturerAlias> {
    return this._lecturers;
  }
  addLecturer(lecturer: LecturerAlias): void {
    this._lecturers.push(lecturer);
  }
  removeLecturer(name: string, surname: string) {
    this._lecturers = this._lecturers.filter(lecturer => lecturer.name !== name && lecturer.surname !== surname);
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: Array<Level> = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }
  get levels(): Array<Level> {
    return this._levels;
  }
  get name(): string {
    return this._name;
  }
  addLevel(newLevel: Level): void {
    this._levels.push(newLevel);
  }
  removeLevel(name: string): void {
    this._levels = this._levels.filter((level: Level) => level.name !== name);
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: Array<Group> = [];
  _name: string;
  _description: string;

  get groups(): Array<Group> {
    return this._groups;
  }
  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  addGroup(newGroup: Group): void {
    this._groups.push(newGroup);
  }
  removeGroup(directionName: string, levelName: string): void {
    this._groups = this._groups.filter(
      (group: Group) => group.directionName !== directionName && group.levelName !== levelName
    );
  }

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods
  directionName: string;
  levelName: string;
  _area: string = '';
  _status: string = '';
  _students: Array<Student> = []; // Modify the array so that it has a valid toSorted method*

  constructor(directionName: string, levelName: string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }
  get status(): string {
    return this._status;
  }
  set status(status: string) {
    this._status = status;
  }
  get students(): Array<Student> {
    return this._students;
  }
  set area(area: string) {
    this._area = area;
  }
  get area(): string {
    return this._area;
  }
  addStudent(newStudent: Student): void {
    this._students.push(newStudent);
  }
  removeStudent(fullName: string): void {
    this._students = this._students.filter((student: Student) => student.fullName !== fullName);
  }

  showPerformance(): Array<Student> {
    const sortedStudents: Array<Student> = this._students.sort(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
    );
    return sortedStudents;
  }
}

class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: GradesAlias = {}; // workName: mark
  _visits: Array<boolean> = []; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }
  set grades(param: { workName: workNameAlias; mark: number }) {
    this._grades[param.workName] = param.mark;
  }
  set visits(present: boolean) {
    this._visits.push(present);
  }
  getPerformanceRating(): number {
    const gradeValues: Array<number> = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade: number = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage: number =
      (this._visits.filter((present: boolean) => present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
