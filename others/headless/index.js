const puppeteer = require('puppeteer');
const readline = require('readline');

puppeteer.launch({
    headless: false
}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 768
    });

    await page.goto('https://login.taobao.com/member/login.jhtml');
    console.log('进入淘宝登陆页');
    await page.waitForSelector('#J_QRCodeImg');
    // await page.$('#J_QRCodeImg').then(async (element) => {
    //     const point = await element.boundingBox();
    //     await page.screenshot({
    //         path: "code.png",
    //         clip: point,
    //     });
    // });
    console.log('获取淘宝二维码成功');
    const executionContext = page.mainFrame().executionContext();
    const qrcode = await executionContext.evaluate(async () => {
        let img = new Image();
        var result = '';
        img.src = document.getElementById('J_QRCodeImg').childNodes[0].src + '?t=123';
        img.crossOrigin = "Anonymous";
        img.onload = async () => {
            let canvas = document.createElement('canvas');
            let canvasContext = canvas.getContext("2d");
            canvasContext.drawImage(img, 0, 0);
            let data = [];
            for (let h = 0; h < img.height; h += 2) {
                for (let w = 0; w < img.width; w += 2) {
                    let imgData = canvasContext.getImageData(w, h, 2, 2);
                    let imgDataArray = imgData.data;
                    data.push(imgDataArray.reduce((sum, value) => {
                        return sum + value;
                    }) / (2*2*4));
                }
            }
            let arr = ['█', '  '];
            data.forEach((item, index) => {
                result += arr[Math.floor(item / 157)];
                if ((index + 1) % 70 == 0) {
                    result += '\n';
                }
            })
        }
        await sleep(2000);
        return Promise.resolve(result);

        async function sleep(delay) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        resolve(1)
                    } catch (e) {
                        reject(0)
                    }
                }, delay);
            });
        };
    });
    console.log(qrcode);
});

// console.log('■');

// let loginData = {
//     username: '13515880979',
//     password: ''
// };
// 失败的滑动验证
// puppeteer.launch({
//     headless: false
// }).then(async browser => {
//     const page = await browser.newPage();
//     await page.setViewport({
//         width: 1366,
//         height: 768
//     });
//
//     await page.goto('https://login.taobao.com/member/login.jhtml');
//     console.log('进入淘宝登陆页');
//
//     await page.waitForSelector('#J_Quick2Static');
//     await page.click('#J_Quick2Static');
//     console.log('切换至普通模式登陆');
//
//     loginData = Object.keys(loginData).length ? loginData : await inputLoginData();
//     console.log('成功获取用户账号密码，开始输入');
//     await sleep(1000);
//
//     const usernameInput = await page.$('input[name=TPL_username]');
//     await usernameInput.click();
//     await usernameInput.type(loginData.username, {
//         delay: 50
//     });
//
//     const passwordInput = await page.$('input[name=TPL_password]');
//     await passwordInput.click();
//     await passwordInput.type(loginData.password, {
//         delay: 50
//     });
//     console.log('输入完毕');
//
//     await page.$('#nc_1_n1z').then(async (element) => {
//         const point = await element.boundingBox();
//         console.log('进行滑动验证');
//         await moveSlide(point, page);
//     }).catch(() => {
//         console.log('无滑动验证码');
//     });
//
//     const loginButton = await page.$('#J_SubmitStatic');
//     await loginButton.click();
//     console.log('登陆成功');
//
//     await page.waitForSelector('iframe');
//     const mainFrame = await page.mainFrame();
//     console.log('frames', mainFrame.frames().length);
//     const loginFrame = await page.frames()[0];
//     console.log('login', loginFrame);
//     await loginFrame.waitForSelector('.ui-form-other');
//
//     // const toOther = await loginFrame.$('.ui-form-other');
//     // await toOther.click();
//     // console.log('进入其他验证方式');
//     //
//     // const mobile = await page.$$('.fn-clear > a')[1];
//     // await mobile.click();
//     //
//     // const getCode = await page.$('#J_GetCode');
//     // await getCode.click();
//     // console.log('短信验证码发出');
// });


// 滑动验证
async function moveSlide(point, page) {
    await page.waitForSelector('#nc_1_n1z', {
        visible: true,
    });
    await sleep(1000);

    const mouse = page.mouse;
    const x = point.x + Math.round(Math.random() * point.width / 4) + point.width / 3;
    const y = point.y + Math.round(Math.random() * point.height / 4) + point.height / 3;
    await mouse.move(x, y);
    await mouse.down();
    await sleep(200);
    for (let i = 2; i > 0; i--) {
        await mouse.move(x + 16 * i ** 2, y + 0.2 * i ** 2, {
            steps: 2,
        });
    }
    for (let i = 8; i > 0; i--) {
        await mouse.move(x + 64 + 32 * i, y + 0.2 * i ** 2, {
            steps: 2,
        });
    }
    await mouse.up();
    // 判断验证通过
    let ncResult = await Promise.race([
        page.waitForSelector('#nocaptcha .btn_ok', {
            visible: true,
        }).then(() => {
            return true;
        }),
        page.waitForSelector('#nocaptcha', {
            visible: true,
        }).then(() => {
            return false;
        }),
    ]);
    if (!ncResult) {
        await page.waitForSelector('#nocaptcha a', {
            visible: true,
        });
        await sleep(1000);
        const nocaptcha = await page.$('#nocaptcha a');
        await nocaptcha.click();
        await sleep(1000);
        await moveSlide(point, page);
    }
}

const inputLoginData = async () => {
    const result = {};
    await readSyncByRl('输入淘宝账号: ').then((msg) => {
        result.username = msg;
    });
    await readSyncByRl('输入淘宝密码: ').then((msg) => {
        result.password = msg;
    });
    return result;
}

function readSyncByRl(tips) {
    tips = tips || '> ';
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(tips, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

async function sleep(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(1)
            } catch (e) {
                reject(0)
            }
        }, delay);
    });
};
