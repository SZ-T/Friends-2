class Pointers {

    constructor(token) {
        globalThis.pointers = this;
        this.isRunning = false;
        this.locations = Array();
        this.token = token;
        this.loadLocations();
        setInterval(function(){
            if(!pointers.isRunning) {
                pointers.loadLocations()
            }
        }, 5000);
    }

    // Fetch updated friends locations
    loadLocations() {
        pointers.isRunning = true;
        let url = 'ajaxFriendsLocation.php';
        let payload = {token:pointers.token}
        new AJAX(url, (res)=>{
            pointers.processResponse(res);
        }, payload);
    }

    // Update position of pointers
    processResponse(response) {
        let locationsTemp = JSON.parse(response);
        locationsTemp.forEach(location => {
            if('p'+location['id'] in pointers.locations) {
                pointers.locations['p'+location['id']].movePointer([location['longitude'], location['latitude']]);
            } else {
                // If own pointer
                if(location['id'] == 'me') {
                    pointers.locations['pme'] = new Pointer('Me', location['image'], [location['longitude'], location['latitude']], 'selfPointer.svg');
                }
                else {
                    pointers.locations['p'+location['id']] = new Pointer(location['username'], location['image'], [location['longitude'], location['latitude']]);
                }
            }
        });
        pointers.isRunning = false;
    }

    // Display all pointers on map
    showAll() {
        for(let key in pointers.locations){
            pointers.locations[key].setVisible(true);
        }
        let buttons = document.querySelectorAll(".pin");
        buttons.forEach(button => {
            button.src = globalThis.pin;
        })
    }

    // Hide all pointers on map
    hideAll() {
        for(let key in pointers.locations){
            pointers.locations[key].setVisible(false);
        }
        pointers.locations['pme'].setVisible(true);
        let buttons = document.querySelectorAll(".pin");
        buttons.forEach(button => {
            button.src = globalThis.pin_o;
        })
    }
}