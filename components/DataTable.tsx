const DataTable = ({ data, columns }) => {
  return <>

    <table>
      <thead>
        <tr>
          {columns.map((col, index) => <th key={index} style={{ display: col.hide ? 'none' : 'table-cell' }}>{col.title}</th>)}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) =>
          <tr key={rowIndex}>
            {columns.map((col, colIndex) =>
              <td key={colIndex} style={{ display: col.hide ? 'none' : 'table-cell' }}>{col.value(row)}</td>)}
          </tr>)}
      </tbody>
    </table>

  </>
}

export default DataTable;