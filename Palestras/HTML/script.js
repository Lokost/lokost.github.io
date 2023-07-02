function goto(site) {
    switch(site) {
        case 'vsc': open("https://code.visualstudio.com/download"); break
        case 'livepreview': open("https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server"); break
        case 'tags': open("./tags.html", "_self");break
    }
}

available = false;

function error() {
    if (!available) {
        open('./error.html', "_self")
    }
}