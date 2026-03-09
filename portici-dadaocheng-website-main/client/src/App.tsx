import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ChiSiamo from "./pages/ChiSiamo";
import Workshop from "./pages/Workshop";
import Articoli from "./pages/Articoli";
import ArticoloDetail from "./pages/ArticoloDetail";
import Spazio from "./pages/Spazio";
import Contatti from "./pages/Contatti";
import NotFound from "./pages/NotFound";
import CalligraphyWorkshop from "./pages/CalligraphyWorkshop";
import WorkshopsPage from "./pages/Workshops";
import BookingSuccess from "./pages/BookingSuccess";
import AdminPage from "./pages/Admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chi-siamo" component={ChiSiamo} />
      <Route path="/workshop" component={Workshop} />
      <Route path="/articoli" component={Articoli} />
      <Route path="/articoli/:id" component={ArticoloDetail} />
      <Route path="/spazio" component={Spazio} />
      <Route path="/contatti" component={Contatti} />
      <Route path="/workshop/calligraphy" component={CalligraphyWorkshop} />
      <Route path="/workshops" component={WorkshopsPage} />
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
          <Router />
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
