export function Visible({ children, when = false }) {
  return when ? children : null;
}
