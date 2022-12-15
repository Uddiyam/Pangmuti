import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import Button from "react-bootstrap/Button";
import styles from "./styles/Restaurant.module.css";
import axios from "axios";
import ReactGA from "react-ga";
function Table({ columns, data, email, nickname, token, re, storeId, Img }) {
  ReactGA.initialize("UA-252097560-1");
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  let navigate = useNavigate();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);
  const [myReview, setMyReview] = useState([]);
  const [TF, setTF] = useState(false);
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
            <>
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell) => (
                  <>
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  </>
                ))}
                {row.original.reviewId ==
                  (row.original.myReview && row.original.reviewId) && (
                  <Button
                    className={styles.DeleteBtn}
                    onClick={() => {
                      ReactGA.event({
                        category: "Button",
                        action: "리뷰삭제",
                        label: "review",
                      });
                      setTF(!TF);
                      axios
                        .delete("http://52.44.107.157:8080/api/review/delete", {
                          data: {
                            reviewId: row.original.reviewId,
                          },

                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })

                        .then((res) => {
                          navigate("/Restaurant/" + storeId, {
                            state: {
                              email: email,
                              nickname: nickname,
                              token: token,
                              re: TF,
                              storeId: storeId,
                              Img: Img,
                            },
                          });
                        })
                        .catch((err) => {
                          // console.log(err);
                        });
                    }}
                  >
                    삭제
                  </Button>
                )}
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
