document.addEventListener("DOMContentLoaded", function () {
    const container = document.createElement("div");
    container.style.display = "grid";
    container.style.gridTemplateColumns = "1fr 1fr";
    container.style.gridTemplateRows = "1fr 1fr";
    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.gap = "5px";
    document.body.appendChild(container);

    const url = prompt("Enter the website URL:");
    if (!url) return;

    for (let i = 0; i < 4; i++) {
        const iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.onload = function () {
            setTimeout(() => automateClicks(iframe), 5000);
        };
        container.appendChild(iframe);
    }
});

function automateClicks(iframe) {
    try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        const keywords = ["Login", "login", "Sign in", "Sign up"];
        
        for (const word of keywords) {
            const elements = Array.from(doc.querySelectorAll("a, button, input[type=submit]"));
            const target = elements.find(el => el.textContent.includes(word));
            if (target) {
                target.click();
                setTimeout(() => clickLogo(doc), 3000);
                return;
            }
        }
    } catch (error) {
        console.error("Cross-origin restriction prevents access.");
    }
}

function clickLogo(doc) {
    const possibleLogos = ["img", "a", "div"];
    for (const tag of possibleLogos) {
        const elements = Array.from(doc.querySelectorAll(tag));
        const logo = elements.find(el => el.src?.includes("favicon") || el.className.includes("logo"));
        if (logo) {
            logo.click();
            return;
        }
    }
}