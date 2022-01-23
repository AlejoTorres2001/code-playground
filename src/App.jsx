import CodeContainer from "./components/CodeContainer";
import Display from "./components/Display";
function App() {
  return (
    <div className="grid grid-cols-2 h-screen w-screen">
        <CodeContainer  title="HTML" language="html"></CodeContainer>
        <CodeContainer title="CSS" language="css"></CodeContainer>
        <CodeContainer title="JS" language="js"></CodeContainer>
        <Display></Display>

    </div>
  );
}

export default App;
