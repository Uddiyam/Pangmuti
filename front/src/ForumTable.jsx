import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import styles from "./styles/ForumTable.module.css";
import RouteChangeTracker from "./RouteChangeTracker";
import ReactGA from "react-ga";

function ForumTable({ columns, data, email, nickname, token, Img }) {
  ReactGA.initialize("UA-252097560-1");
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);
  RouteChangeTracker();
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
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>
                  <Link
                    to={"/ForumDetail/" + row.original.postId}
                    state={{
                      email: email,
                      token: token,
                      nickname: nickname,
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

export default ForumTable;
