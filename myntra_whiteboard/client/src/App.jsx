import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import { Toaster } from "react-hot-toast";

function App() {
  const navigateToLink = () => {
    window.location.href = "http://127.0.0.1:5501/index2.html#";
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <main className="app transition-all ease-in">
        <Canvas />
        <Customizer />
        <button
          className="link-button"
          onClick={navigateToLink}
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          HOME BASE
        </button>
      </main>
    </>
  );
}

export default App;
