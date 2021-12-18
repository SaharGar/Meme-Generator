'use strict'

const gImgs = _createGallery()
var gLineIdx = 0
var gPrevLineIdx;
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'Lets Write a Meme!',
            isDrag: false
        }
    ]
}

function _createGallery() {
    const gallery = []
    for (var i = 1; i <= 18; i++) {
        var img = _createImage(i)
        gallery.push(img)
    }
    return gallery
}

function _createImage(id) {
    const img = {
        id,
        url: `img/${id}.jpg`,
    }
    return img
}

function getGallery() {
    return gImgs
}


function updateGMeme(imgId) {
    gMeme.selectedImgId = imgId
}

function getMeme() {
    return gMeme
}

function getLineIdx(){
    return gLineIdx
}

function setLineText(txt) {
    gMeme.lines[gLineIdx].txt = txt
}

function addLine(){
    gLineIdx = gMeme.lines.length
    gMeme.lines.push({
        isDrag: false,
    })
}

function getMemeInput(){
    if(!gMeme.lines[gLineIdx].txt) return false
    var txt = gMeme.lines[gLineIdx].txt
    return txt    
}

function setColor(val,color){
    if(val === 0) gMeme.lines[gLineIdx].stroke = color
    if(val === 1) gMeme.lines[gLineIdx].fill = color
}

function increaseFontSize(){
    gMeme.lines[gLineIdx].size ++
}

function decreaseFontSize(){
     gMeme.lines[gLineIdx].size --
}

function changeMemeFont(font){
    gMeme.lines[gLineIdx].font = font
}

function switchLines(){
    if(gMeme.lines.length === 1) return
    
    gPrevLineIdx = gLineIdx -1
    if(gLineIdx === gMeme.lines.length - 1) gLineIdx = 0
    else {
        gLineIdx ++
    }
}

function removeLine(){
    gMeme.lines.splice(gPrevLineIdx,1)
    gLineIdx = gPrevLineIdx
}

function deleteLine(){
    gMeme.lines.splice(gLineIdx,1)
    gLineIdx = gPrevLineIdx
}

function checkForTxt(){
    if(!gMeme.lines[gLineIdx].txt) return false
}

function alignText(val){
    if(val === -1) gMeme.lines[gLineIdx].align = 'left'
    if(val === 0) gMeme.lines[gLineIdx].align = 'center'
    if(val === 1) gMeme.lines[gLineIdx].align = 'right'
}

function resetGMeme(){
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
    
        lines: [
            {
                txt: 'Lets Write a Meme!',
            }
        ]
    }

    gLineIdx = 0
}