/** @jsxRuntime classic */
/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';

import { gray, red } from './colors';

interface InputStyledProps {
  showError: boolean;
}

interface InputProps {
  error: string | null;
  id: string;
  onChange(e: React.FormEvent<HTMLInputElement>): void;
  showError: boolean;
  type?: string;
}

const InputStyled = styled.input<InputStyledProps>`
  border: 1px solid;
  border-color: ${(props) => (props.showError ? red : gray)};
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 15px;
  outline: none;
  padding: 7px 5px;
  width: 100%;
`;

export default function Input({ showError, error, ...props }: InputProps) {
  return (
    <React.Fragment>
      <InputStyled showError={showError && error !== null} {...props} />
      {showError && error ? (
        <span
          css={css`
            color: red;
            display: block;
            font-size: 12px;
            margin-top: 7px;
            text-align: left;
          `}
        >
          {error}
        </span>
      ) : null}
    </React.Fragment>
  );
}
