'use strict'

const STORAGE_KEY = 'memeDB'
var gSavedMemes;



function initMemes() {
    gSavedMemes = loadFromStorage(STORAGE_KEY)
    if(!gSavedMemes || gSavedMemes.length === 0 ) gSavedMemes = []
}


function drawBackground(lineIdx) {
    var lineHeight = getLineHeight(lineIdx)
    // var backgroundPos = (lineIdx = 0)? lineHeight/3 : lineHeight
    gCtx.rect(gCanvas.width/8, lineHeight/3, 400, 50);
    gCtx.fillStyle = 'white'
    gCtx.fillRect(gCanvas.width/8, lineHeight/3, 400, 50);
    // gCtx.strokeStyle = 'white';
    gCtx.stroke();
}


function resetMemesInputs(){
    document.querySelector('.meme-input').value = ''
}

function resetFontsSelect(){
    document.querySelector('.font').value = 'impact'
}

function onDownloadMeme(elLink){
    var imgContent = gCanvas.toDataURL('image/jpg')
    elLink.href = imgContent
    elLink.download = 'My Meme.jpg'
}

function onSaveMeme(){
    const meme = new Image()
    meme.src = gCanvas.toDataURL()
    gSavedMemes.push(meme.src)
    saveToStorage(STORAGE_KEY,gSavedMemes)
    showSavingModal()
}

function renderMemesPage(){
    const imgs = gSavedMemes
    const strHTML = imgs.map((img,idx) => {
        return `<div class="flex saved-meme img-container"><img src="${img}"> <br>
         <button class="delete-saved-btn" onclick="deleteSavedMeme(${idx})">Delete Meme</button>
        </div>`
    })
    document.querySelector('.memes-container').innerHTML = strHTML.join('')
}


function deleteSavedMeme(idx){
    gSavedMemes.splice(idx,1)
    saveToStorage(STORAGE_KEY,gSavedMemes)
    renderMemesPage()
}

function onShareOnFacebook(){
    uploadImg()
}

function showSavingModal(){
    document.querySelector('.saved-meme-msg').classList.toggle('showed')

    setTimeout(closeSavingModal,2000)
}

function closeSavingModal(){
    document.querySelector('.saved-meme-msg').classList.toggle('showed')
}