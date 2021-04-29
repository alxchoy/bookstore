import React from 'react';

import { inputValidate } from '../utils/formValidation';

type InputValidation = {
  name: string;
  validations: any;
};

type Input = {
  name: string;
  value: string;
};

type InputError = {
  name: string;
  error: string;
};

type ActionType =
  | { type: 'REGISTER_INPUTS'; payload: IFormState }
  | { type: 'ADD_INPUT_VALUE'; payload: Input }
  | { type: 'ADD_INPUT_ERROR'; payload: InputError };

interface IFormInputState {
  [inputName: string]: string | null;
}

interface IFormState {
  [inputName: string]: string | IFormInputState;
  errors: IFormInputState;
}

function formReducer(state: IFormState, action: ActionType) {
  switch (action.type) {
    case 'REGISTER_INPUTS':
      return { ...state, ...action.payload };
    case 'ADD_INPUT_VALUE':
      return { ...state, [action.payload.name]: action.payload.value };
    case 'ADD_INPUT_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.name]: action.payload.error,
        },
      };
    default:
      return state;
  }
}

let fieldsList: InputValidation[] = [];

export default function useForm() {
  const [formState, formDispatch] = React.useReducer(
    formReducer,
    {} as IFormState
  );
  const [showErrors, setShowErrors] = React.useState(false);

  const mapFormState = (fieldsList: InputValidation[]): IFormState => {
    const state: IFormInputState = {};
    const stateErrors: IFormInputState = {};

    fieldsList.forEach(({ name, validations }) => {
      state[name] = '';
      stateErrors[name] = inputValidate(validations, state[name]);
    });

    return { ...state, errors: { ...stateErrors } };
  };

  const handleSubmit = (cb: (data: any) => void) => (
    event: React.SyntheticEvent
  ) => {
    event.preventDefault();
    setShowErrors(true);
    const isValidForm = !Object.keys(formState.errors).find(
      (error) => formState.errors[error]
    );
    isValidForm && cb(formState);
  };

  const handleInput = (name: string, value: string, validations: any) => {
    formDispatch({
      type: 'ADD_INPUT_VALUE',
      payload: { name, value },
    });
    formDispatch({
      type: 'ADD_INPUT_ERROR',
      payload: { name, error: inputValidate(validations, value, formState) },
    });
  };

  const registerInput = ({ name, validations }: InputValidation) => {
    fieldsList = fieldsList.concat([{ name, validations }]);

    return {
      error: formState.errors?.[name],
      name,
      onChange: (event: React.FormEvent<HTMLInputElement>) =>
        handleInput(name, event.currentTarget.value, validations),
      value: formState[name] || '',
    };
  };

  React.useEffect(() => {
    formDispatch({
      type: 'REGISTER_INPUTS',
      payload: mapFormState(fieldsList),
    });
  }, []);

  return { registerInput, handleSubmit, showErrors };
}
