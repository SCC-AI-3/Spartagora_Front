const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

function ifLoggedOut() {
    if (localStorage.getItem("access") != true) {
        window.location.replace(`${frontend_base_url}/templates/user/login.html`);
    }
}

async function topicbestGet() {
    const topicbestData = async () => {
        const response = await fetch(`${backend_base_url}/article/topicbest/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access')
            },
        })
        return response.json();
    }
    topicbestData().then((data) => {
        console.log(data)
    })
}


async function mainpageGet() {
    const mainpageData = async () => {
        const response = await fetch(`${backend_base_url}/article/topicbest/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access')
            },
        })
        return response.json();
    }
    mainpageData().then((data) => {
        console.log(data)
    })
}






$('document').ready(topicbestGet());
$('document').ready(ifLoggedOut());
