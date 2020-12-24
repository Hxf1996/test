registerLayout('center1', class {
    static inputProperties = ['line-height', 'text-align', 'font-size'];
    static childInputProperties = ["--relative-name", "--font-size1"];
    static layoutOptions = {
        childDisplay: 'normal',
        sizing: 'block-like',
    }

    async intrinsicSizes(children, edges, styleMap) {
        console.log(1);
    }

    async layout(children, edges, constraints, styleMap, breakToken) {
        // 布局相关代码
        let lineHeight = styleMap.get('line-height').value;
        let textAlign = styleMap.get('text-align').value;

        // 计算内容的长度
        const childrenSizes = await Promise.all(children.map((child) => {
            return child.intrinsicSizes();
        }));

        // 求得最大内容宽度
        const maxContentSize = childrenSizes.reduce((max, childSizes) => {
            return Math.max(max, childSizes.maxContentSize);
        }, 0) + edges.inline;

        // 下面这4个const语句是固定的
        const availableInlineSize = constraints.fixedInlineSize - edges.inline;
        const availableBlockSize = constraints.fixedBlockSize ?
            constraints.fixedBlockSize - edges.block : lineHeight;

        const childConstraints = { availableInlineSize, availableBlockSize };

        const childFragments = await Promise.all(children.map((child) => {
            return child.layoutNextFragment(childConstraints);
        }));

        // 子元素的垂直偏移大小
        let blockOffset = edges.blockStart;

        childFragments.forEach((fragment, index) => {
            fragment.inlineOffset = Math.max(0, availableInlineSize - maxContentSize) / 2;
            if (textAlign == 'right' || textAlign == 'end') {
                fragment.inlineOffset += (maxContentSize - childrenSizes[index].maxContentSize);
            }

            fragment.blockOffset = blockOffset;

            // 偏移递增
            blockOffset += lineHeight;
        });

        // 最终元素的高度大小
        const autoBlockSize = blockOffset + edges.blockEnd - 50;

        return {
            blockSize: 100,
            inlineSize: 1000,
            autoBlockSize,
            childFragments,
            data: 123,
        };
    }
});
