import * as React from 'react';
import { Layout, Card, FormLayout, Button, DisplayText } from '@shopify/polaris';

import { PasswordField, EmailField } from './AuthTextFields';

export interface Props {
  readonly email: AuthTextField;
  readonly password: AuthTextField;
  readonly loading: boolean;
  readonly currentUser: UserState;
}

export interface Handlers {
  readonly onChange: (key: keyof LoginPayload, value: string) => void;
  readonly onSubmit: (payload: LoginPayload) => void;
}

const LoginForm = (props: Props & Handlers) => {
  const { email, password, onChange, onSubmit, currentUser } = props;

  const handleLogIn = (): void => {
    onSubmit({
      email: email.text,
      password: password.text
    });
  };

  const updateField = (key: keyof LoginPayload) => (value: string) => {
    onChange(key, value);
  };

  const validForm = (): boolean => {
    return !email.text && !password.text;
  };

  const watchForEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.charCode === 13) {
      event.preventDefault();
      handleLogIn();
    }
  };

  const loggedOutMarkup = () => {
    return (
      <Layout sectioned>
        <Card sectioned>
          <FormLayout>
            <DisplayText size="medium">Log in.</DisplayText>
            <div onKeyPress={watchForEnter}>
              <EmailField field={email} onChange={updateField('email')} />
              <PasswordField field={password} onChange={updateField('password')} />
            </div>
            <Button
              primary
              icon="circleChevronRight"
              onClick={handleLogIn}
              disabled={validForm()}
            >
              Log in.
            </Button>
          </FormLayout>
        </Card>
      </Layout>
    );
  };

  const loggedInMarkup = (user: UserState) => {
    return (
      <Layout.Section>
        <Card sectioned>
          <DisplayText size="medium">
            You're logged in with the email '{user.email}'.
          </DisplayText>
        </Card>
      </Layout.Section>
    );
  };

  return currentUser.email ? loggedInMarkup(currentUser) : loggedOutMarkup();
};

export default LoginForm;
