import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: ${(props) => (props.width ? props.width : "20rem")};
  height: ${(props) => (props.height ? props.height : "4rem")};
  color: white;
  border: none;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#056CF2"};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "30px"};
  &:hover {
    color: white;
    cursor: pointer;
  }
`;

const Text = styled.p`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.5rem")};
  color: ${(props) => (props.color ? props.color : "white")};
  font-family: ${(props) =>
    props.fontfamily ? props.fontfamily : "Pretendard"};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "700")};
  text-align: center;
  margin: 0px;
`;
const BasicButton = ({
  btnName,
  onClick,
  width,
  height,
  backgroundColor,
  borderRadius,
  fontSize,
  color,
  fontfamily,
  fontWeight,
}) => {
  return (
    <Button
      onClick={onClick}
      width={width}
      height={height}
      background-color={backgroundColor}
      border-radius={borderRadius}
    >
      <Text
        font-size={fontSize}
        color={color}
        font-family={fontfamily}
        font-weight={fontWeight}
      >
        {btnName}
      </Text>
    </Button>
  );
};

export default BasicButton;
