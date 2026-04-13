import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LangProviderFromLocation } from "./contexts/LangContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LangRouteWrapper from "./components/LangRouteWrapper";
import Home from "./pages/Home";
import Fondatrici from "./pages/Fondatrici";
import ChiSiamoRedirect from "./pages/ChiSiamoRedirect";
import Workshop from "./pages/Workshop";
import Eventi from "./pages/Eventi";
import Magazine from "./pages/Magazine";
import ArticoliPage from "./pages/ArticoliListRedirect";
import ArticoloDetail from "./pages/ArticoloDetail";
import Spazio from "./pages/Spazio";
import Contatti from "./pages/Contatti";
import Servizi from "./pages/Servizi";
import CasiStudio from "./pages/CasiStudio";
import Newsletter from "./pages/Newsletter";
import NotFound from "./pages/NotFound";
import CalligraphyWorkshop from "./pages/CalligraphyWorkshop";
import WorkshopsPage from "./pages/Workshops";
import BookingSuccess from "./pages/BookingSuccess";
import AdminPage from "./pages/Admin";
import CulturaTaiwanese from "./pages/CulturaTaiwanese";
import AntropologiaDelCibo from "./pages/AntropologiaDelCibo";
import TaiwanItalia from "./pages/TaiwanItalia";
import Dadaocheng from "./pages/Dadaocheng";
import Glossario from "./pages/Glossario";
import GlossarioTerm from "./pages/GlossarioTerm";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";

function LocalizedRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/fondatrici" component={Fondatrici} />
      <Route path="/chi-siamo" component={ChiSiamoRedirect} />
      <Route path="/eventi" component={Eventi} />
      <Route path="/workshop/calligraphy" component={CalligraphyWorkshop} />
      <Route path="/workshop" component={Workshop} />
      {/* `:slug` is captured case-sensitively (e.g. Perché-Dadaocheng); GROQ matches with lower($slug). */}
      <Route path="/magazine/:slug" component={ArticoloDetail} />
      <Route path="/magazine" component={Magazine} />
      <Route path="/newsletter" component={Newsletter} />
      <Route path="/articoli/:slug" component={ArticoloDetail} />
      <Route path="/articoli" component={ArticoliPage} />
      <Route path="/spazio" component={Spazio} />
      <Route path="/contatti" component={Contatti} />
      <Route path="/servizi" component={Servizi} />
      <Route path="/casi-studio" component={CasiStudio} />
      <Route path="/workshops" component={WorkshopsPage} />
      <Route path="/cultura-taiwanese" component={CulturaTaiwanese} />
      <Route path="/antropologia-del-cibo" component={AntropologiaDelCibo} />
      <Route path="/taiwan-italia" component={TaiwanItalia} />
      <Route path="/dadaocheng" component={Dadaocheng} />
      <Route path="/glossario/:term" component={GlossarioTerm} />
      <Route path="/glossario" component={Glossario} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/it" />
      </Route>
      <Route path="/booking/success" component={BookingSuccess} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/:lang" nest>
        <LangRouteWrapper>
          <LocalizedRoutes />
        </LangRouteWrapper>
      </Route>
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
          <LangProviderFromLocation>
            <Navigation />
            <ScrollToTopOnRouteChange />
            <Router />
            <Footer />
          </LangProviderFromLocation>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
