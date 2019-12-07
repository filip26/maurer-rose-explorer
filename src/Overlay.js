
const AXIS_SIZE = 40;
const AXIS_BACKGROUND = '#dadadaff';
const AXIS_FONT_COLOR = '#1a1a1aff';
const AXIS_DELIMITER_COLOR = '#ffffffff';

export default class Overlay {
    
    constructor(maxTiles=15) {
        this.maxTiles = maxTiles;
    }
    
    initialize = async (canvas) => {
     
        const ctx = canvas.getContext("2d")
                
        if (!ctx) {
            return Promise.reject("2d canvas is not supported by your browser.");
        }
        this.ctx = ctx;
        return Promise.resolve();        
    }
    
    draw = () => {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

//        this.ctx.save();
//        this.ctx.fillStyle = '#aaaaaa44';        
//        this.ctx.font = '800 100px Roboto'
//        this.ctx.textAlign = 'center';
//        this.ctx.textBaseline = 'middle';
//        
//        this.ctx.fillText("development", this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
//        this.ctx.restore();
        
//        this.ctx.fillStyle = '#fff';        
//        this.ctx.fillRect(this.ctx.canvas.width - 355, this.ctx.canvas.height - 20, 350, 20);
//        this.ctx.fillStyle = '#000';        
//        this.ctx.font = '100 12px Roboto'
//        this.ctx.fillText("use mouse wheel to zoom, left click and move to change coordinates", 
//                        this.ctx.canvas.width - 350, this.ctx.canvas.height - 5);
 
        this.drawLegend();
    }
    
    update = (aspect, translate, scale) => {

//        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.fillStyle = AXIS_BACKGROUND;        
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, AXIS_SIZE);        
        this.ctx.fillRect(0, 0, AXIS_SIZE, this.ctx.canvas.height);

        const centerX = this.ctx.canvas.width / 2 + this.ctx.canvas.width * aspect[1] * scale * (translate[0] / 2);
        const centerY = this.ctx.canvas.height / 2 - this.ctx.canvas.height * aspect[0] * scale * (translate[1] / 2);
        
        const size = (aspect[1] === 1   
                            ? this.ctx.canvas.width / this.maxTiles
                            : this.ctx.canvas.height / this.maxTiles
                            )
                        * scale 
                            ;

        const x1 = ((centerX / size) - Math.floor(centerX / size)) * size;
        const y1 = ((centerY / size) - Math.floor(centerY / size)) * size; 

        let xStart = -1*Math.floor(centerY / size);
        let yStart = -1*Math.floor(centerX / size);

//        if (xStart > 0) {
//            xStart++;
//        }
//        if (yStart > 0) {
//            yStart++;
//        }
        
//console.log(centerX, centerY, xStart, yStart);

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = AXIS_FONT_COLOR;        
        this.ctx.font = '300 14px Roboto'
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        this.ctx.fillText(xStart-1, AXIS_SIZE / 2,  y1 - size / 2 );
        
        // y Axis        
        for (let y=y1; y < this.ctx.canvas.height; y += size) {
            
//            if (xStart == 0) {
//                xStart++;
//            }
                        
            this.ctx.fillText(xStart++, AXIS_SIZE / 2,  y + size / 2 );
            
            this.ctx.moveTo(0,  y);
            this.ctx.lineTo(AXIS_SIZE, y);
        }
        
        this.ctx.fillText(yStart-1, x1 - size / 2, AXIS_SIZE / 2);

        // x Axis        
        for (let x=x1; x < this.ctx.canvas.width; x += size) {
                        
//            if (yStart == 0) {
//                yStart++;
//            }            

            this.ctx.fillText(yStart++, x + size / 2, AXIS_SIZE / 2);
            
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, AXIS_SIZE);
        }
        
        this.ctx.closePath();
        
        this.ctx.lineWidth = 1.0;
        this.ctx.strokeStyle = AXIS_DELIMITER_COLOR;
