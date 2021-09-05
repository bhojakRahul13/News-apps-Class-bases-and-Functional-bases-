import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 20;
  const [progress, setProgress] = useState(0);
  const [country] = useState("in");

  const setProg = (progress) => {
    setProgress(progress);
  };

  // useEffect(() => {
  //   changeCountry();
  // }, [setCountry]);

  //  const changeCountry = (ch) => {
  //     setCountry(ch);
  //     console.log("ch", ch);
  //   };

  return (
    <div>
      <Router>
      {/* <NavBar changeCountry={changeCountry} /> */}
        
        <NavBar />
        <LoadingBar
          color="#f11946"
          progress={progress}
          height={3}
          // onLoaderFinished={() => setProgress(0)}
        />
        <Switch>
          <Route exact path="/">
            <News
              setProgress={setProg}
              key="general"
              pageSize={pageSize}
              country={country}
              category="general"
            />
          </Route>
          <Route exact path="/business">
            <News
              setProgress={setProg}
              key="bussiness"
              pageSize={pageSize}
              country={country}
              category="business"
            />
          </Route>
          <Route exact path="/entertainment">
            <News
              setProgress={setProg}
              key="entertainment"
              pageSize={pageSize}
              country={country}
              category="entertainment"
            />
          </Route>
          <Route exact path="/health">
            <News
              setProgress={setProg}
              key="health"
              pageSize={pageSize}
              country={country}
              category="health"
            />
          </Route>
          <Route exact path="/science">
            <News
              setProgress={setProg}
              key="science"
              pageSize={pageSize}
              country={country}
              category="science"
            />
          </Route>
          <Route exact path="/sports">
            <News
              setProgress={setProg}
              key="sports"
              pageSize={pageSize}
              country={country}
              category="sports"
            />
          </Route>
          <Route exact path="/technology">
            <News
              setProgress={setProg}
              key="technology"
              pageSize={5}
              country={country}
              category="technology"
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
