// Вам потрібно створити тип DeepReadonly який буде робити
// доступними тільки для читання навіть властивості вкладених обʼєктів.
type DeepReadonly<T> = {
  +readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
//
// Вам потрібно створити тип DeepRequireReadonly який буде
// робити доступними тільки для читання навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.
type DeepRequireReadonly<T> = {
  +readonly [K in keyof T]-?: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
//
// Вам потрібно створити тип UpperCaseKeys, який буде
// приводити всі ключі до верхнього регістру.
type user = {
  name: string;
  age: number;
};
type toUpperCase<T extends string> = `${Uppercase<T>}`;
type UpperCaseKeys<T> = {
  [K in keyof T & string as toUpperCase<K>]: T[K];
};
type userUpperCase = UpperCaseKeys<user>;
//
// І саме цікаве. Створіть тип ObjectToPropertyDescriptor,
//  який перетворює звичайний обʼєкт на обʼєкт де кожне value є дескриптором.

type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: { value: T[K]; writable: boolean; enumerable: boolean; configurable: boolean };
};

type userPropertyDescriptor = ObjectToPropertyDescriptor<user>;
