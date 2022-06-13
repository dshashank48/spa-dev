import React from "react";
import { ErrorElement } from "../App";

// https://reactjs.org/docs/error-boundaries.html
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ERROR CAUGHT", { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorElement />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
