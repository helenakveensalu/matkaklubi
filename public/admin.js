
const AdminSisuEl = document.getElementById('admin-sisu')
let hikes = []

function getleftPaneHTML(hikes) {
    let returnHTML = '';
    for (h of hikes) {
        returnHTML += `
        <div>
            ${h.nimetus}
    </div>
    `
    }

    return returnHTML
}

function getpageContentHTML() {
    const leftPaneHTML = getleftPaneHTML (hikes)
    return `
    <div class="row">
    Matkaklubi matkadele registreerunud
    </div>
       <div class="row">
        <div class="col-4">
        vasak paan
       </div>
       <div class="col-8">
       parem paan
       </div>
    </div>
    `
}

function showPageContent() {
    AdminSisuEl.innerHTML = getpageContentHTML()
}

async function fetchHikes() {
    let response = await fetch('/api/matk');

    console.log(response.status); // 200
    console.log(response.statusText); // OK

    if (response.status === 200) {
        let data = await response.text();
        // handle data
        console.log(data)
        hikes = data
        showPageContent()
    }
}


//showPageContent()
fetchHikes()