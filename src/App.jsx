import './App.css'
import CodeContainer from './components/CodeContainer'
import Display from './components/Display'
function App() {
  return (
    <div className="App">
     <CodeContainer title="HTML"></CodeContainer>
     <CodeContainer title="CSS"></CodeContainer>
     <CodeContainer title="JS"></CodeContainer>
     <Display html=""></Display>
    </div>
  )
}

export default App
