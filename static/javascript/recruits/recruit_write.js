const backend_base_url = "https://spartagora.com/"
const frontend_base_url = "https://d2b1lm00cp7z1g.cloudfront.net/"

async function logout() {
    window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
    window.location.replace(`${frontend_base_url}/login.html`)
}

async function postArticles() {
    $("#alert_note").empty()
    if (document.getElementById('title').value == "") {
        let temp_html = `제목이 작성 되어야 합니다!`
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
                headers: {"Authorization": "Bearer " + localStorage.getItem("access"),},
                method: 'POST',
                body: formData
            }
        )
        if (response.status == 200) {
            alert("업로드 완료!")
            window.location.replace(`${frontend_base_url}recruits.html?36`);
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
    window.history.back();
}



