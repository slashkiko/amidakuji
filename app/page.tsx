'use client';
import { HLines } from './HLine';
import { useAmidakuji } from './hooks';
import { VLine } from './vLine';

const Amidakuji: React.FC = () => {
  const {
    config,
    akLength,
    handleBlurAnswer,
    handleClickAddVLine,
    handleClickHLine,
    handleClickStart,
    result,
  } = useAmidakuji();

  console.log(result)

  return (
    <div className='p-10'>
      <div className="grid grid-cols-10">
        {Array.from({ length: config.vLines }, (_, i) => (
          <div key={i}>{i + 1}
          </div>))}
      </div>
      <div className="grid grid-cols-10">
        {Array.from({ length: config.vLines }, (_, i) => (
          <div key={i} className='flex'>
            <VLine id={`v-line-${i}`} length={akLength} />
            <HLines id={`h-line-${i}-${i + 1}`} length={akLength} />

            {/* <div className="h-60 w-2 border border-black flex flex-col">
              {Array.from({ length: akLength }, (_, j) => (
                <div
                  key={j}
                  className="h-4 border-b border-black flex-1 flex items-center justify-center" //todo add bg-black
                  onClick={() =>
                    handleClickHLine(
                      { line: i, coordinate: j },
                      { line: i + 1, coordinate: j }
                    )
                  }
                >
                  {config.hLines.find(
                    (hl) =>
                      (hl.left.line === i &&
                        hl.left.coordinate === j) ||
                      (hl.right.line === i &&
                        hl.right.coordinate === j)
                  ) && <div className="h-2 w-2 bg-gray-500 rounded-full" />}
                </div>
              ))}
            </div> */}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-10">
        {Array.from({ length: config.vLines }, (_, i) => (
          <input
            type="text"
            onBlur={(e) => handleBlurAnswer(i, e.target.value)}
            className="mt-2 w-12 border border-gray-300 rounded px-2 py-1"
          />))}
      </div>
      <button
        onClick={handleClickAddVLine}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Vertical Line
      </button>
      <button
        onClick={handleClickStart}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        start
      </button>

    </div >
  );
};

export default Amidakuji;