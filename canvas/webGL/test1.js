// 将数据编译成着色器
function createShader(gl, type, source) {
    var shader = gl.createShader(type); // 创建着色器对象

    gl.shaderSource(shader, source); // 提供数据
    gl.compileShader(shader); // 编译

    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (success) {
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}
// 链接着色器生成着色程序
function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    // 注入着色器
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    var success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (success) {
    return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function main() {
    var canvas = document.getElementById("a");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    var vertexShaderSource = document.getElementById("2d-vertex-shader").text;
    var fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

    // 创建两个着色器
    // VERTEX_SHADER：35633
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    // FRAGMENT_SHADER：35632
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    var program = createProgram(gl, vertexShader, fragmentShader);
    // 寻找a_position位置
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    var colorUniformLocation = gl.getUniformLocation(program, "u_color");
    // 创建缓冲
    var positionBuffer = gl.createBuffer();
    // 绑定缓冲点
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var positions = [
      10, 20,
      80, 20,
      10, 30,
      10, 30,
      80, 20,
      80, 30,
    ];
    // 向缓冲中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // 传递画布尺寸
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // 清空画布
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 运行着色程序
    gl.useProgram(program);
    // 启用对应属性
    gl.enableVertexAttribArray(positionAttributeLocation);
    // 将绑定点（ARRAY_BUFFER）绑定到缓冲数据（positionBuffer）
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // 设置数据读取方式
    var size = 2; // 一次读取字节数
    var type = gl.FLOAT; // 读取类型
    var normalize = false; // 归一化数据？
    var stride = 0; // 移动单位数量 * 每个单位占用内存 每次迭代运行运动多少内存到下一个数据开始点
    var offset = 0; // 从缓冲起始位置开始读取
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    for (var ii = 0; ii < 50; ++ii) {
        // Setup a random rectangle
        // This will write to positionBuffer because
        // its the last thing we bound on the ARRAY_BUFFER
        // bind point
        setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));

        // Set a random color.
        gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

        var primitiveType = gl.TRIANGLES; // 图元类型设置三角形
        var offset = 0;
        var count = 6; // 着色器运行次数

        gl.drawArrays(primitiveType, offset, count);
    }
}

function randomInt(range) {
    return Math.floor(Math.random() * range);
}

function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2,
  ]), gl.STATIC_DRAW);
}

main();
