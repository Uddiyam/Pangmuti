import { useNavigate } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

function Table({ columns, data, email, nickname, token }) {
  let navigate = useNavigate();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " ⬇︎" : " ⬆︎") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);

          return (
            <tr
              {...row.getRowProps()}
              key={i}
              onClick={() => {
                console.log(row.cells[0].row.original);
                navigate("/Restaurant", {
                  state: {
                    storeId: row.cells[0].row.original.storeId,
                    token: token,
                    nickname: nickname,
                    email: email,
                  },
                });
              }}
            >
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
