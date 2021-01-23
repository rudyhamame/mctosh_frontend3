import "./home/app-engine/css/app.css";
import Footer from "./home/app-engine/Footer";
import Header from "./home/app-engine/Header";
import Main from "./home/app-engine/Main";
import App from "./App";

function Home() {
  return (
    <div id="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Home;
