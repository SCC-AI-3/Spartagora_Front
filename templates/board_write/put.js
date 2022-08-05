const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"




// article edit page load
async function loadArticleData() {
    const article_id = location.href.split("?")[1]

    const response = await fetch(`${backend_base_url}/article/detail/${article_id}/`, {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access")
        },
        withCredentials: true,
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("title").setAttribute('value', data.title)
            document.getElementById("lowercategory").setAttribute('value', data.lowercategory)
            document.getElementById("summernote").innerHTML = data.content
            $("#summernote").summernote('code', data.content);
            $('#summernote').summernote({
                placeholder: '게시글을 작성해 주세요',
                height: 300,
                minHeight: null,
                maxHeight: null,
                focus: true
            });
        })
}



async function putArticle() {
    if (out_result == "일반글") {
        const obj_id = location.href.split("?")[1]
        const title = document.getElementById('title').value
        const summernote = document.getElementById('summernote').value
        const category = document.getElementById('lowercategory').value
        const tags = document.getElementById('tags').value
        const formData = new FormData();
        formData.append("title", title)
        formData.append("content", summernote)
        formData.append("lower_category", category)
        formData.append("tags", tags)

        const response = await fetch(`${backend_base_url}/article/put/${obj_id}/`, {
            method: 'PUT',
            headers: {Authorization: "Bearer " + localStorage.getItem("access"),},
            body: formData
        })
        if (response.status == 200) {
            // window.location.replace(`${frontend_base_url}/templates/mainpage/main.html`);
            window.history.back();
        } else {
            alert("작성 실패")
        }
    }
    else {
        alert('공격발언 및 차별발언 입니다!')
    }
}

$('document').ready(loadArticleData());