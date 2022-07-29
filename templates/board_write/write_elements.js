function getArticles() {

    const ArticleData = {
        category: document.getElementById('lowercategory').value,
        title: document.getElementById('title').value,
        summernote: document.getElementById('summernote').value,
        tags: document.getElementById('tags').value
    }

    console.table(ArticleData)
}