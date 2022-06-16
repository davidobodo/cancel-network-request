// Variables
const input = document.querySelector("input");
const listWrapper = document.querySelector("ul");

/**
 * Returns the list of movies.
 *
 * @param {string} text The text to filter the movie database with.
 * @return {number} array of movie data.
 */
const handleGetMovies = async (text) => {
    try {
        const res = await axios.get(`https://api.punkapi.com/v2/beers?beer_name=${text}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

/**
 * Inserts movie list into the DOM.
 *
 * @param {array} list The array of movie data returned
 */
const handleDisplayMovies = (list) => {
    const listItems = list
        .map((item) => {
            return `<li>${item.name}</li>`;
        })
        .join("");

    listWrapper.innerHTML = listItems;
};

/**
 * Returnd a debounced function
 *
 * @param {function} func The function to delay its execution
 * @param {number} timer The amount of milliseconds to delay the function executation by
 */
const debounce = (func, timer) => {
    let timeId = null;
    return (fn) => {
        if (timeId) {
            clearTimeout(timeId);
        }
        timeId = setTimeout(() => {
            func(fn);
        }, timer);
    };
};

// Function to debounce
const onProcessInput = async (e) => {
    listWrapper.innerHTML = `<li>Loading...</li>`;
    const res = await handleGetMovies(e.target.value);
    handleDisplayMovies(res);
};

input.addEventListener(
    "input",
    debounce((e) => onProcessInput(e), 1000)
);
