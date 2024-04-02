import { main } from "./internals/main";
import { AKConfig, AKEdge } from "./types/amidakuji";
import { pipe } from "effect";

const debug = false;
const getDefaultConfig = () => ({
    vLines: 1,
    answers: [''],
    hLines: [],
} as const satisfies AKConfig);
/**
 * 新しい垂直線を追加し、対応する答えを空文字列で初期化する
 * @param config 現在の設定
 * @returns 更新された設定
 */
const addVLine = (config: AKConfig): AKConfig => {
    const newVLine = config.vLines + 1;
    const newAnswers = [...config.answers, ""];
    return {
        ...config,
        vLines: newVLine,
        answers: newAnswers
    };
}

/**
 * 指定された線番号の垂直線とそれに関連する水平線を削除する
 * @param config 現在の設定
 * @param line 削除する垂直線の番号
 * @returns 更新された設定
 */
const deleteVLine = (config: AKConfig, line: number): AKConfig => {
    const newVLines = config.vLines - 1;
    const newAnswers = config.answers.filter((_, i) => i !== line);
    const newHLines = config.hLines.filter(({ left, right }) => left.line !== line && right.line !== line).map(({ left, right }) => ({
        left: { line: left.line > line ? left.line - 1 : left.line, coordinate: left.coordinate },
        right: { line: right.line > line ? right.line - 1 : right.line, coordinate: right.coordinate },
    }));

    return {
        vLines: newVLines,
        answers: newAnswers,
        hLines: newHLines
    };
}

/**
 * 指定された線番号の答えを設定する
 * @param config 現在の設定
 * @param answer 設定する答え
 * @param line 答えを設定する垂直線の番号
 * @returns 更新された設定
 */
const defineAnswer = (config: AKConfig, answer: string, line: number): AKConfig => {
    const newAnswers = [...config.answers];
    newAnswers[line] = answer;
    return {
        ...config,
        answers: newAnswers
    };
}

/**
 * 新しい水平線を追加する
 * @param config 現在の設定
 * @param left 水平線の左端の座標
 * @param right 水平線の右端の座標
 * @returns 更新された設定
 */
const addHLine = (config: AKConfig, left: AKEdge, right: AKEdge): AKConfig => {
    const newHLines = [...config.hLines, { left, right }];
    return {
        ...config,
        hLines: newHLines
    };
}

const generateTestConfig = () => {
    const config = pipe(
        getDefaultConfig(),
        addVLine,
        addVLine,
        addVLine,
        addVLine,
        addVLine,
        conf => defineAnswer(conf, 'A', 0),
        conf => defineAnswer(conf, 'B', 1),
        conf => defineAnswer(conf, 'D', 3),
        conf => defineAnswer(conf, 'C', 2),
        conf => defineAnswer(conf, 'E', 4),
        conf => defineAnswer(conf, 'F', 5),
        conf => addHLine(conf, { line: 0, coordinate: 1 }, { line: 1, coordinate: 1 }),
        conf => addHLine(conf, { line: 1, coordinate: 2 }, { line: 2, coordinate: 2 }),
        conf => addHLine(conf, { line: 2, coordinate: 3 }, { line: 3, coordinate: 3 }),
        conf => addHLine(conf, { line: 3, coordinate: 1 }, { line: 4, coordinate: 1 }),
        conf => addHLine(conf, { line: 1, coordinate: 4 }, { line: 2, coordinate: 4 }),
        conf => deleteVLine(conf, 3),
    );
    return config;
}
const config = generateTestConfig();
main(config, debug).then(result => console.dir(result, { depth: null })).catch(console.error);