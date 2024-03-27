import { main } from "./internals/main";
import { AKConfig, AKEdge } from "./types/amidakuji";

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
    const tmp = addVLine(addVLine(addVLine(addVLine(addVLine(getDefaultConfig())))));
    const tmp2 = defineAnswer(defineAnswer(defineAnswer(defineAnswer(defineAnswer(defineAnswer(tmp, 'A', 0), 'B', 1), 'D', 3), 'C', 2), 'E', 4), 'F', 5);
    const tmp3 = addHLine(addHLine(addHLine(addHLine(addHLine(tmp2, { line: 0, coordinate: 1 }, { line: 1, coordinate: 1 }), { line: 1, coordinate: 2 }, { line: 2, coordinate: 2 }), { line: 2, coordinate: 3 }, { line: 3, coordinate: 3 }), { line: 3, coordinate: 1 }, { line: 4, coordinate: 1 }), { line: 1, coordinate: 4 }, { line: 2, coordinate: 4 });
    const config = deleteVLine(tmp3, 3);
    return config;
}
const config = generateTestConfig();
main(config, debug).then(result => console.dir(result, { depth: null })).catch(console.error);