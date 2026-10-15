import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const AdminApp = lazy(() => import("./admin/AdminApp"));

function LegacyProjectRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/work/${slug}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div className="min-h-dvh bg-ink" />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
