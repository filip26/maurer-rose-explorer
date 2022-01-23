
export default class Mouse {

    constructor(scene) {
        this.scene = scene;
    }

    bind = (ref) => {
        this.ref = ref;

        ref.addEventListener("wheel", this.handleMouseWheel, { passive: false });
        ref.addEventListener("mousedown", this.handleMouseDown, { passive: false });
        ref.addEventListener("mouseup", this.handleMouseUp, { passive: false });
        ref.addEventListener("mousemove", this.handleMouseMove, { passive: false });
        ref.addEventListener("mouseout", this.handleMouseOut, { passive: false });
    }

    unbind = () => {
        if (!this.ref) {
            return;
        }

        this.ref.removeEventListener("wheel", this.handleMouseWheel);
        this.ref.removeEventListener("mousedown", this.handleMouseDown);
        this.ref.removeEventListener("mouseup", this.handleMouseUp);
        this.ref.removeEventListener("mousemove", this.handleMouseMove);
        this.ref.removeEventListener("mouseout", this.handleMouseOut);
    }

    handleMouseWheel = e => {
        e.preventDefault();

        this.isMouseDown = false;

        let zoom = this.scene.zoom;

        if (e.deltaY < 0) {
            zoom -= 0.1
        } else if (e.deltaY > 0) {
            zoom += 0.1
        }

        if (zoom < 0.5) {
            zoom = 0.5;
        }

        this.scene.updateZoom(zoom);

        return false;
    }

    handleMouseDown = e => {
        e.preventDefault();

        if (this.isMouseDown) {
            this.isMouseDown = false;

        } else {
            this.lastDragCoords = [e.pageX, e.pageY];
            this.isMouseDown = true;
        }


        return false;
    }

    handleMouseUp = e => {
        this.isMouseDown = false;

        e.preventDefault();
        return false;
    }

    handleMouseMove = e => {
        if (this.isMouseDown) {
            e.preventDefault();

            const dX = ((e.pageX - this.lastDragCoords[0]) / (this.scene.width * this.scene.aspect.y) * 3) / this.scene.zoom;
            const dY = -1*((e.pageY - this.lastDragCoords[1]) / (this.scene.height* this.scene.aspect.x) * 3) / this.scene.zoom;

            this.lastDragCoords = [e.pageX, e.pageY];

            this.scene.translate(dX, dY);

            return false;
        }
    }

    handleMouseOut = e => {
        this.isMouseDown = false;
    }
}