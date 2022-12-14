import { useNavigate, Link } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import styles from "./styles/ForumTable.module.css";

function Table({ columns, data, email, nickname, token, Img }) {
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
              }}
            >
              {row.cells.map((cell) => (
                <td className={styles.Content} {...cell.getCellProps()}>
                  <Link
                    to={"/Restaurant/" + row.original.storeId}
                    state={{
                      storeId: row.original.storeId,
                      token: token,
                      nickname: nickname,
                      email: email,
                      Img: Img,
                    }}
                    className={styles.cell}
                  >
                    {cell.render("Cell")}
                  </Link>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
