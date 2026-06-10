import {Component, Fragment, type ReactNode} from "react";

interface ErrorBoundaryProps {
  fallback: (reset: () => void) => ReactNode;
  resetKeys?: readonly unknown[];
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  resetCount: number;
}

const resetKeysChanged = (
  prev: readonly unknown[] | undefined,
  next: readonly unknown[] | undefined,
): boolean => {
  if (!prev || !next) return false;
  if (prev.length !== next.length) return true;
  return next.some((key, index) => !Object.is(key, prev[index]));
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {error: null, resetCount: 0};

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {error};
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (
      this.state.error &&
      resetKeysChanged(prevProps.resetKeys, this.props.resetKeys)
    ) {
      this.reset();
    }
  }

  private reset = (): void => {
    this.setState((prev) => ({error: null, resetCount: prev.resetCount + 1}));
  };

  render(): ReactNode {
    const {error, resetCount} = this.state;
    if (error) return this.props.fallback(this.reset);
    // Remount the subtree after a reset so suspense data hooks refetch.
    return <Fragment key={resetCount}>{this.props.children}</Fragment>;
  }
}
