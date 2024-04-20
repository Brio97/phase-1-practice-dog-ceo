const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const container = document.querySelector("#dog-image-container");
const ulContainer = document.querySelector("#dog-breeds");
const dropDown = document.querySelector("#breed-dropdown");
let breedsArray;



ulContainer.addEventListener('click', handleClick)
dropDown.addEventListener('change', handleChange)

//fetch the images
function getImages(){
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(images => {
        const imgs =images.message
        let imgsArray = createImgElement(imgs)
        renderElement(imgsArray)
    })  
}


function createImgElement(imgs){
    return imgs.map((img) => {
      let i = `<img src=${img}>`
      return i
    })

    
}
function renderImgs(imgsArray){
  imgsArray.forEach(element => {
    renderElement(element)
  }) 
}
function renderElement(element){
    ulContainer.innerHTML += element
}

function getBreeds (){
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => {
        breedsArray = Object.keys(breeds.message)
        const breedLis = createLiElement(breedsArray)
        renderLis(breedLis)
    }) 
    
}

function createLiElement(breedsArray){
    return breedsArray.map((breed) => {
      let li = `<li>${breed}</li>`
      return li
    })
   
}

function renderLis(breedLis){
    breedLis.forEach(element => {
      renderElement(element)
    }) 
  }

function handleClick(e){
    if (e.target.nodeName === 'LI' ){
        if (e.target.style.color === 'purple'){
            e.target.style.color = 'black'
        } else {
            e.target.style.color = 'purple'
        } 
    }
    
        
}

function handleChange(e) {
    const letter = e.target.value
 // filter out the breeds that start with the letter
    const filteredBreeds = breedsArray.filter(breed => breed.startsWith(letter))
    const filteredBreedsLis = createLiElement(filteredBreeds)
    ulContainer.innerHTML = ''
    renderLis(filteredBreedsLis)
}
// getImages()
getBreeds()