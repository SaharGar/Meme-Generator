'use strict'

function onInit(){
    initGallery()
    initMemes()
    initCanvas()
}

function onShowMemePage(){
    document.getElementById('memes').style.display = 'block'
    document.getElementById('about').style.display = 'none'
    document.getElementById('gallery').style.display = 'none'
    document.querySelector('.create-meme-editor').style.display = 'none'
    renderMemesPage()
    resetCanvasPage()
}


function onShowMainPage(){
    document.getElementById('memes').style.display = 'none'
    document.getElementById('about').style.display = 'flex'
    document.getElementById('gallery').style.display = 'block'
    document.querySelector('.create-meme-editor').style.display = 'none'
    resetCanvasPage()
}

function toggleHamburgerMenu(){
    document.body.classList.toggle('menu-open')
}