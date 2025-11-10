import { Todos } from "./components/Todo"

function App() {
  return <>
  <meter value="0.6" min="0" max="1">50%</meter>
  <progress value={0.6} min='0' max='1'>80%</progress>
  <button aria-label="Close modal">✖</button>
  <Todos/>
  </>
}

export default App
