import { Component } from "react";

// If a 3D scene fails (model 404, WebGL unavailable...), hide just that scene
// instead of letting the error unmount the whole page.
class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error("3D scene failed to load:", error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default SceneBoundary;
