
import Canvas2d from './Canvas2d';
import Canvas3d from './Canvas3d';

import Rose from './MaurerRose';

const SCALE_1_COUNT = 10;

export default class Scene {

    constructor() {

        this.zoom = 1;

        this.center = {
            x: -5.12,
            y: 2.69
        };

        this.aspect = {
            x: 1,
            y: 1,
        }

        this.tile = {
            uniformSize: 2 / SCALE_1_COUNT,
            width: 2 / (SCALE_1_COUNT * this.aspect.y),
            height: 2 / (SCALE_1_COUNT * this.aspect.x),
        };

        this.objects3d = [];

        this.canvas3d = new Canvas3d();
        this.canvas2d = new Canvas2d();

        this.canvas = [this.canvas2d, this.canvas3d];
    }

    initialize = async (refCanvas2d, refCanvas3d) => {

        return this.canvas3d.initialize(refCanvas3d).then(() => {

            return this.canvas2d.initialize(refCanvas2d);

        }).then(() => {

            for (let y = 0; y < 20; y++) {
                for (let x = 0; x < 20; x++) {
                    const object = new Rose(this.tile.uniformSize);

                    object.bind(this.canvas3d);

                    this.objects3d.push(object);
                }
            }
        });
    }

    updateSize = (width, height) => {

        this.width = width;
        this.height = height;

        this.aspect.x = Math.max(this.width / this.height, 1);
        this.aspect.y = Math.max(this.height / this.width, 1);

        this.tile.pixelWidth = (this.width / (SCALE_1_COUNT * this.aspect.y)) * this.zoom;
        this.tile.pixelHeight = (this.height / (SCALE_1_COUNT * this.aspect.x)) * this.zoom;

        this.canvas.forEach(c => c.update(this));
    }

    updateZoom = (zoom) => {

        this.zoom = zoom;

        this.tile.pixelWidth = (this.width / (SCALE_1_COUNT * this.aspect.y)) * this.zoom;
        this.tile.pixelHeight = (this.height / (SCALE_1_COUNT * this.aspect.x)) * this.zoom;

        this.canvas.forEach(c => c.update(this));
        window.requestAnimationFrame(this.redraw);
    }

    translate = (dX, dY) => {

        this.center = { x: this.center.x + dX, y: this.center.y + dY };

        this.canvas.forEach(c => c.update(this));
        window.requestAnimationFrame(this.redraw);
    }

    redraw = () => {
        this.canvas2d.drawScene();
        this.canvas3d.drawScene(this.objects3d, this);
    }

    draw = () => {
        this.canvas.forEach(c => c.draw());
        this.redraw();
    }
}

