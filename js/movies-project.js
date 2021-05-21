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
                htmlStr = `${htmlStr}<h1>${movie.title.toUpperCase()}</h1><img alt="..." src="${movie.poster}"> <p>Rating-${movie.rating}/5</p><p>${movie.genre}</p><p id="plot">${movie.plot}</p><button id="movieID${movie.id}" class="btn btn-danger" onclick = deleteMovie(${movie.id})>Delete Button</button>`
                htmlStr2 = `${htmlStr2}<option id="${movie.id}" value="${movie.id}">${movie.title}</option>`
                htmlStr += "</div>"
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
// const getMoviesposter = (movie) => {
//     fetch(`http://www.omdbapi.com/?apikey=${OMDB_TOKEN}&t=${movie}`, getOptions)
//         .then(resp => resp.json())
//         .then(moviesposter => {
//             console.log(moviesposter);
//             let htmlStr = "";
//             for (let movieposters of movie) {
//                 htmlStr = `${htmlStr} <img src="${movie.poster}">`
//             }
//             $('#postertest').html(htmlStr)
//         })
// }

// getMoviesposter("scarface")


// function movieSearch(movie) {
//     $.ajax(`http://www.omdbapi.com/?apikey=${OMDB_TOKEN}&t=${movie}`).done(function (data) {
//         console.log(data)
//         var movieSearchPoster = data.Poster
//         $('#postertest').html(`<img src=${movieSearchPoster}>`)
//     })
// }
//
// movieSearch("halloween")
//
//
// $("form").submit(function( event ) {
//     alert( "Form submitted" );
// });
// This works and pulls the user input on submit
    const userinputVal = $("form").submit(function (event){
    let info = $("#searchInput").val();
    console.log(info);
});

// info grabs the user input, but title needs to grab the titles from the movie arrays and compare them, that way i can create an link to the movie or alert the user we do not have it but link them to the add a movie section
// let usersInput = moviesArr.map(function (user){
//     title = user.title;
//     return title;
// });

// let title = moviesArr.map(movie => movie.title);
// console.log(title);
// console.log(moviesArr);


// console.log(usersInput);


//current issue is i cannot get the moviesarray copy to properly display the movie list as it does in the original, if i can get that to work i
// can then plug into the search bar function properly so that it alerts the user if we do have it and link
// them to that part of the page or if we dont have it and it links them to the edit part of the page

// function i want to work

// const userSearchVal = $("form").submit(function (event){
//     let info = $("#searchInput").val();
//     //let title is above this, trying to map the array but its empty because its a copy not the original movie array
//     if (info === title ){
//         alert("We do have this movie! *insert link to it*");
//     } else {
//         alert("No unfortunately we do not, would you like to add it? *insert link to the add movie section*")
//     }
//     console.log(title)
//     console.log(moviesArr);
//     console.log(info);
//
// });




function movieSearch(movie) {
    $.ajax(`http://www.omdbapi.com/?apikey=${OMDB_TOKEN}&t=${movie}`).done(function (data) {
        let title = data.title
        let userSearch = $("#searchInput").data;
        // one of these two, need to get search button to submit data on search
        // let userSearch = $("#searchInput").data;

        console.log(data.Title)
        console.log(userSearch);
        //
        // var movieSearchPoster = data.Poster
        // $('#postertest').html(`<img src=${movieSearchPoster}>`)
    })
}


// instead of halloween add the user input from the search bar
movieSearch("halloween")


