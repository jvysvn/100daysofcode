let movieNameRef = document.getElementById('movie-name');
let searchButton = document.getElementById('search-btn');
let result = document.getElementById('result');

// Fetch data from API

let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  // If input field is empty

  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class='msg'>Please enter a movie name </h3>`;
  }

  //   If input field is not empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Response == 'True') {
          console.log(data);
          result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="star-icon.svg">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(',').join(
                              '</div><div>'
                            )}</div>
                        </div>
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                        <h3>Cast:</h3>
                        <p>${data.Actors}</p>
            `;
        }

        // If movie doesn't exist in database
        else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })

      //   If Error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
      });
  }
};

searchButton.addEventListener('click', getMovie);
window.addEventListener('load', getMovie);
