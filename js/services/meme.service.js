'use strict'

const gImgs = _createGallery()
var gLineIdx = 0
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'Lets Write a Meme!',
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
        url: `../img/${id}.jpg`,
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

function setLineText(txt) {
    gMeme.lines[gLineIdx].txt = txt
}

function setLineIdx(lineIdx){
    gLineIdx = lineIdx
    if(gLineIdx > 0) gMeme.lines.push({})
}

function setColor(color){
    gMeme.lines[gLineIdx].color = color
}

function increaseFontSize(){
    gMeme.lines[gLineIdx].size ++
}

function decreaseFontSize(){
     gMeme.lines[gLineIdx].size --
}

function switchLines(){
    const line = gMeme.lines[0]
    gMeme.lines[0] = gMeme.lines[1]
    gMeme.lines[1] = line
}