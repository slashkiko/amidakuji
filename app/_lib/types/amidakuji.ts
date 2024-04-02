/**
 * あみだくじの水平線の端点の座標を表すオブジェクト
 * @property {number} line - 端点が接続される垂直線の番号
 * @property {number} coordinate - 水平線の座標
 */
type AKEdge = {
    line: number;
    coordinate: number;
}

/**
 * あみだくじアプリケーションの設定を表すオブジェクト
 * @property {number} vLines - 垂直線の数
 * @property {string[]} answers - 各垂直線に対応する答えの配列
 * @property {{left: AKEdge, right: AKEdge}[]} hLines - 水平線の情報を格納する配列
 */
type AKConfig = {
    vLines: number;
    answers: string[];
    hLines: {
        left: AKEdge;
        right: AKEdge;
    }[];
}

export type {
    AKConfig,
    AKEdge,
};