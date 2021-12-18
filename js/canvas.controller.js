'use strict'
var gCanvas;
var gCtx;
var gStartPos;

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


function initCanvas(){
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    addListeners()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function getCanvas(){
    return gCanvas
}

function onRenderCanvas(imgId) {
    updateGMeme(imgId)
    renderCanvas()
}

function renderCanvas() {
    const meme = getMeme()
    const linesNum = meme.lines.length
    drawImg(meme,linesNum)
    document.querySelector('#gallery').style.display = 'none'
    document.querySelector('#about').style.display = 'none'
    document.querySelector('.create-meme-editor').style.display = 'flex'
}

function drawImg(meme,linesNum) {
    var img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        for(var i = 0; i < linesNum; i++){
            drawText(meme.lines[i],i)
        }
    }
}

function getLineHeight(lineIdx) {
    var lineHeight;

    if(lineIdx === 0)  lineHeight = 40
    else if (lineIdx === 1) lineHeight = gCanvas.height - 40
    else lineHeight = gCanvas.height / 2
    return lineHeight
}

function drawText(memeLine, lineIdx) {
    if(!memeLine) return
    if(!memeLine.size) memeLine.size = 20
    if(!memeLine.font) memeLine.font = 'impact'
    var lineHeight = getLineHeight(lineIdx)
    if(!memeLine.pos){
        memeLine.pos = {
            x: gCanvas.width/2,
            y: lineHeight
        }
    }
    var align = (memeLine.align)? memeLine.align : 'center'
    var strokeColor = (memeLine.stroke)? memeLine.stroke : 'black'
    var fillColor = (memeLine.fill)? memeLine.fill : 'black'
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = align
    gCtx.font = `${memeLine.size}px ${memeLine.font}`
    gCtx.lineWidth = 1
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.fillText(memeLine.txt, memeLine.pos.x, memeLine.pos.y)
    gCtx.strokeText(memeLine.txt, memeLine.pos.x, memeLine.pos.y)
}

function onSetLineText(text) {
    setLineText(text)
    renderCanvas()
}

function onAddLine(){
    addLine()
    document.querySelector('.meme-input').value = ''

}

function onDeleteLine(){
    deleteLine()
    const meme = getMeme()
    const line = getLineIdx()
    document.querySelector('.meme-input').value =''
    renderCanvas()
}

function onChangeMemeFont(font){
    changeMemeFont(font)
    renderCanvas()
}

function onSetColor(val,elColor){
    const color = elColor
    setColor(val,color)
    renderCanvas()
}

function onChangeFont(val){
    if(val === -1) decreaseFontSize()
    else increaseFontSize()
    renderCanvas()
}

function onSwitchLines(){
    var check = checkForTxt()
    switchLines()
    var elInput =  document.querySelector('.meme-input')
    elInput.value = getMemeInput()
    if(check === false){
        removeLine()
        return
    } 
    renderCanvas()
}

function onAlignText(val){
    alignText(val)
    renderCanvas()
}

function resetCanvasPage(){
    resetGMeme()
    resetMemesInputs()
    resetFontsSelect()
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const meme = getMeme()
    const line = getLineIdx()
    if (!meme.lines[line].isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)
    gStartPos = pos
    renderCanvas()

}

function onUp() {
    setTextDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    // console.log(pos)
    return pos
}

function isTextClicked(posClicked) {
    const line = getLineIdx()
    const meme = getMeme()
    const currLine = meme.lines[line]
    const x = currLine.pos.x
    const y = currLine.pos.y 
    const width = gCtx.measureText(currLine.txt).width + 20
    const height = currLine.size + 20
    return Math.abs(posClicked.x - x) <= width / 2 && Math.abs(posClicked.y - y) <= height / 2;
}

function setTextDrag(isDrag) {
    const meme = getMeme()
    const line = getLineIdx()
    meme.lines[line].isDrag = isDrag
}

function moveText(dx, dy) {
    const meme = getMeme()
    const line = getLineIdx()
    meme.lines[line].pos.x += dx
    meme.lines[line].pos.y += dy
}

