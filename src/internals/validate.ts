import { AKConfig, AKEdge } from "../types/amidakuji";

const validateEdge = (edge: AKEdge, maxLine: number): string | null => {
    if (edge.line < 0 || edge.line >= maxLine) {
        return `Invalid line number: ${edge.line}. Line number should be between 0 and ${maxLine - 1}.`;
    }
    return null;
};

const validate = (config: AKConfig): string | null => {
    const maxLine = config.vLines;

    // 答えの検証
    for (let i = 0; i < config.answers.length; i++) {
        if (!config.answers[i]) {
            return `Answer for line ${i} is not set.`;
        }
    }

    // 水平線の検証
    for (const hLine of config.hLines) {
        const leftError = validateEdge(hLine.left, maxLine);
        const rightError = validateEdge(hLine.right, maxLine);

        if (leftError) return leftError;
        if (rightError) return rightError;

        // 水平線の両端が同じ垂直線上にあってはいけない
        if (hLine.left.line === hLine.right.line) {
            return `Both ends of a horizontal line cannot be on the same vertical line: ${hLine.left.line}`;
        }
    }

    return null;
}

export {
    validate,
};