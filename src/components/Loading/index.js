import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

export const Section = styled.div`
    padding-left: 42%;
    margin-top: -16px;
    margin-bottom: -10;
`;

const Loading = ({
  // eslint-disable-next-line react/prop-types
  type, color, width, height,
}) => (
  <Section>
    <ReactLoading
      type={type}
      color={color}
      width={width}
      height={height}
    />
  </Section>
);

export default Loading;
