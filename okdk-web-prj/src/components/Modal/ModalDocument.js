import React, { useState } from "react";
import styled from "styled-components";


export const ModalDocumentStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const ModalDocument = () => {
    return (
        <>
            <ModalDocumentStyle/>
        </>
    );
}