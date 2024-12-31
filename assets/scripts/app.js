const addMovieModal = document.getElementById("add-modal");
const startAddMovieBtn = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieBtn = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
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
const clearUserInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};
const toggleMovieModal = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackdrop();
};
const movieModalHandler = () => {
  toggleMovieModal();
};
const renderNewMovieElement = (title, imageUrl, rating) => {
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
  const list = document.getElementById("movie-list");
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
    title: titleValue,
    imageUrl: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(movie);
  console.log(movies);
  clearUserInputs();
  toggleMovieModal();
  renderNewMovieElement(movie.title, movie.imageUrl, movie.rating);
  updateUI();
};
const cancelAddMovie = () => {
  toggleMovieModal();
  clearUserInputs();
};
startAddMovieBtn.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", movieModalHandler);
cancelAddMovieBtn.addEventListener("click", cancelAddMovie);
confirmAddMovieBtn.addEventListener("click", addMovieHandler);
