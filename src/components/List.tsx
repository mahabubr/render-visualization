import styled from "@emotion/styled";
import React, { FC, RefObject, useRef } from "react";
import { Item } from "./Item";
import { SafelyRenderChildren } from "./SafelyRenderChildren";

const ScrollWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  width: 100%;
  height: 500px;
  overflow: auto;
`;

// const LoadingStyles = styled.p`
//   text-align: center;
//   margin: 10px 0;
//   font-weight: 700;
//   opacity: 0.2;

//   animation: fadeIn 2s ease-in-out infinite forwards;

//   @keyframes fadeIn {
//     0% {
//       opacity: 0.2;
//     }
//     50% {
//       opacity: 1;
//     }
//     100% {
//       opacity: 0.2;
//     }
//   }
// `;

const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;

export interface ListProps {
  items: string[];
  loading: boolean;
  search: string;
  linkRef: RefObject<HTMLDivElement>;
}

export const List: FC<ListProps> = ({
  items,
  children,
  loading,
  search,
  linkRef,
}) => {
  return (
    <ScrollWrapper id="inner-scroll" ref={linkRef}>
      <ListWrapper>
        {/**
         * Note: `SafelyRenderChildren` should NOT be removed while solving
         * this interview. This prevents rendering too many list items and
         * potentially crashing the web page. This also enforces an artificial
         * limit (5,000) to the amount of children that can be rendered at one
         * time during virtualization.
         */}
        <SafelyRenderChildren>
          {items
            .slice(0, 5000)
            .filter((value) => {
              if (search === "") return value;
              else if (value.toLowerCase().includes(search.toLowerCase()))
                return value;
            })
            .map((word, i) => (
              <Item key={i}>{word}</Item>
            ))}
          {/* {loading ? <LoadingStyles>Loading...</LoadingStyles> : ""} */}
        </SafelyRenderChildren>
      </ListWrapper>
    </ScrollWrapper>
  );
};
