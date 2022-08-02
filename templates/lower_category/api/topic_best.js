const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


async function logout() {
    window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
}


async function topicbestGet() {
    const categoryData = async () => {
        const response = await fetch(`${backend_base_url}/article/topicbest/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
        })
        return response.json();
    }
    categoryData().then((data) => {
        article = data
        console.log(article)
        if (data['code'] == 'token_not_valid') {
            logout()
            window.location.replace(`${frontend_base_url}/templates/user/login.html`)
        }
        for (let i = 0; i < article.length; i++) {
            let id = article[i]['id']
            let lower_id = article[i]['category_name']
            let assignment = article[i]['assignment']
            let title = article[i]['title']
            let create_at = article[i]['created_at']
            let count = article[i]['count']
            let like = article[i]['like'].length
            let comment_count = article[i]['comment_count']
            let lower_category_name = article[i]['lower_category_name']
            let nickname = article[i]['nickname']
            let temp_html = `
            <div class="List">
                    <div class="ProfileInfo">
                        <div class="Profile-Rtan">
                            <img src="/image/0.png" alt="">
                            <div class="User">
                                <div>
                                    <a href="#" class="Anonymous">${assignment}</a>
                                    <span class="Anonymous">- ${nickname}</span>
                                </div>
                                <p class="UploadTime">${create_at}</p>
                            </div>
                        </div>
                    </div>
                    <div class="Article-Title">
                        <a href="/templates/lower_category/qna.html?${id}" class="Title">${title}</a>
                        <p class="Category">게시판 > ${lower_category_name}</p>
                    </div>
                    <div class="Count">
                            <i class="fa-regular fa-thumbs-up"></i>${like}
                            <i class="fa-regular fa-comments"></i>${comment_count}
                            <i class="fa-solid fa-arrow-pointer"></i>${count}
                    </div>
                </div>
            `
            $('#article_list').append(temp_html)

        }
    })
}



$('document').ready(topicbestGet());