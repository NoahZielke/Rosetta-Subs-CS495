import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext, UserInterface } from "./context/UserContext";
import AppHome from "./pages/AppHome";
import LandingPage from "./pages/LandingPage";
import TeamBios from "./pages/TeamBios";
import AppTranscribe from "./pages/AppTranscribe"
import AppTranslate from "./pages/AppTranslate"
import AppDubAudio from "./pages/AppDubAudio"
import AppBurnSubtitles from "./pages/AppBurnSubtitles"

function App() {
  const [user, setUser] = useState<UserInterface | undefined>(undefined);

  return (
    <div className='App' style={{ margin: 0, padding: 0 }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Switch>
            <Route path='/' exact component={LandingPage} />
            <Route path='/home' exact component={LandingPage} />
            <Route path='/team-bios' exact component={TeamBios} />
            <Route path='/app-home' exact component={AppHome} />
            <Route path='/app-transcribe' exact component={AppTranscribe} />
            <Route path='/app-translate' exact component={AppTranslate} />
            <Route path='/app-dub-audio' exact component={AppDubAudio} />
            <Route path='/app-burn-subtitles' exact component={AppBurnSubtitles} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
