const inputPattern = {
  email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
};

export function inputValidate(validations, value, state) {
  if (!validations || !Object.keys(validations).length) {
    return null;
  }

  if (
    (validations.isRequired || validations.isRequired.value) &&
    !value.length
  ) {
    return validations.isRequired.message || 'El campo es requerido';
  }

  if (
    validations.pattern &&
    inputPattern[validations.pattern.value || validations.pattern] &&
    !inputPattern[validations.pattern.value || validations.pattern].test(value)
  ) {
    return validations.pattern.message || 'El campo no tiene un patrón válido';
  }

  if ((validations.minLength || validations.minLength?.value) > value.length) {
    return (
      validations.minLength.message ||
      `El campo debe tener ${validations.minLength} caracteres como mínimo`
    );
  }

  if (
    validations.equalsTo &&
    state[validations.equalsTo.value || validations.equalsTo] !== value
  ) {
    return validations.equalsTo.message || 'El campo no es igual al indicado';
  }

  return null;
}
