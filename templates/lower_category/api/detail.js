const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


async function logout() {
    window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
}

async function articleGet() {
    const article_id = location.href.split("?")[1]
    const articleData = async () => {
        const response = await fetch(`${backend_base_url}/article/detail/${article_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access")
            }
        })
        return response.json();
    }
    articleData().then((data) => {
        if (data['code'] == 'token_not_valid') {
            logout()
            window.location.replace(`${frontend_base_url}/templates/user/login.html`)
        }
        article = data
        console.log(article)
        let nickname = article['nickname']
        let id = article['id']
        let created_at = article['created_at']
        let assignment = article['assignment']
        let comment_count = article['comment_count']
        let view_count = article['count']
        let lower_category_name = article['lower_category_name']
        let image = article['image']
        let like = article['like'].length
        let boolean = article['boolean']
        let title = article['title']
        let author = article['author']
        let content = article['content']
        if (boolean == true) {
            let temp_html = `
                        <div class="ProfileInfo">
                                    <div class="Profile-Rtan">
                                        <img src="/image/0.png" alt="">
                                        <div class="User">
                                            <div>
                                                <a href="#" class="Anonymous">${assignment}</a>
                                                <span class="Anonymous">- ${nickname}</span>
                                            </div>
                                            <p class="UploadTime">${created_at}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="Article-Title">
                                    <p class="Title">${title}</p>
                                    <p class="Category">게시판 > ${lower_category_name}</p>
                                </div>
                                <div class="Content">${content}
                                </div>
                                <div class="Count">
                                        <i class="fa-solid fa-thumbs-up"></i>
                                    ${like}
                                        <i class="fa-regular fa-comments"></i>
                                    ${comment_count}
                                        <i class="fa-solid fa-arrow-pointer"></i>
                                    ${view_count}
                                </div>
                                
        `
            $('#get_article').append(temp_html)
        }
        else {
            let temp_html = `
                        <div class="ProfileInfo">
                                    <div class="Profile-Rtan">
                                        <img src="/image/0.png" alt="">
                                        <div class="User">
                                            <div>
                                                <a href="#" class="Anonymous">${assignment}</a>
                                                <span class="Anonymous">- ${nickname}</span>
                                            </div>
                                            <p class="UploadTime">${created_at}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="Article-Title">
                                    <p class="Title">${title}</p>
                                    <p class="Category">게시판 > ${lower_category_name}</p>
                                </div>
                                <div class="Content">${content}
                                </div>
                                <div class="Count">
                                        <i class="fa-regular fa-thumbs-up"></i>
                                    ${like}
                                        <i class="fa-regular fa-comments"></i>
                                    ${comment_count}
                                        <i class="fa-solid fa-arrow-pointer"></i>
                                    ${view_count}
                                </div>
        `
            $('#get_article').append(temp_html)
        }

    }
    )
    articleData().then((data) => {
        if (data.boolean == true) {
            let temp_html = `
            <a href="javascript:void(0);" onclick="likePost();"><i class="fa-solid fa-thumbs-up"></i>
            좋아요 취소</a>
            `
            $('#like_unlike').append(temp_html)
        }
        else {
            let temp_html = `
            <a href="javascript:void(0);" onclick="likePost();"><i class="fa-regular fa-thumbs-up"></i>
                        좋아요</a>
            `
            $('#like_unlike').append(temp_html)
        }
    })
}


async function commentGet() {
    const article_id = location.href.split("?")[1]
    const commentData = async () => {
        const response = await fetch(`${backend_base_url}/article/comment/${article_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
        })
        return response.json();
    }
    commentData().then((data) => {
        comment = data
        for (let i = 0; i < comment.length; i++) {
            let name = i + 1
            let content = comment[i]['content']
            let created_at = comment[i]['created_at']
            temp_html = `
            <div class="List">
            <div class="Content">
                        <div class="User">
                            <p class="Username">익명 ${name}</p>
                            <p class="Update">${created_at}</p>
                        </div>
                        <p class="content">${content}</p>
                    </div>
                    </div>
            `
            $('#comment_list').append(temp_html)
        }
    })
    commentData().then((data) => {
        comment = data
        let temp_html = `
        댓글 ${comment.length}
        `
        $('#comment_counter').append(temp_html)
    }


    )
}


async function commentPost() {
    const category_id = location.href.split("?")[1]
    const formData = {
        comment: document.getElementById("comment_write").value
    }

    const response = await fetch(`${backend_base_url}/article/comment/${category_id}/`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access")
        },
        method: 'POST',
        body: JSON.stringify(formData)
    }
    )
    if (response.status == 200) {
        window.location.reload()
    }
    else {
        alert(response.status)
    }

}


async function countPost() {
    const article_id = location.href.split("?")[1]
    const response = await fetch(`${backend_base_url}/article/count/${article_id}`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
        },
        method: 'GET',
    })
}

async function likePost() {
    const article_id = location.href.split("?")[1]
    const response = await fetch(`${backend_base_url}/article/like/${article_id}`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access")
        },
        method: 'GET',
    })
    window.location.reload();
}

$('document').ready(countPost());
$('document').ready(commentGet());
$('document').ready(articleGet());

