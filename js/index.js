var siteName=document.getElementById("siteName")
var siteUrl=document.getElementById("siteUrl")
var siteTable=document.getElementById("productUrl")
var para=document.getElementById("para")
var validmsg=document.getElementById("validmsg")
var urlArr=[]
if (window.localStorage.getItem("data")){
    urlArr=JSON.parse(window.localStorage.getItem("data"))
    addToForm()
}

function validePName() {
    var regexPname=/^[A-Z][a-z]{3,}$/ig
    if(regexPname.test(siteName.value)){
        errorName.classList.replace("d-block","d-none")
        siteName.classList.replace("is-invalid","is-valid")
        return true;
    }else{
        errorName.classList.replace("d-none","d-block")
        siteName.classList.add("is-invalid")
        return false;
    }
}
siteName.addEventListener("input",validePName)
function valideUrl() {
    var regexUrl=/(https?:\/\/)?(www.)?\w+\.\w+/ig;
    if(regexUrl.test(siteUrl.value)){
        para.classList.replace("d-block","d-none")
        siteUrl.classList.replace("is-invalid","is-valid")
        return true;
    }else{
        para.classList.replace("d-none","d-block")
        siteUrl.classList.add("is-invalid")
        return false;
    }
}
siteUrl.addEventListener("input",valideUrl)
function addUrl() {
    if ( validePName()===true && valideUrl()===true ){
                validmsg.style.display="none"
                var urlObj={
                    urlName:siteName.value,
                    urlSite:siteUrl.value,
                }
                urlArr.push(urlObj)
                clearForm()
                addToForm()
                window.localStorage.setItem("data", JSON.stringify (urlArr))
    }
    else{
        validmsg.style.display="block"
        
    }
}
function clearForm() {
    siteName.value="";
    siteUrl.value="";
}
function addToForm() {
    var boxUrl=``
    for(var i=0;i<urlArr.length;i++){
        
            boxUrl+=` <tr>
            <td>${i+1}</td>
            <td>${urlArr[i].urlName}</td>
            <td><a class="btn btn-outline-success" href="${urlArr[i].urlSite}"> <i class="fa-solid fa-eye pe-2"></i>  Visit</a></td>
            <td><button class="btn btn-outline-danger" onclick="deletUrl(${i})"> <i class="fa-solid fa-trash-can"></i>  Delete</button></td>
          </tr>`
    }
    siteTable.innerHTML=boxUrl
}
function deletUrl(delItemUrl) {
    urlArr.splice(delItemUrl,1)
window.localStorage.setItem("data",JSON.stringify(urlArr))
addToForm()
}


