const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

function ifLoggedIn() {
    if (localStorage.getItem("access")) {
        window.location.replace(`${frontend_base_url}/templates/main.html`);
    }
}


async function handleSignup() {

    const signupData = {
        assignment: document.getElementById("assignment").value,
        username: document.getElementById("id").value,
        password: document.getElementById('pw').value,
        password2: document.getElementById('pw2').value,
    }

    if (signupData.password != signupData.password2) {
        temp_html = `비밀번호가 일치하지 않습니다.`
        $("#password_check").append(temp_html)
    }
    else {
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
            window.location.replace(`${frontend_base_url}/templates/user/login.html`);
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
        alert("아이디 및 비밀번호가 틀렸습니다")
    }
    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/templates/main.html`);
    }
}


$('document').ready(ifLoggedIn());


// async function logout() {
//     window.localStorage.clear(); //로컬스토리지에 저장된 토큰 삭제해줌.
// }


// async function pictureupload() {

//     const pic = document.getElementById('inpFile').files[0];
//     const description = document.getElementById('description').value

//     const formData = new FormData();
//     formData.append("description", description)
//     formData.append("image", pic)

//     const response = await fetch(`${backend_base_url}/picture/`, {
//         headers: { "Authorization": "Bearer " + localStorage.getItem("access"), },
//         method: 'POST',
//         body: formData
//     }
//     )
//     if (response.status == 200) {
//         alert("업로드 완료!")
//         window.location.replace(`${frontend_base_url}/index.html`);
//     } else {
//         alert(response.status)
//     }

//     return response.json()

//     // if (response.status ==200){
//     //     window.location.replace(`${frontend_base_url}/index.html`);
//     // }else{
//     //     alert(response.status)
//     // }
// }

// async function pictureget() {

//     const picturData = async () => {
//         const response = await fetch(`${backend_base_url}/picture/`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 "Authorization": "Bearer " + localStorage.getItem("access")
//             },
//         })
//         return response.json();
//     }
//     picturData().then((data) => {
//         pic = data.Picture_data
//         console.log(pic)
//         for (let i = 0; i < pic.length; i++) {
//             let id = pic[i]['user']
//             let name = pic[i]['username']
//             let image = pic[i]['image_path']
//             let description = pic[i]['description']
//             let p_id = pic[i]['id']

//             // console.log(pic[i]['image_path'])
//             // console.log(pic[i]['description'])

//             let temp_html = `

//                                 <article>

//                                     <a href="picture.html?${p_id}" class="image fit"><img src="${image}" alt=""/></a>
//                                     <h2><a href="usergallery.html?${id}">${name}</a></h2>
//                                     <p> ${description}</p>
//                                 </article>

//                     `
//             $('#picture-box').append(temp_html),
//                 `
//             <div id="main" >
//             <article class="thumb">
//                 <a href="exhibitionimages/fulls/01.jpg" class="image"><img src="${image}" alt="" /></a>
//                 <h2>${name}</h2>
//                 <p>${description}</p>
//             </article>
//             </div>
//             `
//             $('#pic-box').append(temp_html)
//         }
//     })
// }

// async function pictureput(){


//     const response = await fetch(`${backend_base_url}/picture/<ID>/`,{
//         headers:{
//             Accept:"application/json",
//             'Content-type':'application/json'
//         },
//         method:'PUT',
//         body:JSON.stringify(picturData)
//     }
//     )

//     const picturData = {
//         image : document.getElementById("image").value,
//         password : document.getElementById('description').value,
//     }
//     response_json = await response.json()

//     if (response.status ==200){
//         window.location.replace(`${frontend_base_url}/index.html`);
//     }else{
//         alert(response.status)
//     }
// }
