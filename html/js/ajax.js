class AJAX {

    constructor(url, success, payload={}, method="GET") {
        this.xhr = new XMLHttpRequest()
        let body = "";
        if(method == "GET" && payload != {}) {
            url = this.GETParams(url, payload);
        } else if(method == "POST") {
            body = this.POSTParams(body, payload);
        } else {
            return;
        }
        this.xhr.open(method, url, true)
        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState == 4 && String(this.xhr.status).slice(0, 1) == "2") {
                success(this.xhr.responseText);
            };
        }
        this.xhr.send(body);
    }

    GETParams(url, payload) {
        url += "?";
        for(let name in payload) {
            url += name + "=" + payload[name] + "&";
        }
        return url.slice(0, -1);
    }

    POSTParams(body, payload) {
        this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        for(let name in payload) {
            body += name + "=" + payload[name] + "&";
        }
        return body.slice(0, -1);
    }
}