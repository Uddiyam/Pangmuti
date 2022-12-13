import React from "react";
import { useState } from "react";
import styled from "styled-components";
import "./styles/Pagination.css";

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }

  position: relative;
  transform: translateX(-40%);
`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const [num, setNum] = useState();
  const [a, setA] = useState(1);
  return (
    <>
      <nav>
        <div className="pagination">
          {pageNumbers.map((number) => (
            <div key={number} className="page-item">
              {a == 1 ? (
                <PageSpan
                  onClick={() => {
                    paginate(number);
                    setNum(number);
                    setA("");
                  }}
                  className="page-link"
                  id={number}
                  style={{
                    color: number == 1 && "#D5C67A",
                    backgroundColor: number == 1 && "rgba(5, 47, 95, 1)",
                  }}
                >
                  {number}
                </PageSpan>
              ) : (
                <PageSpan
                  onClick={() => {
                    paginate(number);
                    setNum(number);
                    setA("");
                  }}
                  className="page-link"
                  id={number}
                  style={{
                    color:
                      document.getElementById(number) &&
                      document.getElementById(number).id == num &&
                      "#D5C67A",
                    backgroundColor:
                      document.getElementById(number) &&
                      document.getElementById(number).id == num &&
                      "rgba(5, 47, 95, 1)",
                  }}
                >
                  {number}
                </PageSpan>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Pagination;
