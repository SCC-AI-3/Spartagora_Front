function getArticles() {

    const ArticleData = {
        category: document.getElementById('lowercategory').value,
        title: document.getElementById('title').value,
        summernote: document.getElementById('summernote').value
    }

    console.log(ArticleData)
    console.log(ArticleData.form)
}