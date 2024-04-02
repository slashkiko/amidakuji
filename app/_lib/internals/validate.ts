import { Effect, fail, flatMap, forEach, succeed } from "effect/Effect";
import { AKConfig, AKEdge } from "../types/amidakuji";
import { pipe } from "effect";

const validateEdge = (edge: AKEdge, maxLine: number): Effect<null, string> => {
    if (edge.line < 0 || edge.line >= maxLine) {
        return fail(`Invalid line number: ${edge.line}. Line number should be between 0 and ${maxLine - 1}.`);
    }
    return succeed(null);
};

const validate = (config: AKConfig): Effect<null, string> => {
    const maxLine = config.vLines;

    // 答えの検証
    const answersValidation = forEach(config.answers, (answer, i) =>
        answer ? succeed(null) : fail(`Answer for line ${i} is not set.`)
    );

    // 水平線の検証
    const hLinesValidation = config.hLines.reduce((acc, hLine) =>
        pipe(
            acc,
            flatMap(() =>
                pipe(
                    validateEdge(hLine.left, maxLine),
                    flatMap(() => validateEdge(hLine.right, maxLine)),
                    flatMap(() =>
                        hLine.left.line === hLine.right.line
                            ? fail(`Both ends of a horizontal line cannot be on the same vertical line: ${hLine.left.line}`)
                            : succeed(null)
                    )
                )
            )
        ),
        succeed(null) as Effect<null, string>
    );

    // 全てのバリデーションを組み合わせ
    return pipe(
        answersValidation,
        flatMap(() => hLinesValidation)
    );
}

export {
    validate,
};