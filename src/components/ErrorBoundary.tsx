import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useAppSelector } from '../store/hooks';
import { themeSelector } from '../features/themes/store/themeSlice';
import { ColorTheme } from '../features/themes/data/ColorTheme';

interface Props {
  children?: ReactNode;
  theme: ColorTheme;
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
        <div
          className={`flex h-screen p-3 ${this.props.theme.bgColors.main} ${this.props.theme.textColors.main}`}
        >
          <div className="m-auto flex flex-col gap-3 text-center">
            <p className="text-xl">Sorry, there's been an error. Please try again later!</p>
            <p className="text-sm p-4">If the error persists clear your cache and try again.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
