import { useState } from "react";
import Portfolio from "./pages/Portfolio";
import DevSetupWindow from "./components/ui/DevSetupWindow";

export default function App() {
  const [ready, setReady] = useState(false);

  return !ready ? (
    <DevSetupWindow onComplete={() => setReady(true)} />
  ) : (
    <Portfolio />
  );
}
