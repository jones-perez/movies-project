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
                // htmlStr += "<div class='card'>";
                htmlStr = `${htmlStr}<h1>${movie.title.toUpperCase()}</h1><img id="movieID${movie.id}" alt="..." src="${movie.poster}"> <p>Rating-${movie.rating}/5</p><p>${movie.genre}</p><p id="plot">${movie.plot}</p><button id="movieID${movie.id}" class="btn btn-danger" onclick = deleteMovie(${movie.id})>Delete Button</button>`
                htmlStr2 = `${htmlStr2}<option id="${movie.id}" value="${movie.id}">${movie.title}</option>`
                htmlStr += "</div>"

            }
            $('#container').html(htmlStr)
            $('#movieChoice').html(htmlStr2)


            const userSearchVal = $("form").submit(function (event) {
                event.preventDefault();
                let info = $("#searchInput").val();
                let hasMovie = false
                moviesArr.forEach(function (movie) {
                    if (movie.title.toLowerCase().includes(info)) { //code for searching through coffee object. Event listener is on line 50.
                        console.log(movie.id);

                        let id = movie.title.toLowerCase().includes(info)

                        location.replace("#movieID" + movie.id + "");
                        hasMovie = true
                    }
                });

                if (!hasMovie){
                    var confirmed = confirm("Unfortunately we do not have that movie at this time, would you like to add it?");
                    if (confirmed === true){
                        location.replace("#addTheMovie");
                    }
                }
            });
        });
}


//USER ADD MOVIES

$("#addMovie").click(() => {
    let userMovie = $('#userMovieName').val();
    let userRating = $('#userMovieRating').val();
    let userGenre = $('#userMovieGenre').val();
    let userPlot = $('#userMoviePlot').val();
    $.ajax(`http://www.omdbapi.com/?apikey=${OMDB_TOKEN}&t=${userMovie}`).done(function (data) {
           let userPoster = data.Poster;
        console.log(userPoster);


    let newMovie = {
        "title": userMovie,
        "rating": userRating,
        "genre": userGenre,
        "plot": userPlot,
        "poster": userPoster
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

});
getMovies();

// EDIT MOVIES
$("#saveChanges").click(function () {
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

function deleteMovie(id) {
    let deleteOptions = {
        method: 'DELETE',
        Headers: {
            'Content-Type': 'application/json',
        }
    };
    fetch("https://diagnostic-thirsty-ptarmigan.glitch.me/movies/" + id, deleteOptions).then(getMovies)
}


    const userinputVal = $("form").submit(function (event){
    let info = $("#searchInput").val();
    console.log(info);
});


function movieSearch(movie) {
    $.ajax(`http://www.omdbapi.com/?apikey=${OMDB_TOKEN}&t=${movie}`).done(function (data) {
        let title = data.title
        let userSearch = $("#searchInput").data;

        console.log(data.Title)
        console.log(userSearch);

    })
}

