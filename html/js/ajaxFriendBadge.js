class FriendBadge {

    constructor() {
        this.isRunning = false;
        globalThis.friendBadge = this;
        this.badge = document.querySelectorAll('.badge');
        this.load();
        setInterval(function(){
            if(!friendBadge.isRunning) {
                friendBadge.load()
            }
        }, 5000);
    }

    // Retrieve number of friends pending
    load() {
        friendBadge.isRunning = true;
        let url = 'ajaxFriendBadge.php';
        new AJAX(url, (res)=>{
            friendBadge.processResponse(res);
        });
    }

    // Update badge number
    processResponse(response) {
        this.badge.forEach(item => {
            if (response == 0) {
                item.hidden = true;
            } else {
                item.hidden = false;
                item.innerText = response;
            }
        });
        friendBadge.isRunning = false;
    }
}

new FriendBadge();