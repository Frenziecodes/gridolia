import { useState } from 'react';
import copy from 'copy-to-clipboard';
import Modal from '../Components/Modal';
import Header from './header';
const Gridiola = () => {
  
  const [numRows, setNumRows] = useState(3);
  const [numColumns, setNumColumns] = useState(3);
  const [rowHeight, setRowHeight] = useState(100);
  const [columnWidth, setColumnWidth] = useState(100);
  const [rowGap, setRowGap] = useState(10);
  const [gridLayout, setGridLayout] = useState([]);
  const [isTextCopied, setIsTextCopied] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleRecoverData = (recoveredNumRows) => {
    console.log(true)
    setNumRows(recoveredNumRows[0])
    setNumColumns(recoveredNumRows[1])
    setRowHeight(recoveredNumRows[2])
    setColumnWidth(recoveredNumRows[3])
    setRowGap(recoveredNumRows[4])
    localStorage.clear()
    setIsBannerVisible(false);

  };

  const save = () => {
    const l = [numRows, numColumns, rowHeight, columnWidth, rowGap];
    localStorage.setItem('saver_data', l);
    setShowSuccessMessage(true);

    // Reset the success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

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

  const generateCss = () => {
    const arr = ["display: grid;"];
    if (numRows) {
      arr.push(`grid-template-rows: repeat(${numRows}, ${rowHeight}px);`);
    }
    if (numColumns) {
      arr.push(`grid-template-columns: repeat(${numColumns}, ${columnWidth}px);`);
    }
    if (rowGap) {
      arr.push(`gap: ${rowGap}px;`);
    }
    return arr;
  };

  const handleCopy = () => {
    setIsTextCopied(true);
    setTimeout(() => setIsTextCopied(false), 3000);
    return generateCss().join('\n');
  };
  
  return (
    
    
    
    <div className="flex flex-col lg:flex-row min-h-screen">
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block mr-2 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="inline-block align-middle">Action successfully completed!</span>
        </div>
      </div>
      )}
      
      <div className="lg:w-72 bg-teal-600 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">GRIDIOLA</h2>
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
          className="  bg-gradient-to-r from-teal-700 text- to-teal-900 text-white font-medium py-2 px-4 rounded "
          onClick={handleGridPropertiesChange}
        >
          Generate Grid
        </button>
        <Modal.Button id="modal" title="Generate Code" />
        <Modal>
          <div className="from-teal-700 text- to-teal-900 z-50 flex flex-col items-center justify-center h-auto p-4 space-x-4 space-y-5 bg-white rounded-lg">
            <code className="p-2 border-l-2 bg-slate-50 h-full">
              <ul>
                {'{'}
                {generateCss().map((item, i) => (
                  <li className="list-none pl-4" key={i}>
                    {item}
                  </li>
                ))}
                {'}'}
              </ul>
            </code>
            <div className="flex justify-evenly w-full">
              <button
                className="px-4 py-2 font-medium text-white bg-teal-900 rounded hover:bg-teal-800"
                onClick={() => copy(handleCopy())}
              >
                {isTextCopied ? 'Copied' : 'Copy'}
              </button>
              <label
                htmlFor="modal"
                className="inline-block px-3 py-2 font-medium text-teal-900 bg-white rounded cursor-pointer hover:bg-slate-300"
              >
                Close
              </label>
            </div>
          </div>
        </Modal>
        
        <button 
        className=' mt-5 bg-gradient-to-r from-teal-700 text- to-teal-900 text-white font-medium py-2 px-4 rounded '
        onClick={() => copy(save())}
        >
          Save Grid
        </button>
      </div>
      <div className="w-full  bg-teal-100">
        {isBannerVisible && (
          <Header onRecoverData={handleRecoverData}></Header>

        )}
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
