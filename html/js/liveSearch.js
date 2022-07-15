// Only allow one search request at a time
var searching = false;

// On search bar input
document.querySelector("#search").addEventListener("keyup", () => {
    if(!searching){
        searching = true;
        let term = document.querySelector("#search");
        let sort = document.querySelector("#sort");
        if(sort == null) {
            sort = '';
        }
        load.reset(term.value, sort.value);
    }
});

// On sort box change
document.querySelector("#sort").addEventListener("change", () => {
    if(!searching){
        searching = true;
        let term = document.querySelector("#search");
        let sort = document.querySelector("#sort");
        load.reset(term.value, sort.value);
    }
});