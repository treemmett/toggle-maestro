import { useMaestro } from 'toggle-maestro';

const App = () => {
  const newFeature = useMaestro('foobar');

  return <div>Foobar is {newFeature ? 'enabled' : 'disabled'}</div>;
};

export default App;
