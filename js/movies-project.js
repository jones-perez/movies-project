//Timer for loading gif
setTimeout(function () {
    $('#loading').hide();
}, 1000);

let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}

let moviesArr = [];
const getMovies = () => {
    fetch("https://diagnostic-thirsty-ptarmigan.glitch.me/movies", getOptions)
        .then(resp => resp.json())
        .then(movies => {
            console.log(movies);
            moviesArr = movies.slice();
            let htmlStr = "";
            let htmlStr2 = "";
            for (let movie of moviesArr) {
                htmlStr = `${htmlStr}<h1>${movie.title.toUpperCase()}</h1><img src="${movie.poster}"> <p>Rating-${movie.rating}/5</p><p>${movie.genre}</p><p id="plot">${movie.plot}</p><button id="movieID${movie.id}" class="btn btn-danger" onclick = deleteMovie(${movie.id})>Delete Button</button>`
                htmlStr2 = `${htmlStr2}<option id="${movie.id}" value="${movie.id}">${movie.title}</option>`
            }
            $('#container').html(htmlStr)
            $('#movieChoice').html(htmlStr2)

        })
}
//USER ADD MOVIES

$("#addMovie").click(() => {
    let userMovie = $('#userMovieName').val();
    let userRating = $('#userMovieRating').val();
    let userGenre = $('#userMovieGenre').val();
    let userPlot = $('#userMoviePlot').val();
    let newMovie = {
        "title": userMovie,
        "rating": userRating,
        "genre": userGenre,
        "plot": userPlot
    };

    let postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    }
    fetch("https://diagnostic-thirsty-ptarmigan.glitch.me/movies", postOptions)
        .then(getMovies)
});


getMovies();

// EDIT MOVIES
$("#saveChanges").click(function (){
    let editedTitle = $("#editTitle").val();
    let editedRating = $("#editRating").val();
    let editedGenre = $("#editGenre").val();
    let editedPlot = $("#editPlot").val();


    let selectedVal = $("#movieChoice").val();
    console.log(selectedVal);

    let editedMovie = {
        "title": editedTitle,
        "rating": editedRating,
        "genre": editedGenre,
        "plot": editedPlot
    };

    let patchOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMovie),
    }

    fetch("https://diagnostic-thirsty-ptarmigan.glitch.me/movies", getOptions)
        .then(resp => resp.json())
        .then(movies => {
            console.log(movies);

    fetch(`https://diagnostic-thirsty-ptarmigan.glitch.me/movies/${selectedVal}`, patchOptions).then(getMovies);

    console.log(editedTitle);
    console.log(editedRating);
    console.log(editedGenre);
    console.log(editedPlot);

    // ending brackets for the then(movies =>) call
});


});

// Delete Movie Formula- The only way I could get this to work was to put "onclick" in the delete buttons via getMovie function. Need to get instruction as to why the click functions above would not work.
function deleteMovie(id) {
    let deleteOptions = {
        method: 'DELETE',
        Headers: {
            'Content-Type': 'application/json',
        }
    };
    fetch("https://diagnostic-thirsty-ptarmigan.glitch.me/movies/" + id, deleteOptions).then(getMovies)
}

// $('#movieChoice').change(function () {
//     let dropdownVal = $(this).val();
//     console.log(dropdownVal)
// });

//Poster Attempt--This works. Just need to drill down for poster
function movieSearch(movie) {
    $.ajax(`http://www.omdbapi.com/?apikey=${OMDB_TOKEN}&t=${movie}`).done(function (data) {
        console.log(data)
    })
}
movieSearch("scarface")