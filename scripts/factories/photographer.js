let IdentityPhotographerBox = async (jsonData) => {   
    const data = await jsonData     
    const DataPhotographer = data.photographers  
    const PhotographerBox = document.createElement('div')
    PhotographerBox.classList.add('photographe-section_container')
    for (const element of DataPhotographer) {      
        const picture = `assets/photographers/${element.portrait}`
        const affichage = `
        <div class="photographe-section_profil">
            <div class="photographe-section_top"> 
                <a href="./photographer.html?id=${element.id}">                    
                    <img class="photographe-section_top__picture" src="${picture}" alt="Portrait de ${element.name}">
                    <h2>${element.name}</h2>                  
                </a>   
            </div>                
            <div class="photographe-section_middle">
                <p>${element.city}, ${element.country}</p> 
                
            </div>
            <div class="photographe-section_bottom">
                <p>${element.tagline}</p> 
                <span>${element.price}€/jour</span> 
            </div>    
        </div>
    `
    PhotographerBox.innerHTML += affichage    
    }
    const PhotographersSectionDiv = document.querySelector(".photographer_section")
    PhotographersSectionDiv.appendChild(PhotographerBox)
}

export {IdentityPhotographerBox}