import React, { Component, ErrorInfo, ReactNode } from 'react';

import { HR, MainContainer } from './theme/layout';
import { PrimaryButton } from './theme';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // todo, send the error to a log service
  }

  public render() {
    if (this.state.hasError) {
      return (
        <MainContainer>
          <div className="pt-52 m-auto flex flex-col gap-3 text-center">
            <p className="text-xl">Sorry, there's been an error. Please try again later!</p>
            <p className="text-base p-4">If the error persists you may try clearing your cache.</p>
            <HR />
            <span className="w-fit mx-auto">
              <PrimaryButton
                size="large"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Clear Cache
              </PrimaryButton>
            </span>
          </div>
        </MainContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
