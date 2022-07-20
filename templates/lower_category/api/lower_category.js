const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


async function userarticleget() {
    const category_id = location.href.split("?")[1]
    console.log(category_id)
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
        articles = article[0]
        for (let i = 0; i < article.length; i++) {
            let id = article[i]['id']
            let title = article[i]['title']
            let content = article[i]['content']
            let create_at = article[i]['create_at']
            let image = article[i]['image']
            let count = article[i]['count']
            if (image == true) {
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
                    <a href="/templates/lower_category/greenlight.html?${id}" class="Title">${title}</a>
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
            else {
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
                    <a href="/templates/lower_category/greenlight.html?${id}" class="Title">${title}</a>
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
        }
    })
}

$('document').ready(userarticleget());



{/* <div class="articlebox-sector">
<div class="articlebox-header-sector">
    <div class="articlebox-headerbox">
        <div width="36px" height="36px" class="css-jg5tbe">
            <img src="/image/tutor.png" alt="나의얼굴" width="34px" height="34px">
        </div>
        <div class="articlebox-headernamebox">
            <div class="articlebox-headername">안정환
            </div>
            <div class="articlebox-headertime">3분 전
            </div>
        </div>
    </div>
    <div class="articlebox-bookmark">
        <div>
            <img src="/image/bookmark-inactive.png" alt="북마크" width="20px" height="20px">
        </div>
    </div>
</div>
<div class="articlebox-content">
    <div class="articlebox-contents-titlebox">
        <a class="articlebox-contents-title">하던게 날아감</a>
    </div>
    <a class="articlebox-contents-content">눈물 ㅠ ㅠ🙄</a>
</div>
<div class="articlebox-categorybox">
    <div class="articlebox-category">토픽베스트
    </div>
</div>
<div class="articlebox-countbox">
    <div class="articlebox-countbox2">
        <div class="articlebox-counts">
            <div style="display: inline-block; width: 20px; height: 20px;">
                <img src="/image/icon-comment.png" alt="취소" width="20px" height="20px"
                    style="vertical-align: sub;">
            </div> 0
        </div>
        <div class="articlebox-counts">
            <div style="display: inline-block; width: 20px; height: 20px;">
                <img src="/image/icon-like.png" alt="취소" width="20px" height="20px"
                    style="vertical-align: sub;">
            </div> 0
        </div>
        <div class="articlebox-counts">
            <div style="display: inline-block; width: 20px; height: 20px;">
                <img src="/image/icon-view.png" alt="취소" width="20px" height="20px"
                    style="vertical-align: sub;">
            </div> 7
        </div>
    </div>
</div>
</div> */}