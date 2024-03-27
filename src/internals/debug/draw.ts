import { AKConfig, AKEdge } from "../../types/amidakuji";
import { akLength } from "../constants";

/**
 * あみだくじの状態をコンソールに描画する
 * @param config あみだくじの設定
 */
const draw = (config: AKConfig) => {
    // 垂直線の番号を出力
    drawVerticalLineNumbers(config.vLines);

    // あみだくじの中間状態を出力
    drawIntermediateState(config);

    // 各垂直線に対応する答えを出力
    drawAnswers(config.answers);
}

/**
 * 垂直線の番号を出力する
 * @param numLines 垂直線の数
 */
const drawVerticalLineNumbers = (numLines: number) => {
    for (let i = 0; i < numLines; i++) {
        process.stdout.write(`${i + 1}  `);
    }
    process.stdout.write("\n");
}

/**
 * あみだくじの中間状態を出力する
 * @param config あみだくじの設定
 */
const drawIntermediateState = (config: AKConfig) => {
    const hLineMap = createHLineMap(config.hLines);

    for (let t = 0; t < akLength; t++) {
        for (let i = 0; i < config.vLines; i++) {
            process.stdout.write("|");
            const coordinate = hLineMap.get(i)?.get(t) ?? false;
            process.stdout.write(coordinate ? "--" : "  ");
        }
        process.stdout.write("\n");
    }
}

/**
 * 各垂直線に対応する答えを出力する
 * @param answers 答えの配列
 */
const drawAnswers = (answers: string[]) => {
    for (const answer of answers) {
        process.stdout.write(`${answer}  `);
    }
    process.stdout.write("\n");
}

/**
 * 水平線の情報をマップに変換する
 * @param hLines 水平線の配列
 * @returns 水平線の情報を格納したマップ
 */
const createHLineMap = (hLines: { left: AKEdge; right: AKEdge }[]) => {
    const hLineMap = new Map<number, Map<number, boolean>>();

    for (const { left, right } of hLines) {
        for (let i = left.line; i < right.line; i++) {
            if (!hLineMap.has(i)) {
                hLineMap.set(i, new Map());
            }
            const lineMap = hLineMap.get(i)!;
            for (let j = left.coordinate; j <= right.coordinate; j++) {
                lineMap.set(j, true);
            }
        }
    }
    return hLineMap;
}


// const draw = (config: AKConfig) => {
//     for (let i = 0; i < config.vLines; i++) {
//         // start
//         process.stdout.write((i + 1).toString());
//         process.stdout.write('  ');
//     }
//     process.stdout.write('\n');

//     for (let t = 0; t < 10; t++) {
//         for (let i = 0; i < config.vLines; i++) {
//             process.stdout.write('|');
//             const line = config.hLines.find(hl => hl.left.line === i && hl.left.coordinate === t);
//             if (line) {
//                 process.stdout.write('--');
//             } else {
//                 process.stdout.write('  ');
//             }
//         }
//         process.stdout.write('\n');
//     }

//     for (let i = 0; i < config.vLines; i++) {
//         // end
//         process.stdout.write(config.answers[i]);
//         process.stdout.write('  ');
//     }
//     process.stdout.write('\n');

// }

export {
    draw,
};