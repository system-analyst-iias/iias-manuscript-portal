import booksData from './booksData.json';

const BASE = import.meta.env.BASE_URL;

export const manuscripts = booksData.map((book) => ({
  ...book,
  coverImage: `${BASE}books/${book.id}/${book.pages[0]}`,
  pageUrls: book.pages.map((p) => `${BASE}books/${book.id}/${p}`),
}));

export default manuscripts;
