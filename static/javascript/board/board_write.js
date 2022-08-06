const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"



async function postArticles() {
    if (out_result == "일반글") {
        if (document.getElementById('title').value == '') {
            alert("제목은 필수 입니다")
        } else {
            let random_emotion = ['미운', '고마운', '사랑하는', '증오하는', '끔찍한', '무서운']
            let random_nature = ['숲', '나무', '꽃', '풀', '바다', '절벽']
            let random_name = random_emotion[Math.floor(Math.random() * random_emotion.length)] + " 나의 " + random_nature[Math.floor(Math.random() * random_nature.length)]
            const title = document.getElementById('title').value
            const summernote = document.getElementById('summernote').value
            const category = document.getElementById('lowercategory').value
            const tags = document.getElementById('tags').value
            const nickname = random_name

            const formData = new FormData();
            formData.append("title", title)
            formData.append("content", summernote)
            formData.append("lower_category", category)
            formData.append("tags", tags)
            formData.append("nickname", nickname)

            const response = await fetch(`${backend_base_url}/article/`, {
                headers: { "Authorization": "Bearer " + localStorage.getItem("access"), },
                method: 'POST',
                body: formData
            }
            )
            if (response.status == 200) {
                alert("업로드 완료!")
                window.location.replace(`${frontend_base_url}topicsbest.html`);
            } else {
                alert(response.status)
            }

            return response.json()
        }
    }
    else {
        alert('공격발언 및 차별발언 입니다!')
    }

}

function goBack() {
    window.history.back();
}






