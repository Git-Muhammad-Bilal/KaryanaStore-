import '../karyanaStoreStyless/fallBackReader.css'

const FallbackRender = (props) => {
  const { message, resetErrorBoundary } = props
  return (
    <div className="alert">
      <p>Something went wrong</p>
      <pre >{message}</pre>
      <button onClick={resetErrorBoundary}>Reload the page</button>
    </div>
  );


}
export default FallbackRender
