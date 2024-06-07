// Визначте інтерфейс, який використовує сигнатуру індексу з типами
//  об'єднання. Наприклад, тип значення для кожного ключа може бути число | рядок.
interface Identifier {
  [key: string]: string | number;
}
//
// Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями.
// Ключами можуть бути рядки, а значеннями — функції, які приймають будь - які аргументи.
interface IFunctions {
  [key: string]: (...rest: Array<unknown>) => unknown;
}
//
// Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта,
//  подібного до масиву.Ключі повинні бути числами, а значення - певного типу.
interface IObject {
  [key: number]: string;
}
//
// Створіть інтерфейс з певними властивостями та індексною сигнатурою. Наприклад,
//  ви можете мати властивості типу name: string та індексну сигнатуру для додаткових динамічних властивостей.
interface IValues {
  [key: string]: (() => string) | string;
  [key: number]: string;

  name: string;
  surname: string;
}
//
// Створіть два інтерфейси, один з індексною сигнатурою, а інший розширює перший, додаючи специфічні властивості.
interface Identifier1 {
  [key: string]: string | ((a: number, b: number) => number) | number;
}
interface Identifier2 extends Identifier1 {
  currentYear: number;
  birthYear: number;

  age(a: number, b: number): number;
}
//
// Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє,
// чи відповідають значення певних ключів певним критеріям(наприклад, чи всі значення є числами).
interface Object {
  [key: string]: string | number;
}
const user: Object = {
  name: 'Alex',
  age: 20,
  birthYear: 2000,
};

function checkValue(obj: Object): string {
  return `${obj.name}.age is number - ${Number.isFinite(obj.age)}, ${obj.name}.birthYear is number - ${Number.isFinite(
    obj.birthYear
  )}`;
}

console.log(checkValue(user));
