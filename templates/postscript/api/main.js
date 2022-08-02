const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

async function logout() {
    window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
    window.location.replace(`${frontend_base_url}/templates/user/login.html`)
}

function change_category() {
    const category_id = document.getElementById("postscript_value").value
    window.location.replace(`${frontend_base_url}/templates/postscript/postscript_main.html?${category_id}`);
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
        article = data
        if (data['code'] == 'token_not_valid') {
            window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
            window.location.replace(`${frontend_base_url}/templates/user/login.html`)
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
            let title = article[i]['title']
            let create_at = article[i]['created_at']
            let count = article[i]['count']
            let like = article[i]['like'].length
            let like_id = article[i]['like']
            let comment_count = article[i]['comment_count']
            let nickname = article[i]['nickname']
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
                                        <a href="#" class="Anonymous">${assignment}</a>
                                        <span class="Anonymous">- ${nickname}</span>
                                    </div>
                                    <p class="UploadTime">${create_at}</p>
                                </div>
                            </div>
                        </div>
                        <div class="Article-Title">
                            <a class="Title">${title}</a>
                        </div>
                        <div class="Count" id="if_liked">
                            <a href="javascript:void(0);" onclick="likePost(${id});"><i class="fa-solid fa-thumbs-up"></i>
                                ${like}</a>
                        </div>
                    </div>
                    <div type="button" class="ReCategory">
                        <a href="/templates/postscript/postscript_write.html">과정후기 작성하기</a>
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
                                        <a href="#" class="Anonymous">${assignment}</a>
                                        <span class="Anonymous">- ${nickname}</span>
                                    </div>
                                    <p class="UploadTime">${create_at}</p>
                                </div>
                            </div>
                        </div>
                        <div class="Article-Title">
                            <a class="Title">${title}</a>
                        </div>
                        <div class="Count" id="if_liked">
                            <a href="javascript:void(0);" onclick="likePost(${id});"><i class="fa-regular fa-thumbs-up"></i>
                                ${like}</a>
                        </div>
                    </div>
                    <div type="button" class="ReCategory">
                        <a href="/templates/postscript/postscript_write.html">과정후기 작성하기</a>
                    </div>
            `
                $('#article_list').append(temp_html)

            }

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

$('document').ready(postscriptGet());

