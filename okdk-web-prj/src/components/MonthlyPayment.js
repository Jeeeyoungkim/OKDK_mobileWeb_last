import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export default function MonthlyPayment({ monthlypayment }) {
  const fill = "rgb(5, 108, 242)";
  var average = 0;
  monthlypayment.map((item, index) => {
    average += item.month_payment;
  });
  var data = [average / 3];
  var labels = ["평균"];
  monthlypayment.map((item, index) => {
    data.push(item.month_payment);
    labels.push(item.month);
  });
  return <Container></Container>;
}
