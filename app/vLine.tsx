type VLineProps = {
  length: number;
  id: string;
};

const VLine = (props: VLineProps) => {
  const {
    length,
    id
  } = props;
  return (
    <div id={id} className="h-60 w-2 border border-black flex flex-col">
      {Array.from({ length }, (_, i) => (
        <div
          key={`${id}_${i}`}
          id={`${id}_${i}`}
          className="h-4 border-b border-black flex-1 flex items-center justify-center" //todo add bg-black
        />
      ))}
    </div>
  )
}

export { VLine };