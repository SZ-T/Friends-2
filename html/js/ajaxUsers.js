// Send friendship requests
function sendRequest(type, item, outcome) {
    let url = 'ajax/ajaxRequests.php';
    let payload = {token:globalThis.token,
                    id:item['id'],
                    action:type}
    new AJAX(url, ()=>{
        // Edit page one button press is sent
        resetButtons(item, outcome);
    }, payload);
}

// Function to edit the page
function resetButtons(item, outcome) {
    let row = document.querySelector("#row-"+item['id']);
    let cell = row.lastChild;
    cell.innerHTML = '';
    item['status'] = outcome;
    cell.appendChild(setButtons(item));
    // If Friend Request page then just remove row
    if (location.pathname.split('?')[0] == '/friendRequests.php') {
        row.remove();
    }
    // If Friend page then just remove row, hide and remove pointer
    if (location.pathname.split('?')[0] == '/friends.php') {
        row.remove();
        pointers.locations['p'+item['id']].setVisible(false);
        delete pointers.locations['p'+item['id']];
    }
    return cell;
}

// Function to choose correct new button
function setButtons(item) {
    let div = document.createElement("div");
    if(item["status"] == "Accepted" || item["status"] == "Pending") {
        if (item["status"] == "Accepted") {
            if (location.pathname.split('?')[0] === "/friends.php") {
                div.appendChild(mapButtons1(item));
                div.appendChild(mapButtons2(item));
            } else {
                div.appendChild(unfriendButtons(item, "Unfriend"));
            }
        } else {
            div.appendChild(pendingButtons(item));
        }
    } else {
        div.appendChild(requestButtons(item));
    }
    return div;
}

// Map pin button
function mapButtons1(item) {
    let button = document.createElement("a");
    button.classList.add("button");
    button.classList.add("is-info");
    button.classList.add("is-narrow");
    let svg1 = document.createElement("img");
    if (pointers.locations['p'+item['id']].isVisible) {
        svg1.src = globalThis.pin;
    } else {
        svg1.src = globalThis.pin_o;
    }
    svg1.classList.add("pin");
    button.addEventListener('click', () => {
        pointers.locations['p'+item['id']].toggleVisibility()
        if (pointers.locations['p'+item['id']].isVisible) {
            svg1.src = globalThis.pin;
        } else {
            svg1.src = globalThis.pin_o;
        }
    });
    button.appendChild(svg1);
    return button;
}
// Map options and unfriend buttons
function mapButtons2(item) {
    let dropdown = document.createElement("div");
    dropdown.id = "dropdown-"+item['id'];
    dropdown.classList.add("dropdown");
    dropdown.classList.add("is-right");
    let dropdownTrigger = document.createElement("div");
    dropdownTrigger.classList.add("dropdown-trigger");
    let button = document.createElement("a");
    button.classList.add("button");
    button.classList.add("is-white");
    button.classList.add("is-narrow");
    button.setAttribute("aria-haspopup", "true");
    button.setAttribute("aria-controls", "o"+item['id']);
    let svg2 = document.createElement("img");
    svg2.src = globalThis.options;
    button.appendChild(svg2);
    dropdownTrigger.appendChild(button);
    dropdownTrigger.addEventListener('click', () => {
        document.querySelector("#dropdown-"+item['id']).classList.toggle("is-active");
    })
    dropdown.appendChild(dropdownTrigger);
    let dropdownMenu = document.createElement("div");
    dropdownMenu.id = 'o'+item['id'];
    dropdownMenu.classList.add("dropdown-menu");
    dropdownMenu.setAttribute("role", "menu");
    let dropdownContent = document.createElement("div");
    dropdownContent.classList.add("dropdown-content");
    dropdownContent.appendChild(unfriendButtons(item, "Unfriend"));
    dropdownMenu.appendChild(dropdownContent);
    dropdown.appendChild(dropdownMenu);
    return dropdown;
}

// Send friendship request button
function requestButtons(item) {
    let button = document.createElement("a");
    button.classList.add("button");
    button.classList.add("is-info");
    button.classList.add("is-fullwidth");
    button.onclick = () => {sendRequest('request', item, 'Pending')};
    button.innerText = "Send Friend Request";
    return button;
}

// Button for pending friendship
function pendingButtons(item) {
    let div = document.createElement("div");
    div.classList.add("has-text-centered");
    if(item['sender']) {
        div.innerText = "Friendship request received";
        let button = document.createElement("a");
        button.classList.add("button");
        button.classList.add("is-success");
        button.classList.add("is-fullwidth");
        button.onclick = () => {sendRequest('accept', item, 'Accepted')};
        button.innerText = "Accept";
        div.appendChild(button)
        div.appendChild(unfriendButtons(item, "Reject"))
    } else {
        div.innerText = "Friendship request Sent";
        div.appendChild(unfriendButtons(item, "Withdraw"))
    }
    return div;
}

// Unfriend/Withdraw/Reject button
function unfriendButtons(item, text='Unfriend') {
    let button = document.createElement("a");
    button.classList.add("button");
    button.classList.add("is-danger");
    button.classList.add("is-fullwidth");
    button.onclick = () => {sendRequest('reject', item, '')};
    button.innerText = text;
    return button;
}