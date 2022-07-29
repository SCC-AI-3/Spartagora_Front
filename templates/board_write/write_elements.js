const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

// 글 작성 기기
async function postArticles() {

    const ArticleData = {
        category: document.getElementById('lowercategory').value,
        title: document.getElementById('title').value,
        summernote: document.getElementById('summernote').value,
        tags: document.getElementById('tags').value
    }

    // const response = await fetch()

    console.log(ArticleData)
}

