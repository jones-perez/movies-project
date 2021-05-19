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
const getMovies = () => {
    fetch("https://diagnostic-thirsty-ptarmigan.glitch.me/movies", getOptions)
        .then(resp => resp.json())
        .then(movies => {
            console.log(movies);
            let htmlStr = "";
            for (let movie of movies) {
                htmlStr = `${htmlStr}<h1>${movie.title.toUpperCase()}</h1><p>Rating-${movie.rating}/5</p><p>${movie.genre}</p><p id="plot">${movie.plot}</p>`
            }
            $('#container').html(htmlStr)

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

$(".edit").click(function (){
    prompt("hello");
});



$("#saveChanges").click(function (){
    let editedTitle = $("#editTitle").val();
    let editedRating = $("#editRating").val();
    let editedGenre = $("#editGenre").val();
    let editedPlot = $("#editPlot").val();


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

    $('#movieChoice').change(function () {
        let dropdownVal = $(this).val();
        console.log(dropdownVal)
    });

    let inputVal = $("#movieChoice").val().toLowerCase();
console.log(inputVal.toLowerCase());


    fetch("https://diagnostic-thirsty-ptarmigan.glitch.me/movies", getOptions)
        .then(resp => resp.json())
        .then(movies => {
            console.log(movies);
// let lowercaseMovies = movies.toLowerCase();
//  need to define movies and make all to lowercase/uppercase to properly get the index of it so i can plug it into the inputval
let inputIndex = inputVal.indexOf(inputVal);
console.log(inputIndex);

    fetch(`https://diagnostic-thirsty-ptarmigan.glitch.me/movies/${inputVal}`, patchOptions).then(getMovies);

    console.log(editedTitle);
    console.log(editedRating);
    console.log(editedGenre);
    console.log(editedPlot);

    // ending brackets for the then(movies =>) call
});


});


// $('#movieChoice').change(function () {
//     let dropdownVal = $(this).val();
//     console.log(dropdownVal)
// });

