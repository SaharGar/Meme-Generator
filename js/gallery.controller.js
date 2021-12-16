'use strict'


renderGallery()

function renderGallery(){
    const imgs = getGallery()
    const strHTML = imgs.map(img => {
        return `<div class="img-container"><img src="${img.url}" onclick="onRenderMeme(${img.id})"></div>`
    })
    document.querySelector('.pictures').innerHTML = strHTML.join('')
}


function toggleHamburgerMenu(){
    document.body.classList.toggle('menu-open')
}

function check(){
    console.log('hi')
}