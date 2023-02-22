import React from 'react';
import { TinyLine } from '@ant-design/plots';

export const TinyLineChart = () => {
  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
  ];
  const config = {
    autoFit: true,
    color: "#00D8FF",
    data,
    smooth: true,
  };
  return <TinyLine {...config} />;
};

