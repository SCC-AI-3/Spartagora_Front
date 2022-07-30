const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


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
        let id = article['id']
        let created_at = article['created_at']
        let assignment = article['assignment']
        let comment_count = article['comment_count']
        let view_count = article['count']
        let lower_category_name = article['lower_category_name']
        let image = article['image']
        let like = article['like'].length
        let title = article['title']
        let author = article['author']
        let content = article['content']
        let temp_html = `
                        <div class="ProfileInfo">
                                    <div class="Profile-Rtan">
                                        <img src="/image/0.png" alt="">
                                        <div class="User">
                                            <div>
                                                <a href="#" class="Anonymous">${assignment}</a>
                                                <span class="Anonymous">- anonymous 익명</span>
                                            </div>
                                            <p class="UploadTime">${created_at}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="Article-Title">
                                    <p class="Title">${title}</p>
                                    <p class="Category">게시판 > ${lower_category_name}</p>
                                </div>
                                <div class="Count">
                                        <i class="fa-regular fa-thumbs-up"></i>
                                    ${like}
                                        <i class="fa-regular fa-comments"></i>
                                    ${comment_count}
                                        <i class="fa-solid fa-arrow-pointer"></i>
                                    ${view_count}
                                </div>
                                <div class="Content">${content}
                                </div>
        `
        $('#get_article').append(temp_html)
    }
    )
}


async function commentGet() {
    const article_id = location.href.split("?")[1]
    console.log(article_id)
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
        console.log(data)
        comment = data
        for (let i = 0; i < comment.length; i++) {
            let content = comment[i]['content']
            let created_at = comment[i]['created_at']
            temp_html = `
            <div class="List">
            <div class="Content">
                        <div class="User">
                            <p class="Username">익명1</p>
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
    const formData = {
        comment: document.getElementById("comment_write").value
    }

    const commentData = async () => {
        const response = await fetch(`${backend_base_url}/user/login/`, {
            headers: {
                Accept: "application/json",
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData)
        }
        )
        response_json = await response.json();
    }
    commentData().then((data) => {
        if (response.status == 200) {
            let comment = data
            let content = comment[i]['content']
            let created_at = comment[i]['created_at']
            temp_html = `
            <div class="List">
            <div class="Content">
                        <div class="User">
                            <p class="Username">익명1</p>
                            <p class="Update">${created_at}</p>
                        </div>
                        <p class="content">${content}</p>
                    </div>
                    </div>
            `
            $('#comment_list').append(temp_html)
        } else {
            alert("아이디 및 비밀번호가 틀렸습니다")
        }

    }
    )
}


$('document').ready(commentGet());
$('document').ready(articleGet());