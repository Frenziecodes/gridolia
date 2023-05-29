import { useState } from 'react';

const Gridiola = () => {
  const [numRows, setNumRows] = useState(3);
  const [numColumns, setNumColumns] = useState(3);
  const [rowHeight, setRowHeight] = useState(100);
  const [columnWidth, setColumnWidth] = useState(100);
  const [rowGap, setRowGap] = useState(10);
  const [gridLayout, setGridLayout] = useState([]);

  const generateGridLayout = () => {
    const layout = [];
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numColumns; j++) {
        layout.push({ row: i, column: j });
      }
    }
    setGridLayout(layout);
  };

  const handleGridPropertiesChange = () => {
    generateGridLayout();
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-72 bg-teal-600 p-4">
        <h2 className="text-2xl font-bold mb-4">Gridiola</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Number of Rows</label>
          <input
            type="number"
            className="w-full rounded border-gray-300 px-2 py-2"
            value={numRows}
            onChange={(e) => setNumRows(parseInt(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Number of Columns</label>
          <input
            type="number"
            className="w-full rounded border-gray-300 px-2 py-2"
            value={numColumns}
            onChange={(e) => setNumColumns(parseInt(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Row Height</label>
          <input
            type="number"
            className="w-full rounded border-gray-300 px-2 py-2"
            value={rowHeight}
            onChange={(e) => setRowHeight(parseInt(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Column Width</label>
          <input
            type="number"
            className="w-full rounded border-gray-300 px-2 py-2"
            value={columnWidth}
            onChange={(e) => setColumnWidth(parseInt(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Row Gap</label>
          <input
            type="number"
            className="w-full rounded border-gray-300 px-2 py-2"
            value={rowGap}
            onChange={(e) => setRowGap(parseInt(e.target.value))}
          />
        </div>
        <button
          className="bg-teal-900 hover:bg-teal-800 text-white font-medium py-2 px-4 rounded"
          onClick={handleGridPropertiesChange}
        >
          Generate Grid
        </button>
      </div>

      <div className="w-full p-4 bg-teal-100">
        <h2 className="text-2xl font-bold mb-4 ">Grid Layout Preview</h2>
        <div
          className="grid"
          style={{
            gridTemplateRows: `repeat(${numRows}, ${rowHeight}px)`,
            gridTemplateColumns: `repeat(${numColumns}, ${columnWidth}px)`,
            gap: `${rowGap}px`,
          }}
        >
          {gridLayout.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 flex justify-center items-center"
            >
              {`${item.row + 1}, ${item.column + 1}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gridiola;
