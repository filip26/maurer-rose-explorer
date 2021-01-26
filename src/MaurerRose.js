

export default class MaurerRose {
	
    constructor(width) {
        this.width = width;    
        this.buffer = null;  
        this.state = 'empty';      
    }	
        
    bind = gl => {
        this.buffer = gl.createBuffer();
    }

    compute = (n, d, gl) => {

        this.x = n;
        this.y = d;

        this.tX = this.x * this.width + this.width / 2;
        this.tY = -this.y * this.width - this.width / 2;

        this.vertices = new Array(360);
        
        this.v(n, d, 0, 0, this.vertices, 0);        
        gl.updateBuffer(this.buffer, this.vertices, true);                
    }

    shapes = () => {
        if (!this.vertices || !this.x || !this.y ) {
            return [];
        }
        
        return [{
                vertexBuffer:  this.buffer,
                offset:   0,
                length:   this.vertices.length / 2,
                styleName:      'line-loop',
                scaleFnc:       (a, z) => this.createScaleMatrix(a.y*z, a.x*z),
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
        return {
                x: t.x + this.tX, 
                y: t.y + this.tY,  
            };
    }
   
    v = (n, d, ofsetX, ofsetY, points, index) => {

        for (let theta=0; theta < 360; theta+=1) {

            const k = theta * d * Math.PI / 180;
            const r = 0.1 / 1  * Math.sin(n * k) ;
            
            const x = r * Math.cos(k);
            const y = r * Math.sin(k);

            points[index + theta*2] = x   + ofsetX; 
            points[index + theta*2 + 1] = y   - ofsetY;        
        }

        return index + 360 * 2;
    }    
}