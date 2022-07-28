const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

function ifLoggedIn() {
    if (localStorage.getItem("access") == true) {
        window.location.replace(`${frontend_base_url}/templates/mainpage/main.html`);
    }
}


async function commentGet() {
    const article_id = location.href.split("?")[1]
    console.log(article_id)
    const commentData = async () => {
        const response = await fetch(`${backend_base_url}/article/comment/${article_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
        })
        return response.json();
    }
    commentData().then((data) => {
        console.log(data.article_data)
    })
}