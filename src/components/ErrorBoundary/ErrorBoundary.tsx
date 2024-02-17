import React from 'react';
import { handleLogError } from './utils/handleLogError';
import { ChildrenProps, StateProps } from './ErrorBoundary.types';

/**
 * React Error Boundary: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 * Logs errors to backend and displays fallback UI when there's an applciaton error
 */
export default class ErrorBoundary extends React.Component<ChildrenProps, StateProps> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  readonly state = {} as StateProps;

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // log the error and store error reference key
  // TBD - temporary <any>
  async componentDidCatch(error: any, info: any) {
    await handleLogError(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
