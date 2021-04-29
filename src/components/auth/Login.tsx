// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import useForm from '../../hooks/useForm';
import { useAuth } from '../../context/auth-context';
import {} from './authTypes';
import { AuthFormWrapper, AuthInputWrapper, Label } from './styles';
import { Button, ButtonLink, Input } from '../ui';
import { Loading } from '../ui/generalStyles';

export default function Login() {
  const { authLogin, authStatus } = useAuth();
  const { handleSubmit, registerInput, showErrors } = useForm();

  const login = (loginData: any) => authLogin(loginData);

  return (
    <AuthFormWrapper>
      <form onSubmit={handleSubmit(login)}>
        <AuthInputWrapper>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            showError={showErrors}
            {...registerInput({
              name: 'email',
              validations: {
                isRequired: true,
                pattern: 'email',
              },
            })}
          />
        </AuthInputWrapper>
        <AuthInputWrapper>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            showError={showErrors}
            {...registerInput({
              name: 'password',
              validations: {
                isRequired: true,
                minLength: 8,
              },
            })}
          />
        </AuthInputWrapper>

        <div
          css={css`
            display: grid;
            grid-template-rows: 1fr 1fr;
            gap: 10px;
            margin-top: 30px;
          `}
        >
          <Button type="submit">
            {authStatus.isLoading ? <Loading /> : 'Login'}
          </Button>
          <ButtonLink outline={'true'} to="/register">
            Register
          </ButtonLink>
        </div>
      </form>
    </AuthFormWrapper>
  );
}
