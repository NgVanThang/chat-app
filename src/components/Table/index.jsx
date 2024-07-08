import React from 'react';

const StickyTable = () => {
  return (
    <div style={{ overflowX: 'auto', maxHeight: '400px' }}>
      <table>
        <thead>
          <tr>
            <th style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>Header 1</th>
            <th style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>Header 2</th>
            <th style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
            <td>Row 1, Cell 3</td>
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
            <td>Row 2, Cell 3</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default StickyTable;
