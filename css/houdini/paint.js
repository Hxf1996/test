class PlaceholderBoxPropsPainter {
    static get inputProperties() {
        return ['border-top-width', 'border-top-color', '--a'];
    }

    static get inputArguments() {
        return [
            '<number>',
        ];
    }

    paint(ctx, size, props, args) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#666';
        let borderTopWidthProp = props.get('border-top-width');
        if (borderTopWidthProp) {
            ctx.lineWidth = borderTopWidthProp.value;
        }
        let borderTopColorProp = props.get('border-top-color');
        if (borderTopColorProp) {
            ctx.strokeStyle = borderTopColorProp.toString();
        }
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size.width, size.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(size.width, 0);
        ctx.lineTo(0, size.height);
        ctx.stroke();
    }
}

registerPaint('placeholder-box', PlaceholderBoxPropsPainter);
