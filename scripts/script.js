// Global variables
const filterElements = document.getElementsByName("movie-filter");

// Functions
// Filter on movie title
const filterOnTiltle = (titleFilter) => {
  const filterdMovies = movies.filter((movie) => {
    if (
      movie.Title.toLocaleLowerCase().includes(titleFilter.toLocaleLowerCase())
    ) {
      return movie;
    }
  });
  return filterdMovies;
};

// Filter on movie year (everything from 2014 and later)
const filterOnYear = () => {
  const filterdMovies = movies.filter((movie) => {
    if (parseInt(movie.Year) >= 2014) {
      return movie;
    }
  });
  return filterdMovies;
};

// Create the HTML elements with attributes (li - a - img)
const createHTML = (movie) => {
  const newLi = document.createElement("li");
  const newA = document.createElement("a");
  const newImg = document.createElement("img");
  // set HTML attributes
  newA.setAttribute("href", "https://www.imdb.com/title/" + movie.imdbID);
  newImg.setAttribute("src", movie.Poster);
  // adding the elements to the li element
  newLi.appendChild(newA).appendChild(newImg);
  return newLi;
};

// Add movielist to the DOM
const addMoviesToDom = (movies, filterValue) => {
  const movielist = document.getElementById("movielist");
  // create an array of the HTML elements from all the filtered movies
  const moviesToAdd = movies.map((movie) => {
    const newHTML = createHTML(movie);
    return newHTML;
  });
  //  clear the DOM, checked input buttons and the textinput field
  movielist.innerHTML = "";
  document.querySelector('input[type="text"]').value = "";
  filterElements.forEach((element) => {
    if (element.value != filterValue) {
      element.checked = false;
    }
  });
  //Check moviesToAdd array length, if 0 (no matching movies for search value) add messages, otherwise add array to the DOM
  if (moviesToAdd.length === 0) {
    movielist.innerHTML = `<p>Sorry we hebben niks gevonden met "${filterValue}" als zoekterm.</p>`;
  } else {
    moviesToAdd.forEach((element) => {
      movielist.appendChild(element);
    });
  }
};

// Event handler
const handleEvent = (event) => {
  switch (event.target.value) {
    case "latest-movies":
      addMoviesToDom(filterOnYear(), event.target.value);
      break;
    default:
      addMoviesToDom(filterOnTiltle(event.target.value), event.target.value);
      break;
  }
};

// Eventlistners for filter radio buttons
const addEventListeners = () => {
  filterElements.forEach((element) => {
    element.addEventListener("change", handleEvent);
  });
};

// extra option to show all the movies from the database when you click the website title
const showAllMovies = document.querySelectorAll(".showall");
Array.from(showAllMovies);
showAllMovies.forEach((element) => {
  element.addEventListener("click", () => {
    addMoviesToDom(movies);
  });
});

// Load eventlistners on page load
addEventListeners();

// Show all the movies on first page load
addMoviesToDom(movies);
