const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

async function logout() {
    window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
}


async function userarticleget() {
    const category_id = location.href.split("?")[1]
    const categoryData = async () => {
        const response = await fetch(`${backend_base_url}/article/${category_id}/`, {
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
        console.log(data)
        if (data['code'] == 'token_not_valid') {
            logout()
            window.location.replace(`${frontend_base_url}/templates/user/login.html`)
        }
        articles = article[0]
        for (let i = 0; i < article.length; i++) {
            let id = article[i]['id']
            let assignment = article[i]['assignment']
            let title = article[i]['title']
            let create_at = article[i]['created_at']
            let count = article[i]['count']
            let like = article[i]['like'].length
            let comment_count = article[i]['comment_count']
            let temp_html = `
            <div class="List">
                    <div class="ProfileInfo">
                        <div class="Profile-Rtan">
                            <img src="/image/0.png" alt="">
                            <div class="User">
                                <div>
                                    <a href="#" class="Anonymous">${assignment}</a>
                                    <span class="Anonymous">- anonymous 익명</span>
                                </div>
                                <p class="UploadTime">${create_at}</p>
                            </div>
                        </div>
                    </div>
                    <div class="Article-Title">
                        <a href="/templates/lower_category/greenlight.html" class="Title">썸, 연애 게시글 제목 예시</a>
                        <p class="Category">게시판 > 썸, 연애</p>
                    </div>
                    <div class="Count">
                        <a href="" class="like">
                            <i class="fa-regular fa-thumbs-up"></i>10
                        </a>
                        <a href="" class="cmt">
                            <i class="fa-regular fa-comments"></i>20
                        </a>
                        <a href="" class="views">
                            <i class="fa-solid fa-arrow-pointer"></i>30
                        </a>
                    </div>
                </div>
            `
            $('#article_list').append(temp_html)
        }
    })
}

$('document').ready(userarticleget());

