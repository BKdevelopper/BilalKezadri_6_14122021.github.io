export default class LightBox {

    static init() {
        console.log(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'))
        const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'))
        const gallery = links.map(link => link.getAttribute('href'))
        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            const titles = document.querySelectorAll('.media_title')
            const index = gallery.indexOf(e.currentTarget.getAttribute('href'))
            new LightBox(e.currentTarget.getAttribute('href'), gallery, titles, index)
        }))
    }
    constructor(url, media, title, index) {
        this.index = index
        this.element = this.buildDOM()
        this.title = title
        this.media = media
        this.loadImage(url, this.title, this.index)
        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element)
        document.addEventListener('keyup', this.onKeyUp)
        document.querySelector('.lightbox__next').focus()
        document.querySelector('.main').setAttribute('aria-hidden', true)
    }

    loadImage(url, titles, index) {
        this.url = null
        
        const container = this.element.querySelector('.lightbox__container')
        const loader = document.createElement('div')
        loader.classList.add('lightbox__loader')
        container.innerHTML = ''
        container.appendChild(loader)
        this.url = url
        console.log(url.includes('.jpg'))
        if(url.includes('.jpg')){
            const image = new Image()
            image.onload = () => {
                container.removeChild(loader)
                container.appendChild(image)                
            }
            image.classList.add('lightbox__media')
            image.src = url
        }
		if (url.includes('.mp4')) {
			let video = document.createElement('video')
			video.onloadeddata = () => {
				container.removeChild(loader)
				container.appendChild(video)
			}
			video.setAttribute('src', url)
			video.setAttribute('controls', 'controls')
			video.classList.add('lightbox__media')
		}        
       
        let titleArray = []
        titles.forEach(title => {
            titleArray.push(title.innerHTML)
        })
        const lightboxContainer = this.element.querySelector('.lightbox__container')
        const title = document.querySelector('.lightbox__title')
        if (title) {
            lightboxContainer.removeChild(title)
        }
        const titleElement = document.createElement('h2')
        titleElement.classList.add('lightbox__title')
        titleElement.innerHTML = titleArray[index]
        lightboxContainer.appendChild(titleElement)
    }
    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.close(e)
        } else if (e.key === 'ArrowLeft') {
            this.prev(e)
        } else if (e.key === 'ArrowRight') {
            this.next(e)
        }
    }
    close(e) {
        e.preventDefault()
        this.element.classList.add('fadeOut')
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        }, 500)
        document.removeEventListener('keyup', this.onKeyUp)
        document.querySelector('.main').setAttribute('aria-hidden', false)
        const media = document.querySelectorAll('.photographe-container_global_top_picture')
        media.forEach(media => {
            media.parentNode.focus()
        })
        
    }
    next(e) {
        e.preventDefault()
        let i = this.media.findIndex(media => media === this.url)
        if (i === this.media.length - 1) {
            i = -1
        }
        this.index = this.index + 1
        if (this.index == this.media.length) {
            this.index = 0
        }
        this.loadImage(this.media[i + 1], this.title, this.index)
    }
    prev(e) {
        e.preventDefault()
        let i = this.media.findIndex(media => media === this.url)
        if (i === 0) {
            i = this.media.length
        }
        this.index = this.index - 1
        if (this.index == -1) {
            this.index = this.media.length - 1
        }
        this.loadImage(this.media[i - 1], this.title, this.index)
    }
    buildDOM() {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `
        <button class="lightbox__close" tabindex="0"></button>
        <button class="lightbox__next" tabindex="0"></button>
        <button class="lightbox__prev" tabindex="0"></button>       
        <div class="lightbox__container"></div>              
        `
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
        dom.setAttribute('aria-label', 'image closeup view')
        return dom
    }


}

// setTimeout(() => {
//         LightBox.init()	
//     }, 1000)