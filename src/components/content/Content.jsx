export const Content = ({ children, error }) =>
  error ? (
    <div>
      <h2>Error</h2>
      <div>{error}</div>
    </div>
  ) : (
    children
  )
