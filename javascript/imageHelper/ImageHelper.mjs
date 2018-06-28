export class ImageHelper {
    constructor(imageData) {
        this.imageWidth = imageData.width;
        this.imageHeight = imageData.height;
        this.imageDataMatrix = this.toMatrix(imageData);
    }

    toMatrix(imageData) {
        const { data, width, height } = imageData;

        return new Matrix(this.toArray(data), { x: width, y: height });
    }

    toArray(imageData) {
        const newImageData = [];
        for (let index = 0; index < imageData.length; index += 4) {
            const r = imageData[index];
            const g = imageData[index + 1];
            const b = imageData[index + 2];
            const a = imageData[index + 3];
            newImageData.push([r, g, b, a]);
        }
        return newImageData;
    }

    toImageDataArray(array) {
        const imageData = [];
        for (let index = 0; index < array.length; index++) {
            imageData.push(...array[index]);
        }
        return imageData;
    }

    toGray() {
        this.imageDataMatrix.mix(function (rgba) {
            const [r, g, b, a] = rgba;
            const gray = r * 0.3 + g * 0.59 + b * 0.11;
            return [gray, gray, gray, a];
        })
        return this;
    }

    getImageData() {
        console.log(this.imageDataMatrix.getChildMatrix(
            { x: 0, y: 0 },
            { x: 50, y: 50 }
        ).mix(function (rgba) {
            const [r, g, b, a] = rgba;
            const gray = 255;
            return [gray, gray, gray, a];
        }));

        const array = this.imageDataMatrix.toArray();


        return new ImageData(new Uint8ClampedArray(this.toImageDataArray(array)), this.imageWidth, this.imageHeight);
    }
}

class Matrix {
    constructor(array, matrixSteps) {
        this.matrix = [];
        if (matrixSteps) {
            const { x, y } = matrixSteps;
            for (let col = 0; col < y; col++) {
                this.matrix[col] = array.slice(x * col, x * (col + 1));
            }
        } else {
            this.matrix = array;
        }
    }

    mix(fn) {
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                this.matrix[y][x] = fn(this.matrix[y][x]);
            }
        }
    }

    toArray() {
        const array = [];
        this.matrix.forEach((item) => {
            array.push(...item);
        });

        return array;
    }

    getChildMatrix(startPoint, matrixSteps) {
        const { x: startX, y: startY } = startPoint;
        const { x: stepX, y: stepY } = matrixSteps;
        const array = [];
        for (let y = 0; y < stepY; y++) {
            array.push(...(this.matrix[startY + y].slice(startX, startX + stepX)));
        }

        return new Matrix(array, { x: stepX, y: stepY });
    }
}
