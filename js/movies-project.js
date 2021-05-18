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
                htmlStr = `${htmlStr}<h1>${movie.title}</h1><p></p>`
            }
            $('#container').html(htmlStr)
        })
}
getMovies();