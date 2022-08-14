const backend_base_url = "https://13.124.20.151"
const frontend_base_url = "https://d2b1lm00cp7z1g.cloudfront.net/"

async function logout() {
    window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
    window.location.replace(`${frontend_base_url}/login.html`)
}

function change_category() {
    const category_id = document.getElementById("postscript_value").value
    window.location.replace(`${frontend_base_url}/postscripts.html?${category_id}`);
}



async function postscriptGet() {
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
        console.log(data)
        article = data
        if (data['code'] == 'token_not_valid') {
            window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
            window.location.replace(`${frontend_base_url}/login.html`)
        }
        let lower_category_name = data[0]['lower_category_name']
        let temp_html = `
        <p>${lower_category_name} 후기</p>
        `
        $('#lower_category_name').append(temp_html)
        for (let i = 0; i < article.length; i++) {
            let id = article[i]['id']
            let lower_id = article[i]['category_name']
            let assignment = article[i]['assignment']
            let create_at = article[i]['created_at']
            let count = article[i]['count']
            let like = article[i]['like'].length
            let like_id = article[i]['like']
            let comment_count = article[i]['comment_count']
            let nickname = article[i]['nickname']
            let content = article[i]['content']
            let star = article[i]['article_star']
            let user = article[i]['user']
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
                            <a class="Title">${content}</a>
                        </div>
                        <div class="Count" id="if_liked">
                            <a href="javascript:void(0);" onclick="likePost(${id});"><i class="fa-solid fa-thumbs-up"></i>
                                ${like}</a>

                            <div class="Stars">${star}</div>
                            <div class="articleDeleteBtn" id="articleDelete${id}"></div>

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
                            <a class="Title">${content}</a>
                        </div>
                        <div class="Count" id="if_liked">
                            <a href="javascript:void(0);" onclick="likePost(${id});"><i class="fa-regular fa-thumbs-up"></i>
                                ${like}</a>
                                <div>${star}</div>
                                <div class="articleDeleteBtn" id="articleDelete${id}"></div>
                        </div>
                    </div>
            `
                $('#article_list').append(temp_html)

            }
            //만약 내가 작성한 댓글이면 삭제 버튼
            if (login_user == user) {
                let button_temp_html = `
                <button type="button" class="btn btn-dark btn-sm" onclick="deleteArticle(${id})">삭제</button>
        `
                $(`#articleDelete${id}`).append(button_temp_html)
            }//삭제 버튼 위치 옮겨야댐
        }
    })
}

async function likePost(id) {
    const response = await fetch(`${backend_base_url}/article/like/${id}`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access")
        },
        method: 'GET',
    })
    window.location.reload();
}

async function deleteArticle(obj) {
    const article_id = location.href.split("?")[1]
    const response = await fetch(`${backend_base_url}/article/${obj}`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
        },
        method: 'DELETE',
    })
    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/postscripts.html?${article_id}`)
    }
    else {
        alert(response.status)
    }
}



$('document').ready(postscriptGet());

