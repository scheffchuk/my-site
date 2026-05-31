const Footer = () => {
  return (
    <footer className="text-accent-chrome-muted py-6 text-sm">
      <div className="">
        <div className="col-start-2 grid grid-cols-[auto_1fr_auto] items-center gap-x-4">
          <span> Scheff © {new Date().getFullYear()}</span>
          <p className="whitespace-nowrap">With curiosity, from Tokyo</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
