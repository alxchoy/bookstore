/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import useForm from '../../hooks/useForm';
import { useAuth } from '../../context/auth-context';
import { AuthFormWrapper, AuthInputWrapper, Label } from './styles';
import { Button, ButtonLink, Input } from '../ui';
import { Loading } from '../ui/generalStyles';

export default function Register() {
  const { authRegister, authStatus } = useAuth();
  const { handleSubmit, registerInput, showErrors } = useForm();

  const register = (registerData: any) => authRegister(registerData);

  return (
    <AuthFormWrapper>
      <form onSubmit={handleSubmit(register)}>
        <AuthInputWrapper>
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            id="nickname"
            showError={showErrors}
            {...registerInput({
              name: 'nickname',
              validations: {
                isRequired: true,
                pattern: 'nickname',
              },
            })}
          />
        </AuthInputWrapper>
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
        <AuthInputWrapper>
          <Label htmlFor="passwordConfirm">Password confirmation</Label>
          <Input
            id="passwordConfirm"
            type="password"
            showError={showErrors}
            {...registerInput({
              name: 'passwordConfirm',
              validations: {
                isRequired: true,
                equalsTo: {
                  value: 'password',
                  message: 'El password no es igual',
                },
              },
            })}
          />
        </AuthInputWrapper>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            height: 90px;
            justify-content: space-between;
            margin-top: 30px;
          `}
        >
          <Button type="submit">
            {authStatus.isLoading ? <Loading /> : 'Register'}
          </Button>
          <ButtonLink outline={'true'} to="/login">
            Login
          </ButtonLink>
        </div>
      </form>
    </AuthFormWrapper>
  );
}
