import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { blue, darkBlue, lightBlue, white } from './colors';

interface ButtonStyledProps {
  outline?: boolean | string;
}

interface ButtonProps {
  children: any;
  outline?: boolean | string;
  type: 'button' | 'submit' | 'reset';
}

interface ButtonLinkProps {
  children: any;
  outline?: boolean | string;
  to: string;
}

const ButtonStyled = styled.button<ButtonStyledProps>`
  background: ${(props) => (props.outline ? white : blue)};
  border: 1px solid ${blue};
  border-radius: 5px;
  color: ${(props) => (props.outline ? blue : white)};
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  &:hover {
    background: ${(props) => (props.outline ? lightBlue : darkBlue)};
  }
`;

const ButtonLinkStyled = ButtonStyled.withComponent(Link);

export const Button = ({ type = 'button', ...props }: ButtonProps) => (
  <ButtonStyled type={type} {...props} />
);

export const ButtonLink = ({ ...props }: ButtonLinkProps) => (
  <ButtonLinkStyled {...props} />
);
