import LightBox from '../utils/lightbox.js'


let VariableInitializationForFunction = async (jsonData) => {
    const data = await jsonData
    const DataPhotographer = data.photographers
    const DataMedia = data.media
    let str = document.location //permet de récupérer l'url de la page
    let url = new URL(str)
    let id = url.searchParams.get('id')
    setTimeout(() => {
        LightBox.init()
    }, 1000)
    const DataMediaById = DataMedia.filter(
        (elt) => elt.photographerId == id
    )
    const DataPhotographeraById = DataPhotographer.filter(
        (elt) => elt.id == id
    )
    InsertNameOnContactForm(DataPhotographeraById)
    SortingMedias(DataMediaById)
    PhotographerBoxById(DataPhotographeraById)
    TotalLikeBox(DataMediaById, DataPhotographeraById)
    IncrementLikesAndTotalLikes()

}
let InsertNameOnContactForm = (DataPhotographeraById) => {
    const Name = DataPhotographeraById.map(
        (elt) => elt.name
    )
    const ContactNameDiv = document.getElementById('contact-name')
    const InsertName = `<br>${Name}`
    ContactNameDiv.innerHTML += InsertName
}
let SortingMedias = (DataMediaById) => {

    const SelectDiv = document.getElementById('tri-select')
    console.log(SelectDiv)
    const MediaBox = document.createElement('div')
    MediaBox.classList.add('photographe-container')
    MediaBoxImageOrVideo(MediaBox, DataMediaById)

    SelectDiv.addEventListener('change', (event) => {
        switch (event.target.value) {
        case 'likes': {
            MediaBox.innerHTML = ''
            let sortByLikes = DataMediaById.sort((a, b) => {
                return b.likes - a.likes
            })
            console.log(sortByLikes)
            MediaBoxImageOrVideo(MediaBox, sortByLikes)
            IncrementLikesAndTotalLikes()
            setTimeout(() => {
                LightBox.init()
            }, 1000)
            return MediaBox
        }            
        case 'title': {
            MediaBox.innerHTML = ''
            let sortByTitle = DataMediaById.sort((a, b) => {
                if (a.title < b.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0
            })
            console.log(sortByTitle)
            MediaBoxImageOrVideo(MediaBox, sortByTitle)
            IncrementLikesAndTotalLikes()
            setTimeout(() => {
                LightBox.init()
            }, 1000)
            return MediaBox
        }            
        case 'date': {
            MediaBox.innerHTML = ''
            let sortByDates = DataMediaById.sort(function (a, b) {
                a = new Date(a.date)
                b = new Date(b.date)
                return a > b ? -1 : a < b ? 1 : 0
            })
            console.log(sortByDates)
            MediaBoxImageOrVideo(MediaBox, sortByDates)
            IncrementLikesAndTotalLikes()
            setTimeout(() => {
                LightBox.init()
            }, 1000)
            return MediaBox
        }           
        default:
            break
        }
    })
    const PictureSectionDiv = document.querySelector('.picture_section')
    PictureSectionDiv.appendChild(MediaBox)
}


let PhotographerBoxById = (DataPhotographeraById) => {
    console.log(DataPhotographeraById)
    const PhotographerBox = document.createElement('div')
    PhotographerBox.classList.add('profil-section_container')
    for (const element of DataPhotographeraById) {
        const picture = `assets/photographers/${element.portrait}`
        const affichage = `            
        <div class="profil-section_left">
            <h1>${element.name}</h1>
            <p>${element.city}, ${element.country}</p> 
            <span>${element.tagline}</span>
        </div>
        <div class="profil-section_middle">
            <div class="photograph-header">
                <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            </div>
        </div>
        <div class="profil-section_right">
             <img class="photographe-section_top__picture" src="${picture}" alt="Portait de ${element.name}">
        </div>
   `
        PhotographerBox.innerHTML += affichage

    }
    const PhotographerSectionDiv = document.querySelector('.photographer-container')
    PhotographerSectionDiv.appendChild(PhotographerBox)
}


let TotalLikeBox = (DataMediaById, DataPhotographeraById) => {
    let likeMedia = DataMediaById.map(
        (elt) => elt.likes
    )
    let price = DataPhotographeraById.map(
        (elt) => elt.price
    )
    const reducer = (accumulateur, currentValue) => accumulateur + currentValue
    let total = likeMedia.reduce(reducer, 0)

    const TotalContain = document.querySelector('.photographe-infos')
    TotalContain.innerHTML = `
        <div class="photographe-infos__likes">
            <p class="photographe-infos__totalLikes">${total}</p>
            <svg role="img" class="photographe-infos__heart" width="19" height="19" viewBox="0 0 19 19" fill="none"
            xmlns="http://www.w3.org/2000/svg" aria-describedby="title-${total} description-${total}">
            <title id="title-${total}">Likes</title>
            <desc id="description-${total}">Icone en forme de cœur</desc>
            <path
                d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z"
                fill="#000"></path>
            </svg>
        </div>
        <p class="infos__price">${price}€ / jour</p>
    `

}

let IncrementLikesAndTotalLikes = () => {
    const LikeContainerDiv = document.querySelectorAll('.photographe-container_global_bottom_Likes')
    LikeContainerDiv.forEach(like => {
        ['click', 'keyup'].forEach(event => like.addEventListener(event, (e) => {
            let TotalLikes = document.querySelector('.photographe-infos__totalLikes')
            if(e.key == 'Enter') {
                if (!like.classList.contains('liked')) {
                
                    AddLikesAndTotalLikes(TotalLikes, like)
                } else {
                    RemoveLikesAndTotalLikes(TotalLikes, like)
                }
            } else if (e.type == 'click')  {
                if (!like.classList.contains('liked')) {
                
                    AddLikesAndTotalLikes(TotalLikes, like)
                } else {
                    RemoveLikesAndTotalLikes(TotalLikes, like)
                }
            }



           
        }))

    })
}

let MediaBoxImageOrVideo = (MediaBox, tri) => {
    for (const element of tri) {
        if (element.video == undefined) {
            const picture = `assets/images/${element.photographerId}/${element.image}`
            MediaBox.innerHTML += `
            <div class="photographe-container_global"> 
                <div class="photographe-container_global_top">
                    <a href="${picture}">
                        <img class="photographe-container_global_top_picture" src="${picture}" alt="${element.description}">
                    </a>
                </div>
     
                <div class="photographe-container_global_bottom">
                    <h2 class="media_title" aria-label=”title” > ${element.title} </h2>
                    <div class="photographe-container_global_bottom_Likes" id="photographer-like" tabindex="0">
                        <p class="like_img" aria-label=”likes” > ${element.likes} </p>
                        <svg role="img" class="photographe-container_global_bottom_Likes_heart" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <title id="title-Wat">Likes</title>
                            <desc id="description-Wat">Icone en forme de cœur</desc>
                            <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"></path>
                        </svg>
                    </div>
                </div>               
            </div>            
            `
        } else {
            const video = `assets/images/${element.photographerId}/${element.video}`
            MediaBox.innerHTML += `
            <div class="photographe-container_global"> 
                <div class="photographe-container_global_top">
                    
                    <a href="${video}">
                        <div class="media__play"></div>
                        <video class="photographe-container_global_top_picture" title="${element.description}">
                            <source src="${video}" type="video/mp4">
                        </video>
                    </a>
                </div>     
                <div class="photographe-container_global_bottom">
                    <h2 class="media_title" aria-label=”title” > ${element.title} </h2>
                    <div class="photographe-container_global_bottom_Likes" id="photographer-like" tabindex="0">
                        <p class="like_img" aria-label=”likes” > ${element.likes} </p>
                        <svg role="img" class="photographe-container_global_bottom_Likes_heart" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <title id="title-Wat">Likes</title>
                            <desc id="description-Wat">Icone en forme de cœur</desc>
                            <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"></path>
                        </svg>
                    </div>
                </div>               
            </div>            
            `
        }


    }
}

let RemoveLikesAndTotalLikes = (totalLikes, like) => {
    --totalLikes.innerText
    --like.children[0].innerText
    like.classList.remove('liked')
}
let AddLikesAndTotalLikes = (totalLikes, like) => {
    ++totalLikes.innerText
    ++like.children[0].innerText
    like.classList.add('liked')
}


export {
    VariableInitializationForFunction
}