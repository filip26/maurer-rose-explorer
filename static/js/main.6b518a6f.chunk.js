(this["webpackJsonpmaurer-rose-explorer"]=this["webpackJsonpmaurer-rose-explorer"]||[]).push([[0],{31:function(e,t,n){},32:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var i=n(3),a=n(1),r=n.n(a),o=n(14),s=n.n(o),c=(n(31),n(32),n(8)),l=n.n(c),h=n(11),u=n(4),d=n(18),f=n(24),v=n(23),x=n(6),g=n(60),p=n(55),m=n(59),w=n(57),b=n(56),T=function e(t){var n=this;Object(u.a)(this,e),this.bind=function(e){n.ref=e,e.addEventListener("wheel",n.handleMouseWheel,!1),e.addEventListener("mousedown",n.handleMouseDown,!1),e.addEventListener("mouseup",n.handleMouseUp,!1),e.addEventListener("mousemove",n.handleMouseMove,!1),e.addEventListener("mouseout",n.handleMouseOut,!1)},this.unbind=function(){n.ref&&(n.ref.removeEventListener("wheel",n.handleMouseWheel),n.ref.removeEventListener("mousedown",n.handleMouseDown),n.ref.removeEventListener("mouseup",n.handleMouseUp),n.ref.removeEventListener("mousemove",n.handleMouseMove),n.ref.removeEventListener("mouseout",n.handleMouseOut))},this.handleMouseWheel=function(e){n.isMouseDown=!1;var t=n.scene.zoom;return e.deltaY<0?t-=.1:e.deltaY>0&&(t+=.1),t<.5&&(t=.5),n.scene.updateZoom(t),!1},this.handleMouseDown=function(e){return n.isMouseDown?n.isMouseDown=!1:(n.lastDragCoords=[e.pageX,e.pageY],n.isMouseDown=!0),e.preventDefault(),!1},this.handleMouseUp=function(e){return n.isMouseDown=!1,e.preventDefault(),!1},this.handleMouseMove=function(e){if(n.isMouseDown){var t=(e.pageX-n.lastDragCoords[0])/(n.scene.width*n.scene.aspect.y)*3/n.scene.zoom,i=(e.pageY-n.lastDragCoords[1])/(n.scene.height*n.scene.aspect.x)*3*-1/n.scene.zoom;return n.lastDragCoords=[e.pageX,e.pageY],n.scene.translate(t,i),e.preventDefault(),!1}},this.handleMouseOut=function(e){n.isMouseDown=!1},this.scene=t},y=function e(t){var n=this;Object(u.a)(this,e),this.bind=function(e){n.ref=e,window.addEventListener("keydown",n.handleKeyDown)},this.unbind=function(){n.ref&&window.removeEventListener("keydown",n.handleKeyDown)},this.handleKeyDown=function(e){var t=n.scene.tile.width/(2*n.scene.zoom),i=n.scene.tile.height/(2*n.scene.zoom);38===e.keyCode?n.scene.translate(0,i):40===e.keyCode?n.scene.translate(0,-i):37===e.keyCode?n.scene.translate(-t,0):39===e.keyCode&&n.scene.translate(t,0)},this.scene=t},A=function e(t){var n=this;Object(u.a)(this,e),this.bind=function(e){n.ref=e,n.ref.addEventListener("touchmove",n.handleTouchMove,!1),n.ref.addEventListener("touchstart",n.handleTouchStart,!1),n.ref.addEventListener("touchend",n.handleTouchEnd,!1),n.ref.addEventListener("touchcancel",n.handleTouchCancel,!1)},this.unbind=function(){n.ref&&(n.ref.removeEventListener("touchcancel",n.handleTouchMove),n.ref.removeEventListener("touchend",n.handleTouchEnd),n.ref.removeEventListener("touchstart",n.handleTouchStart),n.ref.removeEventListener("touchmove",n.handleTouchMove))},this.handleTouchMove=function(e){if(1===n.events.length){if(n.lastTouchCoords){var t=(e.changedTouches[0].pageX-n.lastTouchCoords[0])/(n.scene.width*n.scene.aspect.y)*3/n.scene.zoom,i=(e.changedTouches[0].pageY-n.lastTouchCoords[1])/(n.scene.height*n.scene.aspect.x)*3*-1/n.scene.zoom;n.scene.translate(t,i)}n.lastTouchCoords=[e.changedTouches[0].pageX,e.changedTouches[0].pageY]}else if(2===n.events.length){for(var a=0;a<n.events.length;a++)if(e.changedTouches[0].identifier===n.events[a].changedTouches[0].identifier){n.events[a]=e;break}var r=Math.sqrt(Math.pow(n.events[0].changedTouches[0].clientX-n.events[1].changedTouches[0].clientX,2)+Math.pow(n.events[0].changedTouches[0].clientY-n.events[1].changedTouches[0].clientY,2)),o=n.scene.zoom;n.prevDist>0&&(r>n.prevDist&&(o+=.04*o),r<n.prevDist&&(o-=.04*o),o<.5&&(o=.5),n.scene.updateZoom(o)),n.prevDist=r}return e.preventDefault(),!1},this.handleTouchStart=function(e){if(0===n.events.length){var t=(new Date).getTime()-n.lastTouchTime;if(t<300&&t>0){var i=n.scene.zoom;return(i+=.5*i)<.5&&(i=.5),n.scene.updateZoom(i),n.lastTouchTime=0,e.preventDefault(),!1}n.lastTouchCoords=[e.changedTouches[0].pageX,e.changedTouches[0].pageY],n.lastTouchTime=(new Date).getTime(),n.events.push(e)}else 1===n.events.length&&n.events.push(e);return e.preventDefault(),!1},this.handleTouchEnd=function(e){return n.events=[],n.lastTouchCoords=null,n.prevDist=-1,e.preventDefault(),!1},this.handleTouchCancel=function(e){n.events=[],n.lastTouchCoords=null,n.prevDist=-1,n.lastTouchTime=0},this.scene=t,this.events=[],this.prevDistance=-1,this.lastTouchTime=0},E=40,M="#dadadaff",z=function e(){var t=this;Object(u.a)(this,e),this.initialize=function(){var e=Object(h.a)(l.a.mark((function e(n){var i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i=n.getContext("2d")){e.next=3;break}return e.abrupt("return",Promise.reject("2d canvas is not supported by your browser."));case 3:return t.ctx=i,e.abrupt("return",Promise.resolve());case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.draw=function(){t.ctx.clearRect(0,0,t.ctx.canvas.width,t.ctx.canvas.height),t.drawLegend()},this.update=function(e){var n=e.aspect,i=e.center,a=e.zoom,r=e.tile,o=e.width,s=e.height,c=o/2+o*n.y*a*(i.x/2),l=s/2-s*n.x*a*(i.y/2),h=1===n.y?r.pixelWidth:r.pixelHeight;t.xAxis={start:(c/h-Math.floor(c/h))*h,label:-1*Math.floor(c/h),size:h},t.yAxis={start:(l/h-Math.floor(l/h))*h,label:-1*Math.floor(l/h),size:h}},this.drawScene=function(){if(t.xAxis&&t.yAxis){t.ctx.fillStyle=M,t.ctx.fillRect(0,0,t.ctx.canvas.width,E),t.ctx.fillRect(0,0,E,t.ctx.canvas.height),t.ctx.save(),t.ctx.beginPath(),t.ctx.fillStyle="#3a3a3aff",t.ctx.font="300 13px sans-serif",t.ctx.textAlign="center",t.ctx.textBaseline="middle";var e=t.yAxis.label;t.ctx.fillText(e-1,20,t.yAxis.start-t.yAxis.size/2);for(var n=t.yAxis.start;n<t.ctx.canvas.height;n+=t.yAxis.size)t.ctx.fillText(e++,20,n+t.yAxis.size/2),t.ctx.moveTo(0,n),t.ctx.lineTo(E,n);var i=t.xAxis.label;t.ctx.fillText(i-1,t.xAxis.start-t.xAxis.size/2,20);for(var a=t.xAxis.start;a<t.ctx.canvas.width;a+=t.xAxis.size)t.ctx.fillText(i++,a+t.xAxis.size/2,20),t.ctx.moveTo(a,0),t.ctx.lineTo(a,E);t.ctx.closePath(),t.ctx.lineWidth=1,t.ctx.strokeStyle="#ffffffff",t.ctx.stroke(),t.ctx.restore(),t.ctx.fillStyle=M,t.ctx.fillRect(0,0,E,E),t.ctx.strokeStyle="#eaeaeaff",t.ctx.beginPath(),t.ctx.lineWidth=2,t.ctx.moveTo(39,0),t.ctx.lineTo(39,39),t.ctx.moveTo(0,39),t.ctx.lineTo(39,39),t.ctx.moveTo(39,39),t.ctx.lineTo(39,t.ctx.canvas.height),t.ctx.moveTo(39,39),t.ctx.lineTo(t.ctx.canvas.width,39),t.ctx.closePath(),t.ctx.stroke()}},this.drawLegend=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:70;t.ctx.save(),t.ctx.translate(t.ctx.canvas.width-e-5,t.ctx.canvas.height-e-5),t.ctx.fillStyle="#666666aa",t.ctx.fillRect(0,0,e,e),t.ctx.beginPath(),t.ctx.moveTo(e/3,5),t.ctx.lineTo(e/3,e-5),t.ctx.lineTo(e/3-4,e-e/8-5),t.ctx.moveTo(e/3,e-5),t.ctx.lineTo(e/3+4,e-e/8-5),t.ctx.moveTo(5,e/3),t.ctx.lineTo(e-5,e/3),t.ctx.lineTo(e-e/8-5,e/3-4),t.ctx.moveTo(e-5,e/3),t.ctx.lineTo(e-e/8-5,e/3+4),t.ctx.moveTo(0,0),t.ctx.lineTo(0,e),t.ctx.lineTo(e,e),t.ctx.lineTo(e,0),t.ctx.lineTo(0,0),t.ctx.closePath(),t.ctx.lineWidth=1,t.ctx.strokeStyle="#ffffffff",t.ctx.stroke(),t.ctx.font="300 14px Roboto",t.ctx.fillStyle="#357a38",t.ctx.fillStyle="#ffffffff",t.ctx.textAlign="left",t.ctx.fillText("d",e/3+7,e-7),t.ctx.textAlign="right",t.ctx.fillText("n",e-7,e/3-7),t.ctx.restore()}},S=function e(){var t=this;Object(u.a)(this,e),this.createBuffer=function(){return t.gl.createBuffer()},this.createIndexBuffer=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=t.gl.createBuffer();return t.gl.bindBuffer(t.gl.ELEMENT_ARRAY_BUFFER,i),t.gl.bufferData(t.gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(e),n?t.gl.DYNAMIC_DRAW:t.gl.STATIC_DRAW),t.gl.bindBuffer(t.gl.ELEMENT_ARRAY_BUFFER,null),i},this.updateBuffer=function(e,n){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];t.gl.bindBuffer(t.gl.ARRAY_BUFFER,e),t.gl.bufferData(t.gl.ARRAY_BUFFER,new Float32Array(n),i?t.gl.DYNAMIC_DRAW:t.gl.STATIC_DRAW),t.gl.bindBuffer(t.gl.ARRAY_BUFFER,null)},this.initialize=function(){var e=Object(h.a)(l.a.mark((function e(n){var i,a,r,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i=n.getContext("webgl")){e.next=3;break}return e.abrupt("return",Promise.reject("WebGL is not supported by your browser."));case 3:return"attribute vec2 coordinates;uniform mat4 scale;uniform vec4 translation;attribute vec3 color;varying vec3 vColor;void main(void) { gl_Position = scale * (vec4(coordinates, 0.0, 1.0) + translation) ; gl_PointSize = 5.0; vColor = color;}",a=i.createShader(i.VERTEX_SHADER),i.shaderSource(a,"attribute vec2 coordinates;uniform mat4 scale;uniform vec4 translation;attribute vec3 color;varying vec3 vColor;void main(void) { gl_Position = scale * (vec4(coordinates, 0.0, 1.0) + translation) ; gl_PointSize = 5.0; vColor = color;}"),i.compileShader(a),"precision mediump float;varying vec3 vColor;void main(void) {gl_FragColor = vec4(vColor, 1.);}",r=i.createShader(i.FRAGMENT_SHADER),i.shaderSource(r,"precision mediump float;varying vec3 vColor;void main(void) {gl_FragColor = vec4(vColor, 1.);}"),i.compileShader(r),o=i.createProgram(),i.attachShader(o,a),i.attachShader(o,r),i.linkProgram(o),i.useProgram(o),t.attrCoord=i.getAttribLocation(o,"coordinates"),t.attrColor=i.getAttribLocation(o,"color"),t.attrTranslation=i.getUniformLocation(o,"translation"),t.uniformScaleMatrix=i.getUniformLocation(o,"scale"),t.gl=i,t.program=o,e.abrupt("return",Promise.resolve());case 23:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.update=function(e){for(var n=e.aspect,i=e.center,a=e.zoom,r=e.tile,o=e.objects3d,s=r.uniformSize,c=i.x/s*-1,l=i.y/s*-1,h=Math.floor(c-1/(s*a*n.y)),u=-1*Math.ceil(l+1/(s*a*n.x)),d=Math.floor(c+1/(s*a*n.y)),f=-1*Math.ceil(l-1/(s*a*n.x)),v=new Array(Math.abs(f-u)+1),x=0;x<v.length;x++){v[x]=new Array(Math.abs(d-h)+1);for(var g=0;g<v[x].length;g++)v[x][g]=!1}var p=[];for(var m in o)o[m].x&&o[m].y?o[m].x>=h&&o[m].x<=d&&o[m].y>=u&&o[m].y<=f?v[Math.abs(o[m].y-u)][Math.abs(o[m].x-h)]=!0:(p.push(o[m]),o[m].x=null,o[m].y=null):p.push(o[m]);for(var w=0,b=u;b<=f&&!(w>=p.length);b++)for(var T=h;T<=d&&(v[Math.abs(b-u)][Math.abs(T-h)]||(p[w].compute(T,b,t),!(++w>=p.length)));T++);},this.draw=function(){},this.drawScene=function(e,n){t.gl.viewport(0,0,t.gl.canvas.width,t.gl.canvas.height),t.gl.useProgram(t.program),t.gl.clearColor(.95,.95,.95,1),t.gl.clear(t.gl.COLOR_BUFFER_BIT),t.gl.disable(t.gl.DEPTH_TEST),t.gl.enable(t.gl.DITHER),e&&e.flatMap((function(e){return e.shapes()})).forEach((function(e){return t.drawShape(e,n)}))},this.drawShape=function(e,n){var i=n.aspect,a=n.zoom,r=n.center;e.colorBuffer?(t.gl.bindBuffer(t.gl.ARRAY_BUFFER,e.colorBuffer),t.gl.vertexAttribPointer(t.attrColor,3,t.gl.FLOAT,!1,0,0),t.gl.enableVertexAttribArray(t.attrColor)):t.gl.disableVertexAttribArray(t.attrColor),t.gl.bindBuffer(t.gl.ARRAY_BUFFER,e.vertexBuffer),e.indexBuffer&&t.gl.bindBuffer(t.gl.ELEMENT_ARRAY_BUFFER,e.indexBuffer),t.gl.vertexAttribPointer(t.attrCoord,2,t.gl.FLOAT,!1,0,0),t.gl.enableVertexAttribArray(t.attrCoord),e.scaleFnc&&t.gl.uniformMatrix4fv(t.uniformScaleMatrix,!1,e.scaleFnc(i,a));var o=e.translateFnc?e.translateFnc(i,r):r;t.gl.uniform4f(t.attrTranslation,o.x,o.y,0,0);var s=t.gl.POINTS;switch(e.styleName){case"line-loop":s=t.gl.LINE_LOOP;break;case"line-strip":s=t.gl.LINE_STRIP;break;case"lines":s=t.gl.LINES;break;case"triangles":s=t.gl.TRIANGLES}e.indexBuffer?t.gl.drawElements(s,e.length,t.gl.UNSIGNED_SHORT,e.offset):t.gl.drawArrays(s,e.offset,e.length)}},j=function e(t){var n=this;Object(u.a)(this,e),this.bind=function(e){n.buffer=e.createBuffer()},this.compute=function(e,t,i){n.x=e,n.y=t,n.tX=n.x*n.width+n.width/2,n.tY=-n.y*n.width-n.width/2,n.vertices=new Array(360),n.v(e,t,0,0,n.vertices,0),i.updateBuffer(n.buffer,n.vertices,!0)},this.shapes=function(){return n.vertices&&n.x&&n.y?[{vertexBuffer:n.buffer,offset:0,length:n.vertices.length/2,styleName:"line-loop",scaleFnc:function(e,t){return n.createScaleMatrix(e.y*t,e.x*t)},translateFnc:function(e,t){return n.translate(t)}}]:[]},this.createScaleMatrix=function(e,t){return new Float32Array([e,0,0,0,0,t,0,0,0,0,1,0,0,0,0,1])},this.translate=function(e){return{x:e.x+n.tX,y:e.y+n.tY}},this.v=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:4,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:31,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4?arguments[4]:void 0,r=arguments.length>5?arguments[5]:void 0,o=0;o<360;o+=1){var s=o*t*Math.PI/180,c=.1*Math.sin(e*s),l=c*Math.cos(s),h=c*Math.sin(s);a[r+2*o]=l+n,a[r+2*o+1]=h-i}return r+720},this.width=t,this.buffer=null,this.state="empty"},R=10,C=function e(){var t=this;Object(u.a)(this,e),this.initialize=function(){var e=Object(h.a)(l.a.mark((function e(n,i){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.canvas3d.initialize(i).then((function(){return t.canvas2d.initialize(n)})).then((function(){for(var e=0;e<20;e++)for(var n=0;n<20;n++){var i=new j(t.tile.uniformSize);i.bind(t.canvas3d),t.objects3d.push(i)}})));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),this.updateSize=function(e,n){t.width=e,t.height=n,t.aspect.x=Math.max(t.width/t.height,1),t.aspect.y=Math.max(t.height/t.width,1),t.tile.pixelWidth=t.width/(R*t.aspect.y)*t.zoom,t.tile.pixelHeight=t.height/(R*t.aspect.x)*t.zoom,t.canvas.forEach((function(e){return e.update(t)}))},this.updateZoom=function(e){t.zoom=e,t.tile.pixelWidth=t.width/(R*t.aspect.y)*t.zoom,t.tile.pixelHeight=t.height/(R*t.aspect.x)*t.zoom,t.canvas.forEach((function(e){return e.update(t)})),window.requestAnimationFrame(t.redraw)},this.translate=function(e,n){t.center={x:t.center.x+e,y:t.center.y+n},t.canvas.forEach((function(e){return e.update(t)})),window.requestAnimationFrame(t.redraw)},this.redraw=function(){t.canvas2d.drawScene(),t.canvas3d.drawScene(t.objects3d,t)},this.draw=function(){t.canvas.forEach((function(e){return e.draw()})),t.redraw()},this.zoom=1,this.center={x:-5.12,y:2.69},this.aspect={x:1,y:1},this.tile={uniformSize:.2,width:2/(R*this.aspect.y),height:2/(R*this.aspect.x)},this.objects3d=[],this.canvas3d=new S,this.canvas2d=new z,this.canvas=[this.canvas2d,this.canvas3d]},D=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(e){var i;return Object(u.a)(this,n),(i=t.call(this,e)).handleResize=function(){i.resizeTimeout&&clearTimeout(i.resizeTimeout),i.resizeTimeout=setTimeout(i.updateDimensions,125)},i.updateDimensions=function(){i.updateCanvasSize().then((function(){i.scene.updateSize(i.state.pixelWidth,i.state.pixelHeight),window.requestAnimationFrame(i.scene.draw)}))},i.updateCanvasSize=Object(h.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){var t=window.innerWidth-1,n=window.innerHeight-65;i.setState({pixelWidth:t,pixelHeight:n},(function(){e()}))})));case 1:case"end":return e.stop()}}),e)}))),i.chromeWorkaround=function(){i.refs.canvas2d.width=1,i.refs.canvas2d.height=1,i.refs.canvas3d.width=1,i.refs.canvas3d.height=1},i.scene=new C,i.input={keyboard:new y(i.scene),touch:new A(i.scene),mouse:new T(i.scene)},i.state={pixelWidth:window.innerWidth,pixelHeight:window.innerHeight,initialized:!1,error:!1},i}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.updateCanvasSize().then((function(){return e.scene.initialize(e.refs.canvas2d,e.refs.canvas3d)})).then((function(){e.scene.updateSize(e.state.pixelWidth,e.state.pixelHeight),window.addEventListener("orientationchange",e.chromeWorkaround),window.addEventListener("resize",e.handleResize),e.input.mouse.bind(e.refs.canvas2d),e.input.touch.bind(e.refs.canvas2d),e.input.keyboard.bind(e.refs.canvas2d),e.setState({initialized:!0},(function(){window.requestAnimationFrame(e.scene.draw)}))})).catch((function(t){e.setState({error:t})}))}},{key:"componentWillUnmount",value:function(){this.state.initialized&&(window.removeEventListener("resize",this.handleResize),window.removeEventListener("orientationchange",this.chromeWorkaround),this.input.keyboard.unbind(),this.input.touch.unbind(),this.input.mouse.unbind())}},{key:"render",value:function(){var e=this.props.classes;return Object(i.jsxs)(a.Fragment,{children:[Object(i.jsx)(g.a,{position:"static",className:e.appBar,children:Object(i.jsx)(p.a,{children:Object(i.jsx)(m.a,{className:e.title,variant:"h6",underline:"none",component:"a",href:"https://en.wikipedia.org/wiki/Maurer_rose",target:"_blank",color:"inherit",children:"Maurer Rose Explorer"})})}),!this.state.error&&!this.state.initialized&&Object(i.jsx)(w.a,{color:"secondary",className:e.progress,disableShrink:!0,size:80,thickness:6}),this.state.error&&Object(i.jsxs)(b.a,{color:"error",display:"block",gutterBottom:!0,paragraph:!0,align:"left",className:e.error,children:[this.state.error," Please use latest Chrome or Firefox."]}),!this.state.error&&Object(i.jsxs)("div",{className:e.container,ref:"container",children:[Object(i.jsx)("canvas",{ref:"canvas3d",className:e.canvas3d,width:this.state.pixelWidth,height:this.state.pixelHeight}),Object(i.jsx)("canvas",{ref:"canvas2d",className:e.canvas2d,width:this.state.pixelWidth,height:this.state.pixelHeight}),this.state.initialized&&Object(i.jsx)("div",{className:e.help,ref:"help",children:"use a mouse or gestures to move and zoom"})]})]})}}]),n}(a.Component),k=Object(x.a)((function(e){return{container:{position:"relative"},canvas3d:{display:"block"},canvas2d:{position:"absolute",left:0,top:0,zIndex:10},appBar:{backgroundColor:"#4caf50"},error:{padding:e.spacing(3,4)},help:{position:"absolute",bottom:5,right:85,backgroundColor:"#eaeaeaff",padding:5,borderRadius:5,fontSize:15,fontWeight:300,color:"#1a1a1aff",marginLeft:45},progress:{position:"absolute",left:"46vw",top:"40vh",color:"#ffc107",zIndex:30}}}))(D),L=n(58);var O=function(){return Object(i.jsxs)(r.a.Fragment,{children:[Object(i.jsx)(L.a,{}),Object(i.jsx)("div",{className:"App",children:Object(i.jsx)(k,{})})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(Object(i.jsx)(O,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[38,1,2]]]);
//# sourceMappingURL=main.6b518a6f.chunk.js.map