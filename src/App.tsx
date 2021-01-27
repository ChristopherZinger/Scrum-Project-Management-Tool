import React from 'react';
import { useHelloQuery } from "./types.d";


function App() {
  return (
    <div className="App">
      <Test />
    </div>
  );
}

const Test = () => {
  const { data, loading, error } = useHelloQuery();
  return (
    <>
      {data && (data.hello)}
      {error && (error.message)}
      {loading && ("loading")}
    </>
  )
}

export default App;
