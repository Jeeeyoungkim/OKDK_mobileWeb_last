import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: ${(props) => (props.width ? props.width : "20rem")};
  height: ${(props) => (props.height ? props.height : "4rem")};
  color: white;
  border: none;
  background-color: ${(props) =>
    props.backgroundcolor ? props.backgroundcolor : "#056CF2"};
  border-radius: ${(props) =>
    props.borderradius ? props.borderradius : "30px"};
  &:hover {
    color: white;
    cursor: pointer;
  }
  margin: 0.5rem;
`;

const Text = styled.p`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.5rem")};
  color: ${(props) => (props.color ? props.color : "white")};
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : "Pretendard"};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "700")};
  text-align: center;
  margin: 0px;
`;

const Image = styled.img`
  width: 1.75rem;
  height: 1.75rem;
`;

const ButtonWarp = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const BasicButton = ({
  btnName,
  onClick,
  width,
  height,
  backgroundcolor,
  borderradius,
  fontSize,
  color,
  fontFamily,
  fontWeight,
  imguri,
}) => {
  return (
    <Button
      onClick={onClick}
      width={width}
      height={height}
      backgroundColor={backgroundcolor} // camelCase 사용
      borderRadius={borderradius} // camelCase 사용
    >
      <ButtonWarp>
        {imguri ? <Image src={imguri} /> : null}
        <Text
          fontSize={fontSize} // camelCase 사용
          color={color} // camelCase 사용
          fontFamily={fontFamily} // camelCase 사용
          fontWeight={fontWeight} // camelCase 사용
        >
          {btnName}
        </Text>
      </ButtonWarp>
    </Button>
  );
};

export default BasicButton;
