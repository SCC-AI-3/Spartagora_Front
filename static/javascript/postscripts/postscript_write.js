const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"



async function postArticles() {
    $("#alert_note").empty()
    if (document.getElementById('lowercategory').value == "all") {
        let temp_html = `강의를 선택해주세요!`
        $("#alert_note").append(temp_html)
        return false
    }
    if (document.getElementById('article_star').value == "all") {
        let temp_html = `별점을 매겨주세요!`
        $("#alert_note").append(temp_html)
        return false
    }
    if (document.getElementById('summernote').value == "") {
        let temp_html = `게시글이 작성 되어야 합니다!`
        $("#alert_note").append(temp_html)
        return false
    }
    if (out_result == "일반글") {
        let random_emotion = ['미운', '고마운', '사랑하는', '증오하는', '끔찍한', '무서운']
        let random_nature = ['숲', '나무', '꽃', '풀', '바다', '절벽']
        let random_name = random_emotion[Math.floor(Math.random() * random_emotion.length)] + " 나의 " + random_nature[Math.floor(Math.random() * random_nature.length)]
        const summernote = document.getElementById('summernote').value
        const category = document.getElementById('lowercategory').value
        const tags = document.getElementById('tags').value
        const nickname = random_name
        const star = document.getElementById('article_star').value

        const formData = new FormData();
        formData.append("content", summernote)
        formData.append("lower_category", category)
        formData.append("tags", tags)
        formData.append("nickname", nickname)
        formData.append("star", star)

        const response = await fetch(`${backend_base_url}/article/`, {
            headers: { "Authorization": "Bearer " + localStorage.getItem("access"), },
            method: 'POST',
            body: formData
        }
        )
        if (response.status == 200) {
            window.location.replace(`${frontend_base_url}/postscripts.html?${category}`);
        } else {
            alert(response.status)
        }

        return response.json()
    }
    else {
        let temp_html = `공격 및 차별적인 단어가 감지되었습니다.`
        $("#alert_note").append(temp_html)
        return false
    }
}

function goBack() {
    window.location.replace(`${frontend_base_url}/postscripts.html`);
}


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
            headers: { Authorization: "Bearer " + localStorage.getItem("access"), },
            body: formData
        })
        if (response.status == 200) {
            window.location.replace(`${frontend_base_url}/postscripts.html`);
        } else {
            alert("작성 실패")
        }
    }
    else {
        alert('공격발언 및 차별발언 입니다!')
    }
}


$('document').ready(loadArticleData());



