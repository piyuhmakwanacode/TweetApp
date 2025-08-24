const LoaderGrid = () => {
  const delays = [
    0, 75, 150,
    225, 300, 375,
    450, 525, 600
  ];

  return (
    <div className="relative w-10 h-10">
      {Array.from({ length: 9 }).map((_, idx) => {
        const row = Math.floor(idx / 3);
        const col = idx % 3;
        const top = (row - 1) * 20; // -20, 0, 20
        const left = (col - 1) * 20;

        return (
          <div
            key={idx}
            className="absolute w-2.5 h-2.5 bg-gray-300 animate-loader"
            style={{
              top: '50%',
              left: '50%',
              marginTop: `${top - 5}px`,
              marginLeft: `${left - 5}px`,
              animationDelay: `${delays[idx]}ms`,
            }}
          />
        );
      })}
    </div>
  );
};

export default LoaderGrid;
