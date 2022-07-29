const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

async function postArticles() {

    const title = document.getElementById('title').value
    const summernote = document.getElementById('summernote').value
    const category = document.getElementById('lowercategory').value
    const tags = document.getElementById('tags').value

    const formData = new FormData();
    formData.append("title", title)
    formData.append("content", summernote)
    formData.append("lower_category", category)
    formData.append("tags", tags)

    const response = await fetch(`${backend_base_url}/article/`, {
        headers: { "Authorization": "Bearer " + localStorage.getItem("access"), },
        method: 'POST',
        body: formData
    }
    )
    if (response.status == 200) {
        alert("업로드 완료!")
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        alert(response.status)
    }

    return response.json()
}