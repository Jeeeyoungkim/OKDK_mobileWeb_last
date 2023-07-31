import React, { useState } from "react";
import styled from "styled-components";


const OverlayStyle = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Overlay = () => {
  return (
    <>
      <OverlayStyle/>
    </>
  );
};
