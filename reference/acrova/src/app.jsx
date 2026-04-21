// App shell — mounts everything, wires tweaks + edit-mode
function App() {
  const [tweaks, setTweaksState] = useState(window.__TWEAKS || { concept: "commercial", page: "home" });
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // persist page in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("acrova.page");
    if (saved) setTweaksState((t) => ({ ...t, page: saved }));
  }, []);
  useEffect(() => {
    localStorage.setItem("acrova.page", tweaks.page);
  }, [tweaks.page]);

  const setTweaks = (next) => {
    setTweaksState(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { concept: next.concept, page: next.page } }, "*");
  };

  // edit mode listener — register BEFORE announcing availability
  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === "__activate_edit_mode") setEditMode(true);
      if (e.data.type === "__deactivate_edit_mode") setEditMode(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const setPage = (p) => setTweaks({ ...tweaks, page: p });

  // Apply concept attr to document root
  useEffect(() => {
    document.documentElement.setAttribute("data-concept", tweaks.concept);
  }, [tweaks.concept]);

  return (
    <div data-concept={tweaks.concept} data-screen-label={({home:"01 Home", pdp:"02 Product AW-72", catalog:"03 Catalog", projects:"04 Projects", about:"05 About", manufacturing:"06 Manufacturing"})[tweaks.page] || tweaks.page}>
      <Nav page={tweaks.page} setPage={setPage} onQuote={() => setQuoteOpen(true)} />
      {tweaks.page === "home" && <Home setPage={setPage} onQuote={() => setQuoteOpen(true)} />}
      {tweaks.page === "pdp" && <PDP setPage={setPage} onQuote={() => setQuoteOpen(true)} />}
      {tweaks.page === "catalog" && <Catalog setPage={setPage} onQuote={() => setQuoteOpen(true)} />}
      {tweaks.page === "projects" && <Projects setPage={setPage} onQuote={() => setQuoteOpen(true)} />}
      {tweaks.page === "about" && <About setPage={setPage} onQuote={() => setQuoteOpen(true)} />}
      {tweaks.page === "manufacturing" && <ManufacturingPage setPage={setPage} onQuote={() => setQuoteOpen(true)} />}
      <Footer onQuote={() => setQuoteOpen(true)} />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} active={editMode} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
