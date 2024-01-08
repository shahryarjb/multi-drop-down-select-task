import MultiSelect from './components/MultiSelect';

function App() {
  // The MultiSelect can accept some callback functions to re-bind a form or make value for local state
  // For example <MultiSelect send={aFunction}/>
  // Usually, I never isolate it to create a select box that has a limited number of elements 
  // and rerendering does not cause performance issues, but I did this for this task.
  return <MultiSelect />;
}

export default App;
