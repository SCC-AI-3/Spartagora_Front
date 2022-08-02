const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

async function logout() {
    window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
}

function change_category() {
    const category_id = document.getElementById("postscript_value").value
    if (category_id == "all") {
        window.location.replace(`${frontend_base_url}/templates/postscript/postscript_main.html`);
    }
    else {
        window.location.replace(`${frontend_base_url}/templates/postscript/postscript_category.html?${category_id}`);
    }
}