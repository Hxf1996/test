export class ImageHelper {
    constructor(imageData) {
        this.imageWidth = imageData.width;
        this.imageHeight = imageData.height;
        this.imageDataMatrix = this.toMatrix(imageData);
    }

    toMatrix(imageData) {
        const newImageData = [];
        const { data, width } = imageData;

        for (let index = 0; index < data.length; index += 4) {
            const key = Math.floor(index / 4);
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const a = data[index + 3];
            newImageData.push({
                y: Math.floor(key / width),
                x: key % width,
                rgba: { r, g, b, a }
            });
        }

        return newImageData;
    }

    toGray() {
        this.imageDataMatrix = this.imageDataMatrix.map((item) => {
            const { r, g, b, a } = item.rgba;
            const gray = (r * 0.3) + (g * 0.59) + (b * 0.11);
            return {
                ...item,
                rgba: {
                    r: gray,
                    g: gray,
                    b: gray,
                    a,
                },
            };
        });
        return this;
    }

    getImageData() {
        const array = [];
        for (let index = 0; index < this.imageDataMatrix.length; index++) {
            const arga = Object.values(this.imageDataMatrix[index].rgba);
            array.push(...arga);
        }
        return new ImageData(new Uint8ClampedArray(array), this.imageWidth, this.imageHeight);
    }
}

class Matrix {
    static getChildMatrix(matrix, startPoint, matrixSteps) {

    }
}
