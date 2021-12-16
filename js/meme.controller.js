'use strict'

var gCanvas;
var gCtx;





function init() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
}

function onRenderMeme(imgId) {
    updateGMeme(imgId)
    renderMeme()
}


function renderMeme() {
    const meme = getMeme()
    const linesNum = meme.lines.length
    drawImg(meme,linesNum)
    document.querySelector('.pictures').style.display = 'none'
    document.querySelector('#gallery').style.display = 'none'
    document.querySelector('#about').style.display = 'none'
    document.querySelector('.create-meme-editor').style.display = 'flex'
    // document.querySelector('.create-meme-editor').style.flexDirection = 'column'
}


function drawImg(meme,linesNum) {
    var img = new Image()
    img.src = `../img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        for(var i = 0; i < linesNum; i++){
            drawText(meme.lines[i],i)
        }
    }
}

function getLineHeight(lineIdx) {
    var lineHeight;
    switch (lineIdx) {
        case 0:
            lineHeight = 40
            break;
        case 1:
            lineHeight = gCanvas.height-40
            break
    }
    return lineHeight
}


function drawText(memeLine, lineIdx) {
    if(!memeLine) return
    var lineHeight = getLineHeight(lineIdx)
    if(!memeLine.size) memeLine.size = 30
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.font = `${memeLine.size}px monospace`;
    gCtx.fillStyle = memeLine.color;
    gCtx.fillText(memeLine.txt, gCanvas.width / 2, lineHeight);

}


function onSetLineText(elInput) {
    const text = elInput.value
    setLineText(text)
    renderMeme()
}

function onSetLineIdx(lineIdx) {
    setLineIdx(lineIdx)
}

function onSetColor(elInput){
    const color = elInput.value
    setColor(color)
    renderMeme()
}

function onChangeFont(val){
    if(val === -1) decreaseFontSize()
    else increaseFontSize()
    renderMeme()
}

function onSwitchLines(){
    switchMemesInputs()
    switchLines()
    renderMeme()
}

function switchMemesInputs(){
    var elInput0 = document.querySelector('.line0').value
    document.querySelector('.line0').value = document.querySelector('.line1').value
    document.querySelector('.line1').value = elInput0
}
