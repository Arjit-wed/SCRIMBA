import Entry from "./components/Entry"
import Header from "./components/Header"
import data from "./data"

const dataElement=data.map((x)=>{
  return <Entry 
  key={x.id}
   entry={x} />
  })
const App = () => {
  return (
    <div className="App">
      < Header />
       {dataElement}
    </div>
  )
}

export default App