const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

function ifLoggedIn() {
    if (localStorage.getItem("access")) {
        window.location.replace(`${frontend_base_url}/main.html`);
    }
}

function checkAssignmentData(value) {
    if (value == "0") {
        temp_html = `소속을 입력해주세요!`
        $("#assignment_check").append(temp_html)
        return false;
    }
    return true;
}

function checkIdData(value) {
    $("#id_check").empty()
    if (value == "") {
        temp_html = `아이디를 입력해주세요!`
        $("#id_check").append(temp_html)
        return false;
    }
    return true;
}

function checkPwData(value, dataName) {
    $("#pw_check").empty()
    if (value == "") {
        temp_html = `${dataName}입력해주세요!`
        $("#pw_check").append(temp_html)
        return false;
    }
    return true;
}

function checkAssignment(assignment) {
    $("#assignment_check").empty()
    if (!checkAssignmentData(assignment)) {
        return false;
    }
    return true;
}

function checkUserId(id) {
    $("#id_check").empty()
    if (!checkIdData(id))
        return false;
    var idRegExp = /^(?=.*[a-z])(?=.*[0-9]).{4,12}$/;
    if (!idRegExp.test(id)) {
        let id_temp_html = `영문 소문자와 숫자 조합으로 4~12자리로 입력해야 합니다!`
        $("#id_check").append(id_temp_html)
        return false;
    } return true;
}

function checkPassword(password1, password2) {
    if (!checkPwData(password1, "비밀번호를 "))
        return false;
    var password1RegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,100}$/;
    if (!password1RegExp.test(password1)) {

        temp_html = `영문 대소문자와 숫자 조합으로 8자리 이상 입력해야 합니다!`
        $("#pw_check").append(temp_html)
        return false;
    }
    if (!checkPwData(password2, "비밀번호 확인을 "))
        return false;

    if (password1 != password2) {
        temp_html = `두 비밀번호가 맞지 않습니다.`
        $("#pw_check").append(temp_html)
        return false;
    }
    return true;
}

function checkCheckbox() {
    $("#caution_check").empty()
    if (!document.getElementById("caution_box").checked) {
        temp_html = `약관에 동의해주셔야 가입이 가능합니다.`
        $("#caution_check").append(temp_html)
        return false
    }
    return true
}

function checkAll() {
    if (!checkAssignment(document.getElementById("assignment").value)) {
        return false;
    }
    else if (!checkUserId(document.getElementById("id").value)) {
        return false;
    } else if (!checkPassword(document.getElementById('pw').value, document.getElementById('pw2').value)) {
        return false;
    } else if (!checkCheckbox()) {
        return false;
    }
    return true;
}




async function handleSignup() {

    checkAll();
    if (checkAll() == true) {

        const signupData = {
            assignment: document.getElementById("assignment").value,
            username: document.getElementById("id").value,
            password: document.getElementById('pw').value,
            password2: document.getElementById('pw2').value,
        }

        const response = await fetch(`${backend_base_url}/user/register/`, {
            headers: {
                Accept: "application/json",
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(signupData)
        }
        )

        response_json = await response.json()

        if (response.status == 200) {
            window.location.replace(`${frontend_base_url}/login.html`);
        } else {
            alert(response.status)
        }
    }
}




async function handleLogin() {
    console.log("handle login")

    const loginData = {
        username: document.getElementById("id").value,
        password: document.getElementById('pw').value
    }


    const response = await fetch(`${backend_base_url}/user/login/`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(loginData)
    }
    )
    response_json = await response.json()
    console.log(response_json.access)


    if (response.status == 200) {
        localStorage.setItem("access", response_json.access)
        localStorage.setItem("refresh", response_json.refresh)


        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);
        // window.location.replace(`${frontend_base_url}/`);
    } else {
        $('#login_check').empty();
        temp_html = `아이디 및 비밀번호가 틀립니다`
        $('#login_check').append(temp_html);
    }
    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/main.html`);
    }
}


$('document').ready(ifLoggedIn());


