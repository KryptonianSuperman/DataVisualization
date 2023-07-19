import "./style.css"

const Table = ({uniqueClasses, statsByClass, label}) => {
    return <table>
    <thead>
      <tr>
        <th>Measure</th>
        {uniqueClasses.map((alcoholClass) => (
          <th key={alcoholClass}>Class {alcoholClass}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{label} Mean</td>
        {uniqueClasses.map((alcoholClass) => (
          <td key={alcoholClass}>{statsByClass[alcoholClass].mean.toFixed(3)}</td>
        ))}
      </tr>
      <tr>
        <td>{label} Median</td>
        {uniqueClasses.map((alcoholClass) => (
          <td key={alcoholClass}>{statsByClass[alcoholClass].median.toFixed(3)}</td>
        ))}
      </tr>
      <tr>
        <td>{label} Mode</td>
        {uniqueClasses.map((alcoholClass) => (
          <td key={alcoholClass}>{parseFloat(statsByClass[alcoholClass].mode).toFixed(3)}</td>
        ))}
      </tr>
    </tbody>
  </table>
}

export default Table