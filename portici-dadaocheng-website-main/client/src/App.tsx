import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Fondatrici from "./pages/Fondatrici";
import ChiSiamoRedirect from "./pages/ChiSiamoRedirect";
// import Workshop from "./pages/Workshop";
import Eventi from "./pages/Eventi";
import Magazine from "./pages/Magazine";
import ArticoliPage from "./pages/ArticoliListRedirect";
import ArticoloDetail from "./pages/ArticoloDetail";
// import Spazio from "./pages/Spazio";
import Contatti from "./pages/Contatti";
import Newsletter from "./pages/Newsletter";
import NotFound from "./pages/NotFound";
// import CalligraphyWorkshop from "./pages/CalligraphyWorkshop";
// import WorkshopsPage from "./pages/Workshops";
import BookingSuccess from "./pages/BookingSuccess";
import AdminPage from "./pages/Admin";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/fondatrici" component={Fondatrici} />
      <Route path="/chi-siamo" component={ChiSiamoRedirect} />
      <Route path="/eventi" component={Eventi} />
      {/* <Route path="/workshop" component={Workshop} /> */}
      <Route path="/magazine" component={Magazine} />
      <Route path="/newsletter" component={Newsletter} />
      <Route path="/articoli/:id" component={ArticoloDetail} />
      <Route path="/articoli" component={ArticoliPage} />
      {/* <Route path="/spazio" component={Spazio} /> */}
      <Route path="/contatti" component={Contatti} />
      {/* <Route path="/workshop/calligraphy" component={CalligraphyWorkshop} /> */}
      {/* <Route path="/workshops" component={WorkshopsPage} /> */}
      <Route path="/booking/success" component={BookingSuccess} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Navigation />
          <ScrollToTopOnRouteChange />
          <Router />
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