//        this.ctx.strokeStyle = '#a00';
        this.ctx.stroke();
        this.ctx.restore();

        this.ctx.fillStyle = AXIS_BACKGROUND;        
        this.ctx.fillRect(0, 0, AXIS_SIZE, AXIS_SIZE);
        
        this.ctx.strokeStyle = '#eaeaeaff';
        this.ctx.beginPath();
//        this.ctx.moveTo(0, 0);
//        this.ctx.lineTo(AXIS_SIZE - 1, AXIS_SIZE - 1);
        this.ctx.lineWidth = 2;

        this.ctx.moveTo(AXIS_SIZE - 1, 0);
        this.ctx.lineTo(AXIS_SIZE - 1, AXIS_SIZE - 1);
        this.ctx.moveTo(0, AXIS_SIZE - 1);
        this.ctx.lineTo(AXIS_SIZE - 1, AXIS_SIZE - 1);

        this.ctx.moveTo(AXIS_SIZE - 1, AXIS_SIZE - 1);
        this.ctx.lineTo(AXIS_SIZE - 1, this.ctx.canvas.height);
        this.ctx.moveTo(AXIS_SIZE - 1, AXIS_SIZE - 1);
        this.ctx.lineTo(this.ctx.canvas.width, AXIS_SIZE - 1);        
        this.ctx.closePath();        
        this.ctx.stroke();

//        this.ctx.save();
//        this.ctx.beginPath();
//        this.ctx.moveTo(AXIS_SIZE, centerY);
//        this.ctx.lineTo(this.ctx.canvas.width, centerY);
//        this.ctx.moveTo(centerX, AXIS_SIZE);
//        this.ctx.lineTo(centerX, this.ctx.canvas.height);
//        this.ctx.closePath();
//        
//        this.ctx.lineWidth = 1.0;
//        this.ctx.strokeStyle = '#a00';
//        this.ctx.stroke();
//        this.ctx.restore();
    }
    
    drawLegend = (length = 70) => {
        this.ctx.save();
        this.ctx.translate(this.ctx.canvas.width - length - 5, this.ctx.canvas.height - length - 5);
        
        this.ctx.fillStyle = '#dadadada';
        this.ctx.fillStyle = '#357a38aa';
        this.ctx.fillStyle = '#4caf50cc';
        this.ctx.fillStyle = '#babababa';                                        
        this.ctx.fillStyle = '#666666aa';
        
        this.ctx.fillRect(0, 0, length, length);        

        this.ctx.beginPath();
        
        this.ctx.moveTo(length / 3, 5);
        this.ctx.lineTo(length / 3, length - 5);
        this.ctx.lineTo(length / 3 - 4, length - length / 8 - 5);
        this.ctx.moveTo(length / 3, length - 5);
        this.ctx.lineTo(length / 3 + 4, length - length / 8 - 5);

        this.ctx.moveTo(5, length / 3);
        this.ctx.lineTo(length - 5, length / 3);
        this.ctx.lineTo(length - length / 8 - 5, length / 3 - 4);
        this.ctx.moveTo(length - 5, length / 3);
        this.ctx.lineTo(length - length / 8 - 5, length / 3 + 4);

        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, length);
        this.ctx.lineTo(length, length);
        this.ctx.lineTo(length, 0);
        this.ctx.lineTo(0, 0);
        
        this.ctx.closePath();
        
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#357a38';        
        this.ctx.strokeStyle = '#000000cc';
        this.ctx.strokeStyle = '#ffffffff';        
        
        this.ctx.stroke();
        
        this.ctx.font = '300 14px Roboto'
        this.ctx.fillStyle = '#357a38';

        this.ctx.fillStyle = '#444444cc';
        this.ctx.fillStyle = '#ffffffff';
        
//        this.ctx.textBaseline = 'bottom';
        this.ctx.textAlign = 'left';
        this.ctx.fillText("d", length / 3 + 7,  length - 7);
        this.ctx.textAlign = 'right';
        this.ctx.fillText("n", length - 7, length / 3 - 7);
        
        this.ctx.restore();
    }
}