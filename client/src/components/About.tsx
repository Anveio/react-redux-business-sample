import { Button, Card, Layout } from '@shopify/polaris';
import { connect, Dispatch } from 'react-redux';
import * as React from 'react';
import { RootState } from 'types';
import {
  incrementEnthusiasm,
  decrementEnthusiasm,
  EnthusiasmAction
} from 'actions/enthusiasm';

interface Props {
  readonly languageName: string;
  readonly level: number;
  readonly onIncrement: () => void;
  readonly onDecrement: () => void;
}

const About = ({
  languageName,
  level = 1,
  onIncrement,
  onDecrement
}: Props) => {
  return (
    <Layout.AnnotatedSection title="About">
      <Card sectioned>
        <p>
          Language: {languageName} Enthusiasm: {level}
        </p>
        <Button onClick={onDecrement}>-</Button>
        <Button onClick={onIncrement}>+</Button>
        <p>
          We're using React, Redux, Shopify Polaris components and a variety of
          other helpful libraries.
        </p>
        <p>
          It was written in TypeScript using the TypeScript React starter
          template.
        </p>
      </Card>
    </Layout.AnnotatedSection>
  );
};

const mapState = (rootState: RootState) => {
  return {
    level: rootState.enthusiasm.level,
    languageName: rootState.enthusiasm.languageName
  };
};

const mapDispatch = (dispatch: Dispatch<EnthusiasmAction>) => ({
  onIncrement: () => dispatch(incrementEnthusiasm()),
  onDecrement: () => dispatch(decrementEnthusiasm())
});

export default connect(mapState, mapDispatch)(About);
