import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

export const Section = styled.div`
    //margin: auto;
    padding-left: 120px;
`;

const Loading = ({
  // eslint-disable-next-line react/prop-types
  type, color, ...props
}) => (
  <Section>

    <ReactLoading
      type={type}
      color={color}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />

  </Section>
);

export default Loading;
