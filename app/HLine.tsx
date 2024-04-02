const HLine = () => {
    return (
        <div className="h-6 flex flex-col items-center justify-center">
            <div className="bg-black w-5 h-1" />
        </div>
    )
}

type HLinesProps = {
    length: number;
    id: string;
};

const HLines = (props: HLinesProps) => {
    const {
        length,
        id
    } = props;
    return (
        <div id={id} className="h-60 w-5 flex flex-col">
            {Array.from({ length }, (_, i) => (
                <HLine />
            ))}
        </div>
    )
}


export { HLines };