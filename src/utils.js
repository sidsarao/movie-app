Array.prototype.keySort = function (keys) {
  keys = keys || {};

  const obLen = function (obj) {
    let size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  const obIx = function (obj, ix) {
    let size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (size === ix) return key;
        size++;
      }
    }
    return false;
  };

  const keySort = function (a, b, d) {
    d = d !== null ? d : 1;
    if (a === b) return 0;
    return a > b ? 1 * d : -1 * d;
  };

  const KL = obLen(keys);

  if (!KL) return this.sort(keySort);

  for (const k in keys) {
    keys[k] =
      keys[k] === "desc" || keys[k] === -1
        ? -1
        : keys[k] === "skip" || keys[k] === 0
        ? 0
        : 1;
  }

  this.sort(function (a, b) {
    let sorted = 0,
      ix = 0;

    while (sorted === 0 && ix < KL) {
      const k = obIx(keys, ix);
      if (k) {
        const dir = keys[k];
        sorted = keySort(a[k], b[k], dir);
        ix++;
      }
    }
    return sorted;
  });
  return this;
};

export const generateFetchMovieReqPayload = (movieTitle, n) =>
  [...new Array(n)].map((item, i) => ({ movieTitle, page: i + 1 }));

export const all = (items, fn) => {
  const promises = items.map((item) => fn(item));
  return Promise.all(promises);
};

export const series = (items, fn) => {
  let result = [];
  return items
    .reduce((acc, item) => {
      acc = acc.then(() => {
        return fn(item).then((res) => result.push(res));
      });
      return acc;
    }, Promise.resolve())
    .then(() => result);
};

export const splitToChunks = (items, chunkSize = 50) => {
  const result = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    result.push(items.slice(i, i + chunkSize));
  }
  return result;
};

export const chunks = (items, fn, chunkSize = 50) => {
  let result = [];
  const chunks = splitToChunks(items, chunkSize);
  return series(chunks, (chunk) => {
    return all(chunk, fn).then((res) => (result = result.concat(res)));
  }).then(() => result);
};

export const fetchMovies = ({ movieTitle, page }) => {
  const url = `http://www.omdbapi.com/?apikey=87ee28c1&s=${movieTitle}&type=movie&page=${page}`;
  return fetch(url);
};

export const fetchMovieTotalResults = async (movieTitle) => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=87ee28c1&s=${movieTitle}&type=movie`
  );
  return await response.json();
};

export const fetchMovieByImdbId = async (movieId) => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=87ee28c1&i=${movieId}`
  );
  return await response.json();
};
