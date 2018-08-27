var stage ;
var layer;
var me ;
var drawingRect;
var minWidth = 1;
var minHeight = 1;
$(function(){
	stage = new Konva.Stage({
		container:'#container',
		width:500,
		height:500,
	})
	
	layer = new Konva.Layer({});
	
	var circle = new Konva.Circle({
		x:stage.getWidth()/2,
		y:stage.getHeight()/2,
		radius:70,
		fill:'red',
		stroke:'black',
		strokeWidth:4
	})
	
	
	 var backImage = new Image(500,500);
            var background = new Konva.Image({
                x: 0,
                y: 0,
                width: 500,
                height: 500,
                opacity: 1
            });
            background.setZIndex(0);
            layer.add(background);
            layer.draw();
            backImage.onload = function() {

                background.setImage(backImage);

            }
	//layer.add(circle);
	stage.add(layer);
	//layer.draw()

    boxDrawer(layer, getPointerPosition, onCreateBox);
	layer.draw();
	
})

function boxDrawer(container,getPointerPosition,onCreateBox){
	me = this;
	this.container = container;
	drawingRect = false;
	console.log(container)
	container.on('mousedown',function(evt){
		console.log('ddddd')
		drawRectMouseDown(evt);
	});
	container.on('mousemove',function(evt){
		drawRectMouseMove(evt);
	});
	container.on('mouseup',function(evt){
		drawRectMouseUp(evt);
	})
	this.init = function() {
		var tempRect = new Konva.Rect({
			id: 'tbox',
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			stroke: 'red',
			name: 'tempRect',
			opacity: 0.2,
			fill: 'red',
			strokeWidth: 1
		});
		tempRect.sourceStrokeWidth = 1;
		container.add(tempRect);
	}
	this.resetTempRect = function() {
		var tempRect = me.getTempRect();
		tempRect.x(0);
		tempRect.y(0);
		tempRect.width(0);
		tempRect.height(0);
	}
	this.getTempRect = function() {
		return this.container.find('#tbox')[0];
	}
	this.init();
	
}

function getPointerPosition(){
	var pointerPosition = stage.getPointerPosition();
	pointerPosition = layer.getAbsoluteTransform().copy().invert().point(pointerPosition); 
	return pointerPosition;
}

function onCreateBox(pos){
	var rect = new Konva.Rect({
		x:pos.x,
		y:pos.y,
		width:pos.width,
		height:pos.height,
		stroke:'green',
		name:'rect',
		opacity:0.3,
		fill:'green',
		strokeWidth:1,
		draggable:true
	});
	
	layer.add(rect);
	rect.on('dblclick',function(){
		
	});
	rect.on('click',function(){
		
	});
	rect.on('mousedown',function(evt){
		rect.active = true;
	});
	
	var hintText = new Konva.Text({
		name:'hintText',
		x:pos.x,
		y:pos.y,
		text:'显示信息',
		fontSize :15,
		fill:'red',
		shadowColor:'#bobobo',
		shadowBlur:0.1,
		shadowOffset:{
			x:1,
			y:1
		}
	})
	rect.$hintText = hintText;
	layer.add(hintText);
	rect.active = true;
    layer.draw();
	
}

function drawRectMouseDown(evt){
	console.log('down')
	// if (evt.evt.button !== 0) return;
	 var tempRect = me.getTempRect();
	 drawingRect = true;
	 var pos = getPointerPosition();
	 tempRect.x(pos.x);
	 tempRect.y(pos.y);
	 layer.draw();
}

function drawRectMouseMove(evt){
	if (!drawingRect) return;
	console.log('move');
	var tempRect = me.getTempRect();
	var pos = getPointerPosition();
	var width = pos.x - tempRect.x(),
		height = pos.y - tempRect.y();
	tempRect.width(width);
    tempRect.height(height);
	layer.draw(); 
}

function drawRectMouseUp(evt){
	console.log('up')
	 drawingRect = false;
	var tempRect = me.getTempRect();
	if (tempRect.width() > minWidth && tempRect.height() > minHeight) {
		onCreateBox({
			x: tempRect.x(),
			y: tempRect.y(),
			width: tempRect.width(),
			height: tempRect.height()
		})
	}
	me.resetTempRect();
	me.container.draw(true);
}