
 

export default class Canvas3d {
        
    createBuffer = () => {
        // Create a new vertext buffer object
        const buffer = this.gl.createBuffer();

        return buffer;
    }
    
    createIndexBuffer = (indices, dynamic=false) => {
        const buffer = this.gl.createBuffer();
        
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), dynamic ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        
        return buffer;
    }
    
    updateBuffer = (buffer, data, dynamic=false) => {

        //Bind vertex buffer object
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

        // Pass the vertices data to the buffer
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), dynamic ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW);

        // Unbind
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);        
    }
    

    initialize = async (canvas) => {
     
        const gl = canvas.getContext("webgl");
                
        if (!gl) {
            return Promise.reject("WebGL is not supported by your browser.");
        }
                                
        // Vertex shader source code
        const vertCode =
            'attribute vec2 coordinates;'
            + 'uniform mat4 scale;' 
            + 'uniform vec4 translation;'
            + 'attribute vec3 color;'  
            + 'varying vec3 vColor;' 
            + 'void main(void) {' 
            + ' gl_Position = scale * (vec4(coordinates, 0.0, 1.0) + translation) ; gl_PointSize = 5.0; vColor = color;' 
            + '}';

        // Create a vertex shader object
        let vertShader = gl.createShader(gl.VERTEX_SHADER);

        // Attach vertex shader source code
        gl.shaderSource(vertShader, vertCode);

        // Compile the vertex shader
        gl.compileShader(vertShader);

        // Fragment shader source code
        const fragCode =
            'precision mediump float;'
            + 'varying vec3 vColor;' 
            + 'void main(void) {' 
            + 'gl_FragColor = vec4(vColor, 1.);' 
            + '}';            
//            'void main(void) {' + 'gl_FragColor = vec4(0.1, 0.1, 0.1, 1.);' + '}';

        // Create fragment shader object
        const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

        // Attach fragment shader source code
        gl.shaderSource(fragShader, fragCode);

        // Compile the fragment shader
        gl.compileShader(fragShader);

        // Create a shader program object to store combined shader program
        const shaderProgram = gl.createProgram();

        // Attach a vertex shader
        gl.attachShader(shaderProgram, vertShader); 
         
        // Attach a fragment shader
        gl.attachShader(shaderProgram, fragShader);

        // Link both programs
        gl.linkProgram(shaderProgram);

        // Use the combined shader program object
        gl.useProgram(shaderProgram);

        // Get the attribute location
        this.attrCoord = gl.getAttribLocation(shaderProgram, "coordinates");

        this.attrColor = gl.getAttribLocation(shaderProgram, "color");
        
        this.attrTranslation = gl.getUniformLocation(shaderProgram, 'translation');

        this.uniformScaleMatrix = gl.getUniformLocation(shaderProgram, "scale");

        this.gl = gl;   
        this.program = shaderProgram;           
        
        return Promise.resolve();
    }

    //
    update = ({aspect, center, zoom, tile, objects3d}) => {

        const objects = objects3d;

        const size =  tile.uniformSize;

        const xCenter = -1*(center.x / size);
        const yCenter = -1*(center.y / size);

        const x1 =  Math.floor(xCenter - (1 / (size * zoom * aspect.y)));        
        const y1 =  -1*Math.ceil(yCenter + (1 / (size * zoom * aspect.x)));

        const x2 =  Math.floor(xCenter + (1 / (size * zoom * aspect.y)));
        const y2 =  -1*Math.ceil(yCenter - (1 / (size * zoom * aspect.x)));

        const have = new Array(Math.abs(y2-y1)+1);
        for (let y=0; y < have.length; y++) {
            have[y] = new Array(Math.abs(x2-x1)+1);
            for (let x=0; x < have[y].length; x++) {
                have[y][x] = false;
            }
        }

        const avail = [];
        for (let i in objects) {
            if (!objects[i].x || !objects[i].y) {
                avail.push(objects[i]);

            } else if (objects[i].x >= x1 && objects[i].x <= x2 && objects[i].y >= y1 && objects[i].y <= y2) {
                have[Math.abs(objects[i].y - y1)][Math.abs(objects[i].x - x1)] = true;

            } else {
                avail.push(objects[i]);
                objects[i].x = null;
                objects[i].y = null;
            }
        }

        let ai = 0;
        for (let y=y1; y <= y2; y++) {

            if (ai >= avail.length) {
                break;
            }
            
            for (let x=x1; x <= x2; x++) {
                if (have[Math.abs(y-y1)][Math.abs(x-x1)]) {
                    continue;
                }
                
                (avail[ai]).compute(x, y, this);
                
                ai++;
                
                if (ai >= avail.length) {
                    break;
                }
                
            }
        }
    }

    draw = () => {

    }

    // Draw the scene.    
    drawScene = (objects, scene) => {

        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);


        this.gl.useProgram(this.program);

        // Clear the canvas
        this.gl.clearColor(0.95, 0.95, 0.95, 1);

        // Clear the color buffer bit
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.DITHER);
        
        objects && objects.flatMap(object => object.shapes()).forEach(shape => this.drawShape(shape, scene));
    }

    drawShape = (glObject, {aspect, zoom, center}) => {

        if (glObject.colorBuffer) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, glObject.colorBuffer);
            
            // point attribute to the volor buffer object
            this.gl.vertexAttribPointer(this.attrColor, 3, this.gl.FLOAT, false,0,0) ;
 
            // enable the color attribute
            this.gl.enableVertexAttribArray(this.attrColor);

        } else {

            this.gl.disableVertexAttribArray(this.attrColor);
        }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, glObject.vertexBuffer);

        if (glObject.indexBuffer) {
              this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, glObject.indexBuffer);
        }

        // Point an attribute to the currently bound VBO
        this.gl.vertexAttribPointer(this.attrCoord, 2, this.gl.FLOAT, false, 0, 0);

        // Enable the attribute
        this.gl.enableVertexAttribArray(this.attrCoord);

        // Scale
        if (glObject.scaleFnc) {
            this.gl.uniformMatrix4fv(this.uniformScaleMatrix, false, glObject.scaleFnc(aspect, zoom));
        }
        
        // Translace
        const tx =  glObject.translateFnc ? glObject.translateFnc(aspect, center) : center;

        this.gl.uniform4f(this.attrTranslation, tx.x, tx.y, 0.0, 0.0);

        let style = this.gl.POINTS;
        switch (glObject.styleName) {
        case 'line-loop':
            style = this.gl.LINE_LOOP;    
            break;
            
        case 'line-strip':
            style = this.gl.LINE_STRIP;    
            break;

        case 'lines':
            style = this.gl.LINES;    
            break;
                
        case 'triangles':
            style = this.gl.TRIANGLES;
            break;
            
        default:            
        }                        

        if (glObject.indexBuffer) {
            this.gl.drawElements(style, glObject.length, this.gl.UNSIGNED_SHORT, glObject.offset);
            
        } else {
            this.gl.drawArrays(style, glObject.offset, glObject.length);
        }
    }   
}