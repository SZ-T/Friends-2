document.querySelector("body").onload = function(){
    new InfiniteScroll("ajaxUsers.php", mode, token);
    
    // Check if bottom of table is visible on screen
    var observer = new IntersectionObserver(function(entries) {
        if(entries[0].isIntersecting && !load.isRunning)
        load.load();
    }, { threshold: [1] });
    
    observer.observe(document.querySelector("tfoot"));
}

class InfiniteScroll {
    constructor(url, mode, token) {
        globalThis.load = this;
        this.isRunning = true;
        this.table = document.querySelector("tbody");
        this.url = url;
        this.page = 1;
        this.search = '';
        this.sort = '';
        this.mode = mode;
        this.token = token;
        this.load();
        document.querySelector("tbody")
    }

    // Request next set of results from server
    load() {
        let url = load.url;
        let payload = {page:load.page,
                        search:load.search,
                        sort:load.sort,
                        mode:load.mode,
                        token:load.token}
        new AJAX(url, (res)=>{
            load.processResponse(res);
            searching = false;
        }, payload);
        load.page++;
    }

    // Restart infinite scroll when new search
    reset(search, sort){
        this.isRunning = true;
        this.search = search;
        this.sort = sort;
        this.table.innerText = '';
        this.page = 1;
        this.load();
    }

    // Create new table rows
    processResponse(response) {
        let temp = JSON.parse(response);
        temp.forEach(item => {
            let row = document.createElement("tr");
            row.id = "row-"+item['id'];
            let cell1 = document.createElement("td");
            let fig = document.createElement("figure");
            fig.classList.add("image");
            fig.classList.add("is-64x64");
            let img = document.createElement("img");
            img.classList.add("is-rounded");
            img.src = item['image'];
            fig.appendChild(img);
            cell1.appendChild(fig);
            row.appendChild(cell1);
            let cell2 = document.createElement("td");
            cell2.classList.add("is-vcentered");
            cell2.innerText = item['username'];
            row.appendChild(cell2);
            if(Object.keys(item).length != 3) {
                let cell3 = document.createElement("td");
                cell3.classList.add("is-vcentered");
                cell3.innerText = item['firstName'] + ' ' + item['lastName'];
                row.appendChild(cell3);
                let cell4 = document.createElement("td");
                cell4.classList.add("is-vcentered");
                cell4.appendChild(setButtons(item));
                row.appendChild(cell4);
            }
            load.table.appendChild(row);    
        })
        load.isRunning = false;
    }
}