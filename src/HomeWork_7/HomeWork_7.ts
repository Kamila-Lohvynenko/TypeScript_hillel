// У вас є дві сутності - список фільмів і список категорій фільмів.

// Кожен фільм містить поля: назва, рік випуску, рейтинг, список нагород.

// Категорія містить поля: назва і фільми.

// У кожного списку є пошук за ім'ям (це, по суті, фільтрація),
//  у списку фільмів є додаткова фільтрація за роком випуску, рейтингом і нагородами.

// У нас визначено три типи фільтрів:

// Фільтр відповідності має поле filter
// Фільтр діапазону має поле filter і filterTo
// Фільтр пошуку за значеннями має поле values
// Кожен список містить стан його фільтрів, який може бути змінений
// тільки методом applySearchValue або applyFiltersValue(за наявності додаткових фільтрів)

// Вам необхідно подумати про поділ вашого коду на різні сутності, інтерфеси і
// типи, щоб зробити ваше рішення типобезпечним.Реалізація всіх методів не є необхідною - це за бажанням.

interface ICategoriesList {
  [key: string]: Movie[];
}
interface IFiltersState {
  matchFilter: {
    filter: string | number;
  };
  diapasonFilter?: {
    filter: number;
    filterTo: number;
  };
  valuesFilter?: {
    values: string;
  };
}

class MovieList {
  list: Movie[] = [];
  filtersState: IFiltersState = {
    matchFilter: {
      filter: '',
    },
    diapasonFilter: {
      filter: 0,
      filterTo: Infinity,
    },
    valuesFilter: {
      values: '',
    },
  };
  applyMatchFilterValue(filter: string): void {
    this.filtersState.matchFilter.filter = filter;
  }
  applyDiapasonFilter(filter: number, filterTo: number): void {
    if (this.filtersState.diapasonFilter) {
      this.filtersState.diapasonFilter.filter = filter;
      this.filtersState.diapasonFilter.filterTo = filterTo;
    }
  }
  applyValuesFilter(value: string): void {
    if (this.filtersState.valuesFilter) {
      this.filtersState.valuesFilter.values = value;
    }
  }
  searchMovieByName(): Movie[] {
    const filter = this.filtersState.matchFilter.filter;
    return this.list.filter(movie => movie.name === filter);
  }
  searchMovieByYear(): Movie[] {
    const filter = this.filtersState.matchFilter.filter;
    return this.list.filter(movie => movie.year === filter);
  }
  searchMovieByRating(): Movie[] {
    const filter = this.filtersState.matchFilter.filter;
    return this.list.filter(movie => movie.rating === filter);
  }
  searchMovieByAward(): Movie[] | undefined {
    const filter = this.filtersState.matchFilter.filter;
    if (typeof filter === 'string') {
      return this.list.filter(movie => movie.awards.includes(filter));
    } else return undefined;
  }
  searchMoviesByRatingDiapason(): Movie[] {
    const filter = this.filtersState.diapasonFilter!.filter;
    const filterTo = this.filtersState.diapasonFilter!.filterTo;
    return this.list.filter(movie => movie.rating >= filter && movie.rating <= filterTo);
  }
}
class CategoriesList {
  list: ICategoriesList = {};
  filtersState: IFiltersState = {
    matchFilter: {
      filter: '',
    },
  };
  applyFilterValue(categoryName: string): void {
    this.filtersState.matchFilter.filter = categoryName;
  }
  findMovies(): Movie[] | undefined {
    const filter = this.filtersState.matchFilter.filter;
    return this.list[filter];
  }
}
class Movie {
  name: string;
  #year: number = 0;
  #rating: number = 0;
  awards: string[] = [];
  constructor(name: string) {
    this.name = name;
  }
  public set year(year: number) {
    this.#year = year;
  }
  public get year(): number {
    return this.#year;
  }

  public set rating(rating: number) {
    this.#rating = rating;
  }

  public get rating(): number {
    return this.#rating;
  }
  addAward(award: string): void {
    this.awards.push(award);
  }
}
