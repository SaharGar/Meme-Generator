'use strict'

function initGallery(){
    renderGallery()
}

function renderGallery(){
    const imgs = getGallery()
    const strHTML = imgs.map(img => {
        return `<div class="img-container"><img src="${img.url}" onclick="onRenderCanvas(${img.id})"></div>`
    })
    document.querySelector('.pictures').innerHTML = strHTML.join('')
}



