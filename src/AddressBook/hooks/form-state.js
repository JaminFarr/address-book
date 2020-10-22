import { useState } from "react";

const getEventValue = targetOrValue =>
  targetOrValue.target && targetOrValue.target.value !== undefined
    ? targetOrValue.target.value
    : targetOrValue;

/**
 * useFormState
 *
 * Normal useState with form helpers
 *
 * setField: Set one field (key) of the state object
 *
 * bindField: provides value and onChange for <input />s
 *
 */
export const useFormState = (initState = {}) => {
  const [formState, setFormState] = useState(initState);

  const setField = (field, value) =>
    setFormState(formState => ({ ...formState, [field]: value }));

  const bindField = field => ({
    value: formState[field],
    onChange: event => setField(field, getEventValue(event))
  });

  return { formState, setFormState, setField, bindField };
};
