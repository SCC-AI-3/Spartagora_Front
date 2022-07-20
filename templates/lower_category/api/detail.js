const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


async function commentGet() {
    const article_id = location.href.split("?")[1]
    const commentData = async () => {
        const response = await fetch(`${backend_base_url}/article/comment/${article_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
        })
        return response.json();
    }
    commentData().then((data) => {
        comment = data.serialized_data
        console.log(comment)
        comments = comment[0]
        for (let i = 0; i < comment.length; i++) {
            let id = comment[i]['id']
            let content = comment[i]['content']
            let create_at = comment[i]['create_at']
            let temp_html = `
                <div class="List">
                <div class="ProfileInfo">
                    <div class="Profile-Rtan">
                        <img src="/image/0.png" alt="">
                        <div class="User">
                            <p class="Anonymous">익명</p>
                            <p class="UploadTime">2022년 7월 20일 오후 4:23</p>
                        </div>
                    </div>
                </div>
                <div class="Article-Title">
                    <a href="/templates/lower_category/greenlight.html?" class="Title"></a>
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
            $('#comment_list').append(temp_html)
        }
    })
}

$('document').ready(commentGet());
