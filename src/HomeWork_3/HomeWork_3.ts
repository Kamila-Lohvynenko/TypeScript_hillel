// 1. Створіть інтерфейс, який описує структуру об'єкта,
// що представляє калькулятор.Калькулятор повинен мати методи
//  для виконання арифметичних операцій: додавання, віднімання,
// множення та ділення.Потім створіть функцію calculate, яка приймає
// об'єкт цього типу та виконує операцію і повертає результат.

interface ICalculator {
  a: number;
  b: number;

  sum(): number;
  difference(): number;
  product(): number;
  quotient(): number;
}

type OperationAlias = 'sum' | 'difference' | 'product' | 'quotient';

const obj: ICalculator = {
  a: 2,
  b: 3,

  sum(): number {
    return this.a + this.b;
  },
  difference() {
    return this.a - this.b;
  },
  product() {
    return this.a * this.b;
  },
  quotient() {
    return this.a / this.b;
  },
};

function calculate(obj: ICalculator, operation: OperationAlias): number {
  return obj[operation]();
}

console.log(calculate(obj, 'sum'));
console.log(calculate(obj, 'product'));

// 2. Уявіть, що ви створюєте інтерфейси для веб-сервісу,
//  який надає інформацію про книги.Створіть інтерфейси
// Book, Author, і BookService, які описують структуру даних книжок,
//     авторів і методи веб - сервісу для отримання інформації про
// книжки та авторів.Потім створіть об'єкт bookService, який імітує роботу
// веб - сервісу, і використовуйте інтерфейси для отримання інформації про книги та авторів.
//

interface IBook {
  name: string;
  author: IAuthor;
  chapters: Array<string>;
  pages: number;
}
interface IAuthor {
  name: string;
  lastName: string;
  books: Array<IBook>;
}
interface IBookService {
  books: Array<IBook>;
  authors: Array<IAuthor>;

  getBook(bookName: string): IBook | undefined;
  addBook(book: IBook): void;
  removeBook(book: string): void;

  getAuthor(authorName: string): IAuthor | undefined;
  addAuthor(author: IAuthor): void;
  removeAuthor(authorName: string, authorLastName: string): void;
  getBooksByAuthor(authorName: string, authorLastName: string): Array<IBook> | undefined;
}

const bookService: IBookService = {
  books: [],
  authors: [],

  getBook(bookName: string): IBook | undefined {
    return this.books.find(book => book.name === bookName);
  },
  addBook(book: IBook): void {
    this.books.push(book);
  },
  removeBook(bookName: string): void {
    this.books = this.books.filter(book => book.name !== bookName);
  },

  getAuthor(authorName: string): IAuthor | undefined {
    return this.authors.find(author => author.name === authorName);
  },
  addAuthor(author: IAuthor): void {
    this.authors.push(author);
  },
  removeAuthor(authorName: string, authorLastName: string): void {
    this.authors = this.authors.filter(author => author.name !== authorName && author.lastName !== authorLastName);
  },
  getBooksByAuthor(authorName: string, authorLastName: string): Array<IBook> | undefined {
    const selectedAuthor = this.authors.find(
      author => author.name === authorName && author.lastName === authorLastName
    );
    return selectedAuthor?.books;
  },
};
