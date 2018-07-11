registerLayout('random-layout', class {
    static get inputProperties() {
        return [];
    }
    static get childrenInputProperties() {
        return [];
    }
    layout(children, constraintSpace, styleMap) {
        const width = constraintSpace.width;
        const height = constraintSpace.height;
        for (let child of children) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const constraintSubSpace = new ConstraintSpace();
            constraintSubSpace.width = width - x;
            constraintSubSpace.height = height - y;
            const childFragment = child.doLayout(constraintSubSpace);
            childFragment.x = x;
            childFragment.y = y;
        }

        return {
            minContent: 0,
            maxContent: 0,
            width: width,
            height: height,
            fragments: [],
            unPositionedChildren: [],
            breakToken: null
        };
    }
});