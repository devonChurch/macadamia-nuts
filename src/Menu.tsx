import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { Icon, useIconContext, getIconColor, ICON_LIST } from "./Icon";

const styleButtonReset = css`
  background: transparent;
  border: 0;
  cursor: pointer;
  outline: 0;
  padding: 0;
`;

const Ring = styled.button<{ isActive: boolean }>`
  ${styleButtonReset}
  align-items: center;
  background: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  height: 3rem;
  margin: 1rem;
  position: relative;
  width: 3rem;

  ${({ isActive }) =>
    isActive &&
    css`
      &:before {
        border: 2px solid white;
        border-radius: 50%;
        content: "";
        display: block;
        position: absolute;
        height: calc(100% + 6px);
        width: calc(100% + 6px);
      }
    `}
`;

const List = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
`;

const Item = styled(Icon)`
  height: 2rem;
  width: 2rem;
  fill: ${({ kind }) => getIconColor(kind).medium};
`;

export const Menu: FunctionComponent<{}> = () => {
  const { handleIconChange, activeIcon } = useIconContext();
  return (
    <List>
      {ICON_LIST.map((kind) => (
        <Ring
          key={kind}
          isActive={activeIcon === kind}
          onClick={() => handleIconChange(kind)}
        >
          <Item kind={kind} />
        </Ring>
      ))}
    </List>
  );
};
