

export default class GlTile {
	

    constructor(width) {
    
        this.width = width;        
    
//        this.x = column * width + width / 2;
//        this.y = row * width + width / 2;

//        this.vertices = [x, y, x, y + height, x + width, y + height, x + width, y];
//        
        
//        
        this.style = 'line-loop'; 
        
        this.zoomable = true;
        
    }	
        
    bind = gl => {
        this.buffer = gl.createBuffer();
    }
    
    update = (x, y, gl) => {

        this.tX = x * this.width + this.width / 2;
        this.tY = -y * this.width - this.width / 2;

        this.x = x;
        this.y = y;


        this.vertices = new Array(360);
//        this.vertices.push(-width/2, width/2, width/2, width/2, width/2, -width/2, -width/2, -width/2);
        
        
//        if (x >= 0) {
//            x++;
//        }
//        if (y >= 0) {
//            y++;
//        }

        
        this.v(x, y, 0, 0, this.vertices, 0);        
        gl.updateBuffer(this.buffer, this.vertices, true);        
    }


        
    shapes = () => {
        if (!this.vertices || !this.x || !this.y) {
            return [];
        }
        return [{
            vertexBuffer:  this.buffer,
            offset:   0,
            length:   this.vertices.length / 2,
            styleName:      'line-loop',
            scaleFnc:       (a, scale) => this.createScaleMatrix(a[1]*scale, a[0]*scale),
            translateFnc:   (a, t) => this.translate(t),
        }
        ];           
    }
        
    createScaleMatrix = (sX, sY) => {
        
        return new Float32Array([
            sX,   0.0,  0.0,  0.0,
            0.0,  sY,   0.0,  0.0,
            0.0,  0.0,  1,   0.0,
            0.0,  0.0,  0.0,  1.0  
         ]);
    }
    
    translate = t => {
        return [t[0] + this.tX, t[1] + this.tY];
    }
    
    
        v = (n = 4, d = 31, ofsetX = 0, ofsetY = 0, points, index) => {

//console.log(n, d);        
        
        for (let theta=0; theta < 360; theta+=1) {

            const k = theta * d * Math.PI / 180;
            const r = 0.1 / 1  * Math.sin(n * k) ;
            
            const x = r * Math.cos(k);
            const y = r * Math.sin(k);
//    if (theta % 2 === 0) {
            points[index + theta*2] = x   + ofsetX; 
            points[index + theta*2 + 1] = y   - ofsetY;        
            }
//        }
//        console.log(v);
        return index + 360 * 2;
    }

    
}