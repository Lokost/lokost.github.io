function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function exitAnimation() {
    try {
        document.querySelectorAll(".content-vertical")[0].style.animation = "appear 1s reverse forwards";
    } catch {
        document.querySelectorAll(".content-horizontal")[0].style.animation = "appear 1s reverse forwards";
    }

    await sleep(800);
}

async function jump(page) {
    
    switch (page) {
        case "index":
            await exitAnimation();
            location.href = "index.html";
            break;
            
        case "download":
            await exitAnimation();
            location.href = "download.html";
            break;

        default:
            location.href = page;
            break;
    }
}