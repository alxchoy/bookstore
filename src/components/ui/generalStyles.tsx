import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { blue, white } from './colors';

const spinner = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const Loading = styled.div`
  border: 3px solid ${blue};
  border-top: 3px solid ${white};
  border-right: 3px solid ${white};
  border-bottom: 3px solid ${white};
  border-radius: 50%;
  height: 12px;
  width: 12px;
  animation: ${spinner} 1s linear infinite;
  margin: 0 auto;
`;
