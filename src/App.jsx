import './App.css'
import CodeContainer from './components/CodeContainer'
import Display from './components/Display'
function App() {
  return (
    <div className="App">
     <CodeContainer title="HTML" language="html"></CodeContainer>
     <CodeContainer title="CSS" language="css"></CodeContainer>
     <CodeContainer title="JS" language="js"></CodeContainer>
     <Display html=""></Display>
    </div>
  )
}

export default App
