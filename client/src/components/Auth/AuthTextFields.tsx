import * as React from 'react';
import { TextField } from '@shopify/polaris';
import { AuthTextField } from 'types';

interface Props {
  readonly field: AuthTextField;
  readonly onChange: (value: string) => void;
}

const PasswordField = ({ field, onChange }: Props) => {
  return (
    <TextField
      label="Password"
      name="password"
      type="password"
      placeholder="At least 6 characters."
      value={field.text}
      onChange={onChange}
      error={field.error || undefined}
      min={6}
    />
  );
};

const PasswordConfField = ({ field, onChange }: Props) => {
  return (
    <TextField
      label="Confirm Password"
      name="passwordConf"
      type="password"
      value={field.text}
      placeholder="Same as your password."
      min={6}
      onChange={onChange}
      error={field.error || undefined}
    />
  );
};

const EmailField = ({ field, onChange }: Props) => {
  return (
    <TextField
      label="Email address"
      name="email"
      id="email"
      type="email"
      value={field.text}
      placeholder="e.g. name@business.com"
      onChange={onChange}
      error={field.error || undefined}
      spellCheck={false}
      autoFocus
    />
  );
};
const UsernameField = ({ field, onChange }: Props) => {
  return (
    <TextField
      label="Username"
      name="username"
      id="username"
      type="text"
      value={field.text}
      placeholder="No spaces or numbers."
      onChange={onChange}
      error={field.error || undefined}
      spellCheck={false}
    />
  );
};

export { PasswordField, PasswordConfField, EmailField, UsernameField };
