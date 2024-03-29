const backend_base_url = "https://spartagora.com"
const frontend_base_url = "https://to.spartagora.com"

async function logout() {
    window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
    window.location.replace(`${frontend_base_url}/login.html`)
}


async function recruitGet() {
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
        if (data['code'] == 'token_not_valid') {
            logout()
        }
        for (let i = 0; i < article.length; i++) {
            let id = article[i]['id']
            let lower_id = article[i]['category_name']
            let assignment = article[i]['assignment']
            let title = article[i]['title']
            let create_at = article[i]['created_at']
            let count = article[i]['count']
            let like = article[i]['like'].length
            let like_id = article[i]['like']
            let comment_count = article[i]['comment_count']
            let lower_category_name = article[i]['lower_category_name']
            let nickname = article[i]['nickname']
            let lower_category_url = data[i]['lower_category_url']
            const login_user = JSON.parse(localStorage.getItem("payload")).user_id
            function contains(login_user) {
                for (let i = 0; i < like_id.length; i++) {
                    if (like_id[i] == login_user) {
                        return true;
                    }
                }
                return false;
            }
            if (contains(login_user) == true) {
                let temp_html = `
            <div class="List">
                    <div class="ProfileInfo">
                        <div class="Profile-Rtan">
                            <img src="/image/0.png" alt="">
                            <div class="User">
                                <div>
                                    <span class="Anonymous">${assignment}</span>
                                    <span class="Anonymous">- ${nickname}</span>
                                </div>
                                <p class="UploadTime">${create_at}</p>
                            </div>
                        </div>
                    </div>
                    <div class="Article-Title">
                        <a href="/${lower_category_url}?${id}" class="Title">${title}</a>
                        <p class="Category">취업후기 > ${assignment}</p>
                    </div>
                    <div class="Count">
                            <i class="fa-solid fa-thumbs-up"></i>${like}
                            <i class="fa-regular fa-comments"></i>${comment_count}
                            <i class="fa-solid fa-arrow-pointer"></i>${count}
                    </div>
                </div>
            `
                $('#article_list').append(temp_html)
            }
            else {
                let temp_html = `
            <div class="List">
                    <div class="ProfileInfo">
                        <div class="Profile-Rtan">
                            <img src="/image/0.png" alt="">
                            <div class="User">
                                <div>
                                    <span class="Anonymous">${assignment}</span>
                                    <span class="Anonymous">- ${nickname}</span>
                                </div>
                                <p class="UploadTime">${create_at}</p>
                            </div>
                        </div>
                    </div>
                    <div class="Article-Title">
                        <a href="/${lower_category_url}?${id}" class="Title">${title}</a>
                        <p class="Category">취업후기 > ${assignment}</p>
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
        }
    })
}



$('document').ready(recruitGet());
