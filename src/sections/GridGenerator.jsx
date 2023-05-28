import { useState, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import copy from 'copy-to-clipboard';

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridGenerator = () => {
  const [layout, setLayout] = useState([]);
  const [gridItems, setGridItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const handleAddBox = () => {
    const newItem = {
      i: gridItems.length.toString(),
      x: 0,
      y: Infinity,
      w: 2,
      h: 2,
    };

    setGridItems([...gridItems, newItem]);
  };

  const handleRemoveBox = (boxId) => {
    const updatedItems = gridItems.filter((item) => item.i !== boxId);
    setGridItems(updatedItems);
  };

  const handleEditLabel = (boxId, newLabel) => {
    const updatedItems = gridItems.map((item) =>
      item.i === boxId ? { ...item, label: newLabel } : item
    );
    setGridItems(updatedItems);
  };

  const handleGenerateLayout = () => {
    const gridTemplateColumns = `repeat(${layout[0].w}, 1fr)`;
    const gridTemplateRows = `repeat(${layout[0].h}, 1fr)`;

    const htmlCode = `
<div class="grid-container">
  ${gridItems
    .map(
      (item) => `<div class="grid-item">${item.label || item.i}</div>`
    )
    .join('\n')}
</div>
`;

    const cssCode = `
.grid-container {
  display: grid;
  grid-template-columns: ${gridTemplateColumns};
  grid-template-rows: ${gridTemplateRows};
}

.grid-item {
  /* Add styling for grid items */
}
`;

    setGeneratedCode(htmlCode + cssCode);
    setShowModal(true);
  };

  const handleCopyCode = () => {
    copy(generatedCode);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const codeTextAreaRef = useRef(null);

  return (
    <div className="container">
      <div className="flex  min-h-screen">
        <div className="shadow-2xl bg-teal-900 p-3 w-72">
          <h1 className="text-2xl text-white font-bold mb-4">GRIDOLIA</h1>
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleGenerateLayout}
            >
              Generate Layout
            </button>
          </div>

          <div>
            {gridItems.map((item) => (
              <div
                key={item.i}
                className="bg-white rounded shadow p-2 mb-4 w-68 flex justify-between"
              >
                <input
                  type="text"
                  value={item.label || ''}
                  onChange={(e) => handleEditLabel(item.i, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                  placeholder="Label"
                />
                <button
                  className="bg-red-500 text-white w-10 px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleRemoveBox(item.i)}
                >
                  x
                </button>
              </div>
            ))}

            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleAddBox}
            >
              Add Box
            </button>
          </div>
        </div>

        <div className="bg-teal-100 flex-grow">
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={30}
            onLayoutChange={handleLayoutChange}
          >
            {gridItems.map((item) => (
              <div
                key={item.i}
                className="bg-white rounded shadow p-2 flex items-center justify-center"
                data-grid={item}
              >
                {item.label || item.i}
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow">
            <textarea
              ref={codeTextAreaRef}
              className="w-full h-40 border border-gray-300 rounded px-2 py-1 mb-4"
              value={generatedCode}
              readOnly
            />

            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                onClick={handleCopyCode}
              >
                Copy Code
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GridGenerator;
