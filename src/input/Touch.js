        
export default class Touch {

    constructor(scene) {
        this.scene = scene;
        
        this.events = [];
        
        this.prevDistance = -1;
        
        this.lastTouchTime = 0;
    }
    
    bind = (ref) => {
        this.ref = ref;

        this.ref.addEventListener("touchmove", this.handleTouchMove, false);
        this.ref.addEventListener("touchstart", this.handleTouchStart, false);
        this.ref.addEventListener("touchend", this.handleTouchEnd, false);
        this.ref.addEventListener("touchcancel", this.handleTouchCancel, false);
    }
    
    unbind = () => {
        if (!this.ref) {
            return;
        }
        this.ref.removeEventListener("touchcancel", this.handleTouchMove);
        this.ref.removeEventListener("touchend", this.handleTouchEnd);
        this.ref.removeEventListener("touchstart", this.handleTouchStart);
        this.ref.removeEventListener("touchmove", this.handleTouchMove);        
    }
    
    handleTouchMove = e => {

        if (this.events.length === 1) {
            if (this.lastTouchCoords) {
                const dX = ((e.changedTouches[0].pageX-this.lastTouchCoords[0]) / (this.scene.width * this.scene.aspect.y) * 3) / this.scene.zoom;
                const dY = -1*((e.changedTouches[0].pageY-this.lastTouchCoords[1]) / (this.scene.height* this.scene.aspect.x) * 3) / this.scene.zoom;

                this.scene.translate(dX, dY);
            }                        
            this.lastTouchCoords = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];

        } else if (this.events.length === 2) {
            
            for (let i = 0; i < this.events.length; i++) {

                if (e.changedTouches[0].identifier === this.events[i].changedTouches[0].identifier) {
                    this.events[i] = e;
                    break;
                }
            }
            
                    const curDist = Math.sqrt(
                                    Math.pow(
                                        this.events[0].changedTouches[0].clientX - this.events[1].changedTouches[0].clientX,
                                        2
                                    )
                                    +
                                    Math.pow(
                                        this.events[0].changedTouches[0].clientY - this.events[1].changedTouches[0].clientY,
                                        2                                        
                                    )
                                );

                    let zoom = this.scene.zoom;
        
                    if (this.prevDist > 0) {
        
                        if (curDist > this.prevDist) {
                            zoom += (0.04 * zoom);
                        }
                        if (curDist < this.prevDist) {
                            zoom -= (0.04  * zoom);
                        }
                if (zoom < 0.5) {
                    zoom = 0.5;
                }
                
                this.scene.updateZoom(zoom);
            }
            this.prevDist = curDist;
        }
        e.preventDefault();
        return false;
        
    }
    
    handleTouchStart = (e) => {
                
        if (this.events.length === 0) {
            
            const now = new Date().getTime();
            const timesince = now - this.lastTouchTime;
            
            if ((timesince < 300) && (timesince > 0)){
                let zoom = this.scene.zoom;

                zoom += (0.5  * zoom);

                if (zoom < 0.5) {
                    zoom = 0.5;
                }
                this.scene.updateZoom(zoom);
      
                this.lastTouchTime = 0;
                                
                e.preventDefault();
                return false;
            }
            
            this.lastTouchCoords = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
            this.lastTouchTime = new Date().getTime() 
            this.events.push(e);

        } else if (this.events.length === 1) {
            this.events.push(e);
        }

        e.preventDefault();
        return false;        
    }
    
    handleTouchEnd = (e) => {
        this.events = [];
        this.lastTouchCoords = null;
        this.prevDist = -1;
        e.preventDefault();
        return false;
    }

    handleTouchCancel = (e) => {
        this.events = [];
        this.lastTouchCoords = null;
        this.prevDist = -1;
        this.lastTouchTime = 0;
    }    
}