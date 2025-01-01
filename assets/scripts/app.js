const addMovieModal = document.getElementById("add-modal");
const startAddMovieBtn = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieBtn = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const list = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");
const movies = [];
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};
const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};
const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};
const clearUserInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};
const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};
const backdropClickHandler = () => {
  closeMovieModal();
  // toggleBackdrop();
  cancelMovieDeletion();
};
const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  list.children[movieIndex].remove();
  updateUI();
};
const closeDeletionModal = () => {
  deleteMovieModal.classList.remove("visible");
  toggleBackdrop();
};
const cancelMovieDeletion = () => {
  closeDeletionModal();
};
const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  const cancelDeleteButton = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeleteButton = deleteMovieModal.querySelector(".btn--danger");
  confirmDeleteButton.replaceWith(confirmDeleteButton.cloneNode(true));
  cancelDeleteButton.removeEventListener("click", cancelMovieDeletion);
  confirmDeleteButton.removeEventListener(
    "click",
    deleteMovie.bind(null, movieId)
  );
  confirmDeleteButton = deleteMovieModal.querySelector(".btn--danger");
  cancelDeleteButton.addEventListener("click", cancelMovieDeletion);
  confirmDeleteButton.addEventListener("click", () => {
    deleteMovie(movieId);
    closeDeletionModal();
  });
};
const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
      </div>  
      <div class="movie-element__info">
      <h2>${title}</h2>
        <p>${rating}/5 stars</p>
        </div>
        `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));

  list.append(newMovieElement);
};
const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    parseInt(ratingValue) < 1 ||
    parseInt(ratingValue) > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5).");
    return;
  }
  const movie = {
    id: Math.random().toString(),
    title: titleValue,
    imageUrl: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(movie);
  console.log(movies);
  clearUserInputs();
  closeMovieModal();
  toggleBackdrop();
  renderNewMovieElement(movie.id, movie.title, movie.imageUrl, movie.rating);
  updateUI();
};
const cancelAddMovie = () => {
  closeMovieModal();
  toggleBackdrop();
  clearUserInputs();
};
startAddMovieBtn.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieBtn.addEventListener("click", cancelAddMovie);
confirmAddMovieBtn.addEventListener("click", addMovieHandler);
