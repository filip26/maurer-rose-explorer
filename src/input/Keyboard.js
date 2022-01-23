
export default class Keyboard {

    constructor(scene) {
        this.scene = scene;
    }

    bind = (ref) => {
        this.ref = ref;

        window.addEventListener("keydown", this.handleKeyDown);
    }

    unbind = () => {
        if (!this.ref) {
            return;
        }

        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (e) => {

        const shiftX = this.scene.tile.width  / (2 * this.scene.zoom);
        const shiftY = this.scene.tile.height / (2 * this.scene.zoom);

        // down
        if (e.keyCode === 38) {
            this.scene.translate(0, shiftY);

        // up
        } else if (e.keyCode === 40) {
            this.scene.translate(0, -shiftY);

        // left
        } else if (e.keyCode === 37) {
            this.scene.translate(-shiftX, 0);

        } else if (e.keyCode === 39) {
            this.scene.translate(shiftX, 0);
        }
    }
}