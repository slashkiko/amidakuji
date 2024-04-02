import { useCallback, useState } from 'react';
import { AKConfig, AKEdge } from './_lib/types/amidakuji';
import { akLength } from './_lib/internals/constants';
import { addHLine, addVLine, defineAnswer, getDefaultConfig } from './_lib/internals/amidakuji';
import { main } from './_lib/internals/main';

const useAmidakuji = () => {
    const [config, setConfig] = useState<AKConfig>(getDefaultConfig());
    const [result, setResult] = useState();

    const handleClickAddVLine = useCallback(() => {
        setConfig(prev => addVLine(prev));
    }, [setConfig]);

    const handleBlurAnswer = useCallback((index: number, value: string) => {
        setConfig(prev => defineAnswer(prev, value, index));
    }, [setConfig]);

    const handleClickHLine = useCallback((left: AKEdge, right: AKEdge) => {
        setConfig(prev => addHLine(prev, left, right));
    }, [setConfig]);

    const handleClickStart = useCallback(async () => {
        const result = await main(config);
        console.log(result)
        setResult(result as any);
    }, [config, setResult]);


    return {
        config,
        akLength,
        handleBlurAnswer,
        handleClickAddVLine,
        handleClickHLine,
        handleClickStart,
        result,
    };
}

export {
    useAmidakuji,
};