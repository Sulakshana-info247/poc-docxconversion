const tableContent = `
  <table border="1">
    <thead>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Row 1, Col 1</td>
        <td>Row 1, Col 2</td>
        <td>Row 1, Col 3</td>
      </tr>
      <tr>
        <td>Row 2, Col 1</td>
        <td>Row 2, Col 2</td>
        <td>Row 2, Col 3</td>
      </tr>
      <tr>
        <td>Row 3, Col 1</td>
        <td>Row 3, Col 2</td>
        <td>Row 3, Col 3</td>
      </tr>
      <tr>
        <td>Row 4, Col 1</td>
        <td>Row 4, Col 2</td>
        <td>Row 4, Col 3</td>
      </tr>
    </tbody>
  </table>
`;


    const tableContainer = document.getElementById('table-container');
    const contextMenu = document.getElementById('context-menu');

    tableContainer.innerHTML = tableContent;

    // Function to show the context menu
    function showContextMenu(event) {
      event.preventDefault();
      const rowIndex = event.target.parentElement.rowIndex;
      const cellIndex = event.target.cellIndex;

      // Show context menu at mouse position
      contextMenu.style.display = 'block';
      contextMenu.style.left = `${event.pageX}px`;
      contextMenu.style.top = `${event.pageY}px`;

      // Store rowIndex and cellIndex for menu actions
      contextMenu.dataset.rowIndex = rowIndex;
      contextMenu.dataset.cellIndex = cellIndex;
    }

    // Use event delegation to handle right-click on cells
    tableContainer.addEventListener('contextmenu', (event) => {
      if (event.target.tagName === 'TD') {
        showContextMenu(event);
      }
    });

    document.addEventListener('click', () => {
      // Hide context menu when clicking outside
      contextMenu.style.display = 'none';
    });

    document.getElementById('add-row').addEventListener('click', () => {
      const rowIndex = contextMenu.dataset.rowIndex;
      const table = tableContainer.querySelector('table');
      const newRow = table.insertRow(parseInt(rowIndex) + 1);

      // Add new cells to the row
      const cellCount = table.rows[0].cells.length;
      for (let i = 0; i < cellCount; i++) {
        newRow.insertCell(i).textContent = `New Row, Col ${i + 1}`;
      }

      contextMenu.style.display = 'none';
    });

    document.getElementById('add-column').addEventListener('click', () => {
      const table = tableContainer.querySelector('table');
      const rows = table.rows;
      const cellIndex = contextMenu.dataset.cellIndex;

      // Insert new column immediately to the right of the current column
      for (let i = 0; i < rows.length; i++) {
        rows[i].insertCell(parseInt(cellIndex) + 1).textContent = `New Column ${i + 1}, Col ${parseInt(cellIndex) + 2}`;
      }

      // Update header for new column
      rows[0].cells[parseInt(cellIndex) + 1].textContent = `Header ${parseInt(cellIndex) + 2}`;

      contextMenu.style.display = 'none';
    });

    document.getElementById('delete-row').addEventListener('click', () => {
      const rowIndex = contextMenu.dataset.rowIndex;
      const table = tableContainer.querySelector('table');
      const row = table.rows[rowIndex]; // Get the row by index

      if (row) {
        table.deleteRow(row.rowIndex);
      }

      contextMenu.style.display = 'none';
    });

    document.getElementById('delete-column').addEventListener('click', () => {
      const table = tableContainer.querySelector('table');
      const cellIndex = contextMenu.dataset.cellIndex;
      const rows = table.rows;

      // Delete column
      for (let i = 0; i < rows.length; i++) {
        rows[i].deleteCell(cellIndex);
      }

      contextMenu.style.display = 'none';
    });