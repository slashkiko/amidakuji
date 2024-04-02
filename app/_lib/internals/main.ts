import { runSyncExit } from "effect/Effect";
import { AKConfig, AKEdge } from "../types/amidakuji";
import { akLength } from "./constants";
import { draw } from "./debug/draw";
import { validate } from "./validate";

/**
 * あみだくじの結果を求める
 * @param config あみだくじの設定
 * @param debug デバッグモードを有効にするかどうか
 * @returns 結果の答え、または false (設定が無効な場合)
 */
const main = async (config: AKConfig, debug?: boolean) => {
    const start = 0;
    const goal = akLength;
    const error = runSyncExit(validate(config));
    if (error._tag === 'Failure') {
        console.error(error.cause);
        return false;
    }
    // if (debug) {
    draw(config);
    // }
    const current = { line: 0, coordinate: start };
    if (debug) {
        console.log(`current line: ${current.line + 1}`);
    }
    const path = [] as { line: number, coordinate: number, hLine: AKEdge | null }[];
    while (current.coordinate < goal) {
        path.push({ ...current, hLine: null });
        const nextMove = getNextMove(current, config.hLines, debug);
        if (current.line !== nextMove.line) {
            path.push({ ...current, hLine: nextMove.hLine });
        }
        current.line = nextMove.line;
        current.coordinate = nextMove.coordinate;

        current.coordinate++;
    }

    const result = config.answers[current.line];
    if (debug) {
        console.log(`goal: ${result}`);
    }

    return { result, path };
}

/**
 * 現在位置から次の位置への移動方向を取得する
 * @param current 現在位置
 * @param hLineMap 水平線の情報が格納されたマップ
 * @returns 次の位置
 */
const getNextMove = (current: AKEdge, hLines: { left: AKEdge, right: AKEdge }[], debug?: boolean): AKEdge & { hLine: AKEdge | null } => {
    const rightLine = hLines.find(hl => (hl.left.line === current.line && hl.left.coordinate === current.coordinate))?.right;
    const leftLine = hLines.find(hl => (hl.right.line === current.line && hl.right.coordinate === current.coordinate))?.left;
    if (rightLine) {
        // 右に移動
        if (debug) {
            console.log(`move right`);
            console.log(`current line: ${current.line + 2}`);
        }
        return {
            line: rightLine.line,
            coordinate: rightLine.coordinate,
            hLine: rightLine,
        };
    }
    else if (leftLine) {
        // 左に移動
        if (debug) {
            console.log(`move left`);
            console.log(`current line: ${current.line}`);
        }
        return {
            line: leftLine.line,
            coordinate: leftLine.coordinate,
            hLine: leftLine,
        };
    } else {
        return {
            ...current,
            hLine: null,
        };
    }
}


export {
    main,
};