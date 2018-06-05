const mongoose = require('mongoose');

const Info = mongoose.model('Info');

module.exports.saveInfo = async (ctx, next) => {
    const opts = ctx.request.body;

    const info = new Info(opts);
    const saveInfo = await info.save();
    if (saveInfo) {
        ctx.body = {
            success: true,
            info: saveInfo,
        };
    } else {
        ctx.body = {
            success: false,
        };
    }
};
