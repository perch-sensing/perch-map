import "./App.css";
import FireMap from "./components/FireMap";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <FireMap />
    </ThemeProvider>
  );
}

export default App;
