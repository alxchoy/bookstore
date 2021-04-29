// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';

import { Container, gray } from '../ui';
import logo from '../../assets/laptop.png';

export const AuthFormWrapper = ({ children }: any) => (
  <Container>
    <div
      css={css`
        border: 1px solid ${gray};
        border-radius: 5px;
        margin: 150px auto 0;
        padding: 50px;
        width: 300px;
      `}
    >
      <div
        css={css`
          margin-bottom: 50px;
          text-align: center;
        `}
      >
        <img src={logo} alt="logo" />
      </div>
      {children}
    </div>
  </Container>
);

export const AuthInputWrapper = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  font-size: 15px;
  margin-bottom: 5px;
`;
