const NewFooter = () => {
  return (
    <footer className="bg-accent py-24 text-[12px] text-white">
      <div className="grid-cols-[210px_650px_auto] md:grid">
        <div className="col-start-2 grid grid-cols-[auto_1fr_auto] items-center gap-x-4 px-4">
          <span> Scheff © {new Date().getFullYear()}</span>
          <div className="bg-muted/40 h-px" aria-hidden />
          <p className="whitespace-nowrap">With curiosity, from Tokyo</p>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
