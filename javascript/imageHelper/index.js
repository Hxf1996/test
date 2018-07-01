import { ImageHelper } from './ImageHelper.mjs';

const img = new Image();
const canvas = document.getElementById('a')
const ctx = canvas.getContext('2d');
const array = [];
img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const newImageData = new ImageHelper(imageData).toGray().getImageData();
    ctx.clearRect(0, 0, 500, 500);
    ctx.putImageData(newImageData, 0, 0);

    // const saveData = document.createElement('a');
    // saveData.href = canvas.toDataURL("image/png");
    // saveData.download = 'pi.jpg';
    // document.body.appendChild(saveData);
}
img.src = './pi2.jpg';
