let search = document.querySelector(".form-control")
let buttonSearch = document.getElementById("buttonSearch")
let loading = document.getElementById("loading")
let allRecipes = []
getApl('carrot')
buttonSearch.addEventListener("click" , function(){
getApl(search.value) 
})
async function getApl(meal){
try {
    loading.classList.remove("d-none")
    let response =await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`)
    let finalResponse =await response.json()
     allRecipes  = finalResponse.recipes;
     displayData()
     loading.classList.add("d-none")
     document.getElementById("alertData").classList.add("d-none")
} catch (error) {
    console.log(error);
    document.getElementById("alertData").classList.remove("d-none")
    loading.classList.add("d-none")
}
}
function displayData(){
let count = ""
for( let i = 0 ; i < allRecipes.length ; i++){
count+= `
     <div class="col-md-4">
            <div class="card" style="width: 23rem;">
                <img src="${allRecipes[i].image_url}" class="card-img-top" style="height:200px; object-fit: cover;">
                <div class="card-body">
                  <h5 class="card-title">${allRecipes[i].title.split(" ",3).join(" ")}</h5>
                    <button onclick="showData(${allRecipes[i].recipe_id})" type="button" class="btn btn-warning my-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Details Data 
                    </button>
                </div>
              </div>
        </div>
`
document.getElementById("rowData").innerHTML = count
}
}
async function showData(id){
loading.classList.remove("d-none")
let response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
let finalResponse = await response.json()
let finalShowData = (finalResponse.recipe);
document.getElementById("modal-title").innerHTML = `
        <h1 class="modal-title fs-5" id="staticBackdropLabel modal-title">${finalShowData.title}</h1>
`
document.getElementById("modal-body").innerHTML = `
        <img src="${finalShowData.image_url}" alt="" class="w-100">
`
loading.classList.add("d-none")
}

