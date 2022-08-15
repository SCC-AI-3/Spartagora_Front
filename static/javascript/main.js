const backend_base_url = "https://spartagora.com/"
const frontend_base_url = "https://d2b1lm00cp7z1g.cloudfront.net/"

async function logout() {
    window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
    window.location.replace(`${frontend_base_url}/login.html`)
}

async function topicbestGet() {
    const topicbestData = async () => {
        const response = await fetch(`${backend_base_url}/article/topicbest/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access')
            },
        })
        return response.json();
    }
    topicbestData().then((data) => {
        if (data['code'] == 'token_not_valid') {
            logout()
        }
        let max_length = 0
        if (data.length < 5) {
            max_length = data.length
        }
        else {
            max_length = 5
        }
        for (let i = 0; i < max_length; i++) {
            let id = data[i]['id']
            let title = data[i]['title']
            let comment_count = data[i]['comment_count']
            let like = data[i]['like'].length
            let like_id = data[i]['like']
            let view_count = data[i]['count']
            let assignment = data[i]['assignment']
            let lower_category_url = data[i]['lower_category_url']
            let lower_category_id = data[i]['lower_category']
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
                if (lower_category_url == "postscripts.html") {
                    let temp_html = `
                <li class="List">
                            <div class="Article">
                                <span>
                                <p class="ArticleCategory">${assignment}</p>
                                </span>
                                <a href="${frontend_base_url}/${lower_category_url}?${lower_category_id}" class="tit">${title}</a>
                                <div class="ArticleInfo">
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="like">
                                        <i class="fa-solid fa-thumbs-up"></i>${like}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="cmt">
                                        <i class="fa-regular fa-comments"></i>${comment_count}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="views">
                                        <i class="fa-solid fa-arrow-pointer"></i>${view_count}
                                    </a>
                                </div>
                            </div>
                        </li>
                        `
                    $('#list0').append(temp_html)
                }
                else {
                    let temp_html = `
                <li class="List">
                            <div class="Article">
                                <span>
                                    <p class="ArticleCategory">${assignment}</p>
                                </span>
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="tit">${title}</a>
                                <div class="ArticleInfo">
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="like">
                                        <i class="fa-solid fa-thumbs-up"></i>${like}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="cmt">
                                        <i class="fa-regular fa-comments"></i>${comment_count}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="views">
                                        <i class="fa-solid fa-arrow-pointer"></i>${view_count}
                                    </a>
                                </div>
                            </div>
                        </li>
                        `
                    $('#list0').append(temp_html)
                }

            }
            else {
                if (lower_category_url == "postscripts.html") {
                    let temp_html = `
                <li class="List">
                            <div class="Article">
                                <span>
                                <p class="ArticleCategory">${assignment}</p>
                                </span>
                                <a href="${frontend_base_url}/${lower_category_url}?${lower_category_id}" class="tit">${title}</a>
                                <div class="ArticleInfo">
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="like">
                                        <i class="fa-regular fa-thumbs-up"></i>${like}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="cmt">
                                        <i class="fa-regular fa-comments"></i>${comment_count}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="views">
                                        <i class="fa-solid fa-arrow-pointer"></i>${view_count}
                                    </a>
                                </div>
                            </div>
                        </li>
                        `
                    $('#list0').append(temp_html)
                }
                else {
                    let temp_html = `
                <li class="List">
                            <div class="Article">
                                <span>
                                <p class="ArticleCategory">${assignment}</p>
                                </span>
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="tit">${title}</a>
                                <div class="ArticleInfo">
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="like">
                                        <i class="fa-regular fa-thumbs-up"></i>${like}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="cmt">
                                        <i class="fa-regular fa-comments"></i>${comment_count}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="views">
                                        <i class="fa-solid fa-arrow-pointer"></i>${view_count}
                                    </a>
                                </div>
                            </div>
                        </li>
        `
                    $('#list0').append(temp_html)
                }

            }
        }
    })
}


async function gominpageGet() {
    const mainpageData = async () => {
        const response = await fetch(`${backend_base_url}/article/1/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access')
            },
        })
        return response.json();
    }
    mainpageData().then((data) => {
        let max_length = 0
        if (data.length < 5) {
            max_length = data.length
        }
        else {
            max_length = 5
        }
        for (let i = 0; i < max_length; i++) {
            let id = data[i]['id']
            let title = data[i]['title']
            let comment_count = data[i]['comment_count']
            let like = data[i]['like'].length
            let like_id = data[i]['like']
            let view_count = data[i]['count']
            let assignment = data[i]['assignment']
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
                <li class="List">
                            <div class="Article">
                                <span>
                                <p class="ArticleCategory">${assignment}</p>
                                </span>
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="tit">${title}</a>
                                <div class="ArticleInfo">
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="like">
                                        <i class="fa-solid fa-thumbs-up"></i>${like}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="cmt">
                                        <i class="fa-regular fa-comments"></i>${comment_count}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="views">
                                        <i class="fa-solid fa-arrow-pointer"></i>${view_count}
                                    </a>
                                </div>
                            </div>
                        </li>
                        `
                $('#list1').append(temp_html)
            }
            else {
                let temp_html = `
                <li class="List">
                            <div class="Article">
                                <span>
                                <p class="ArticleCategory">${assignment}</p>
                                </span>
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="tit">${title}</a>
                                <div class="ArticleInfo">
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="like">
                                        <i class="fa-regular fa-thumbs-up"></i>${like}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="cmt">
                                        <i class="fa-regular fa-comments"></i>${comment_count}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="views">
                                        <i class="fa-solid fa-arrow-pointer"></i>${view_count}
                                    </a>
                                </div>
                            </div>
                        </li>
        `
                $('#list1').append(temp_html)
            }
        }
    })
}

async function studypageGet() {
    const mainpageData = async () => {
        const response = await fetch(`${backend_base_url}/article/2/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access')
            },
        })
        return response.json();
    }
    mainpageData().then((data) => {
        let max_length = 0
        if (data.length < 5) {
            max_length = data.length
        }
        else {
            max_length = 5
        }
        for (let i = 0; i < max_length; i++) {
            let id = data[i]['id']
            let title = data[i]['title']
            let comment_count = data[i]['comment_count']
            let like = data[i]['like'].length
            let like_id = data[i]['like']
            let view_count = data[i]['count']
            let assignment = data[i]['assignment']
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
                <li class="List">
                            <div class="Article">
                                <span>
                                <p class="ArticleCategory">${assignment}</p>
                                </span>
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="tit">${title}</a>
                                <div class="ArticleInfo">
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="like">
                                        <i class="fa-solid fa-thumbs-up"></i>${like}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="cmt">
                                        <i class="fa-regular fa-comments"></i>${comment_count}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="views">
                                        <i class="fa-solid fa-arrow-pointer"></i>${view_count}
                                    </a>
                                </div>
                            </div>
                        </li>
                        `
                $('#list2').append(temp_html)
            }
            else {
                let temp_html = `
                <li class="List">
                            <div class="Article">
                                <span>
                                <p class="ArticleCategory">${assignment}</p>
                                </span>
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="tit">${title}</a>
                                <div class="ArticleInfo">
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="like">
                                        <i class="fa-regular fa-thumbs-up"></i>${like}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="cmt">
                                        <i class="fa-regular fa-comments"></i>${comment_count}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="views">
                                        <i class="fa-solid fa-arrow-pointer"></i>${view_count}
                                    </a>
                                </div>
                            </div>
                        </li>
        `
                $('#list2').append(temp_html)
            }
        }
    })
}

async function somepageGet() {
    const mainpageData = async () => {
        const response = await fetch(`${backend_base_url}/article/3/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access')
            },
        })
        return response.json();
    }
    mainpageData().then((data) => {
        let max_length = 0
        if (data.length < 5) {
            max_length = data.length
        }
        else {
            max_length = 5
        }
        for (let i = 0; i < max_length; i++) {
            let id = data[i]['id']
            let title = data[i]['title']
            let comment_count = data[i]['comment_count']
            let like = data[i]['like'].length
            let like_id = data[i]['like']
            let view_count = data[i]['count']
            let assignment = data[i]['assignment']
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
                <li class="List">
                            <div class="Article">
                                <span>
                                <p class="ArticleCategory">${assignment}</p>
                                </span>
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="tit">${title}</a>
                                <div class="ArticleInfo">
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="like">
                                        <i class="fa-solid fa-thumbs-up"></i>${like}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="cmt">
                                        <i class="fa-regular fa-comments"></i>${comment_count}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="views">
                                        <i class="fa-solid fa-arrow-pointer"></i>${view_count}
                                    </a>
                                </div>
                            </div>
                        </li>
                        `
                $('#list3').append(temp_html)
            }
            else {
                let temp_html = `
                <li class="List">
                            <div class="Article">
                                <span>
                                <p class="ArticleCategory">${assignment}</p>
                                </span>
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="tit">${title}</a>
                                <div class="ArticleInfo">
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="like">
                                        <i class="fa-regular fa-thumbs-up"></i>${like}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="cmt">
                                        <i class="fa-regular fa-comments"></i>${comment_count}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="views">
                                        <i class="fa-solid fa-arrow-pointer"></i>${view_count}
                                    </a>
                                </div>
                            </div>
                        </li>
        `
                $('#list3').append(temp_html)
            }
        }
    })
}

async function petpageGet() {
    const mainpageData = async () => {
        const response = await fetch(`${backend_base_url}/article/4/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access')
            },
        })
        return response.json();
    }
    mainpageData().then((data) => {
        let max_length = 0
        if (data.length < 5) {
            max_length = data.length
        }
        else {
            max_length = 5
        }
        for (let i = 0; i < max_length; i++) {
            let id = data[i]['id']
            let title = data[i]['title']
            let comment_count = data[i]['comment_count']
            let like = data[i]['like'].length
            let like_id = data[i]['like']
            let view_count = data[i]['count']
            let assignment = data[i]['assignment']
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
                <li class="List">
                            <div class="Article">
                                <span>
                                <p class="ArticleCategory">${assignment}</p>
                                </span>
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="tit">${title}</a>
                                <div class="ArticleInfo">
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="like">
                                        <i class="fa-solid fa-thumbs-up"></i>${like}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="cmt">
                                        <i class="fa-regular fa-comments"></i>${comment_count}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="views">
                                        <i class="fa-solid fa-arrow-pointer"></i>${view_count}
                                    </a>
                                </div>
                            </div>
                        </li>
                        `
                $('#list4').append(temp_html)
            }
            else {
                let temp_html = `
                <li class="List">
                            <div class="Article">
                                <span>
                                <p class="ArticleCategory">${assignment}</p>
                                </span>
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="tit">${title}</a>
                                <div class="ArticleInfo">
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="like">
                                        <i class="fa-regular fa-thumbs-up"></i>${like}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="cmt">
                                        <i class="fa-regular fa-comments"></i>${comment_count}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="views">
                                        <i class="fa-solid fa-arrow-pointer"></i>${view_count}
                                    </a>
                                </div>
                            </div>
                        </li>
        `
                $('#list4').append(temp_html)
            }
        }
    })
}

async function travelpageGet() {
    const mainpageData = async () => {
        const response = await fetch(`${backend_base_url}/article/5/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access')
            },
        })
        return response.json();
    }
    mainpageData().then((data) => {
        let max_length = 0
        if (data.length < 5) {
            max_length = data.length
        }
        else {
            max_length = 5
        }
        for (let i = 0; i < max_length; i++) {
            let id = data[i]['id']
            let title = data[i]['title']
            let comment_count = data[i]['comment_count']
            let like = data[i]['like'].length
            let like_id = data[i]['like']
            let view_count = data[i]['count']
            let assignment = data[i]['assignment']
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
                <li class="List">
                            <div class="Article">
                                <span>
                                <p class="ArticleCategory">${assignment}</p>
                                </span>
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="tit">${title}</a>
                                <div class="ArticleInfo">
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="like">
                                        <i class="fa-solid fa-thumbs-up"></i>${like}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="cmt">
                                        <i class="fa-regular fa-comments"></i>${comment_count}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="views">
                                        <i class="fa-solid fa-arrow-pointer"></i>${view_count}
                                    </a>
                                </div>
                            </div>
                        </li>
                        `
                $('#list5').append(temp_html)
            }
            else {
                let temp_html = `
                <li class="List">
                            <div class="Article">
                                <span>
                                <p class="ArticleCategory">${assignment}</p>
                                </span>
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="tit">${title}</a>
                                <div class="ArticleInfo">
                                <a href="${frontend_base_url}/${lower_category_url}?${id}" class="like">
                                        <i class="fa-regular fa-thumbs-up"></i>${like}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="cmt">
                                        <i class="fa-regular fa-comments"></i>${comment_count}
                                    </a>
                                    <a href="${frontend_base_url}/${lower_category_url}?${id}" class="views">
                                        <i class="fa-solid fa-arrow-pointer"></i>${view_count}
                                    </a>
                                </div>
                            </div>
                        </li>
        `
                $('#list5').append(temp_html)
            }
        }
    })
}







$('document').ready(topicbestGet());
$('document').ready(gominpageGet());
$('document').ready(studypageGet());
$('document').ready(somepageGet());
$('document').ready(petpageGet());
$('document').ready(travelpageGet());