import React from "react";
import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;

export const BarcodeNumber = styled.text`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const BarcodeName = styled.div`
  white-space: nowrap;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export default function Barcode({ img, num, name }) {
  return (
    <Wrap>
      <img
        style={{
          width: "6.25rem",
          height: "3.937rem",
        }}
        src={img}
      />
      <BarcodeNumber>{num}</BarcodeNumber>
      <BarcodeName>{name}</BarcodeName>
    </Wrap>
  );
}
