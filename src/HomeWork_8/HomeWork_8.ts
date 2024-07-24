// Вам необхідно написати додаток Todo list. У списку нотаток повинні
// бути методи для додавання нового запису, видалення, редагування та
// отримання повної інформації про нотатку за ідентифікатором, а так само
//  отримання списку всіх нотаток.Крім цього, у користувача має бути
// можливість позначити нотаток, як виконаний, і отримання інформації про те,
//  скільки всього нотаток у списку і скільки залишилося невиконаними.Нотатки не повинні бути порожніми.
// Кожний нотаток має назву, зміст, дату створення і редагування та статус.
// Нотатки бувають двох типів.Дефолтні та такі, які вимагають підтвердження при ридагуванні.
// Окремо необхідно розширити поведінку списку та додати можливість пошуку нотатка за ім'ям або змістом.
// Також окремо необхідно розширити список можливістю сортування нотаток за статусом або часом створення.

type NoteData = {
  name: string;
  text: string;
};

class Note {
  public name: string;
  public text: string;
  public isCompleted: boolean = false;
  public readonly createDate: Date;
  public editDate: Date;
  public isDefault: boolean = true;
  public readonly id: number;
  constructor(data: NoteData) {
    this.name = data.name;
    this.text = data.text;
    this.createDate = new Date();
    this.editDate = new Date();
    this.id = Date.now();
  }
}
class ProtectedNote extends Note {
  public override isDefault: boolean = false;
  constructor(data: NoteData) {
    super(data);
  }
}

class ToDoList {
  protected _list: Note[] = [];
  public addNote(newNote: Note): void {
    this.list.push(newNote);
  }
  public removeNote(id: number): void {
    this._list = this._list.filter(note => note.id !== id);
  }
  public getNoteInfo(id: number): Note | undefined {
    return this._list.find(note => note.id === id);
  }
  public editNote(id: number, newData: NoteData): void {
    const note = this._list.find(note => note.id === id);
    if (note) {
      if (note.isDefault) {
        note.name = newData.name;
        note.text = newData.text;
        note.editDate = new Date();
      } else {
        console.log('Here should be a requirement for confirmation');
      }
    }
  }
  public get list(): Note[] {
    return this._list;
  }
  public makeCompleted(id: number): void {
    const note = this._list.find(note => note.id === id);
    if (note) {
      note.isCompleted = true;
    }
  }
  public getListStatistic(): string {
    const completedNotes: Note[] = this._list.filter(note => !note.isCompleted);
    return `You have ${this._list.length} tasks, ${completedNotes.length} of them have not been completed yet`;
  }

  public findByName(name: string): Note[] {
    return this._list.filter(note => note.name.toLowerCase().includes(name.toLowerCase()));
  }

  public findByText(text: string): Note[] {
    return this._list.filter(note => note.text.toLowerCase().includes(text.toLowerCase()));
  }
}

class SortableByStatusList extends ToDoList {
  public sortByStatus(status: boolean): Note[] {
    return this._list.filter(note => note.isCompleted === status);
  }
}
class SortableByDateList extends ToDoList {
  public sortByDate(): Note[] {
    return this._list.sort((a, b) => a.createDate.getTime() - b.createDate.getTime());
  }
}
