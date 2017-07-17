import * as React from 'react';
import { EmptyState, Layout, Card } from '@shopify/polaris';
const emptyImage = require('../empty-state.svg');

export interface Props {
  readonly list: Course[];
}

const CourseList = ({ list }: Props) => {
  const emptyCourseListMarkup = () => {
    return (
      <Layout.AnnotatedSection title={'My enrolled courses'}>
        <Card sectioned>
          <EmptyState
            heading="You don't have any courses yet."
            action={{ content: 'Add course' }}
            image={emptyImage}
          >
            <p>Get started by adding a course.</p>
          </EmptyState>
        </Card>
      </Layout.AnnotatedSection>
    );
  };

  const populatedCourseListMarkup = () => {
    return (
      <Layout.AnnotatedSection title={'My enrolled courses'}>
        <Card sectioned>
          {list.map(course => course.name)}
        </Card>
      </Layout.AnnotatedSection>
    );
  };

  return list.length > 0
    ? populatedCourseListMarkup()
    : emptyCourseListMarkup();
};

export default CourseList;
