const NewFooter = () => {
  return (
    <footer className="py-24 text-[12px] text-accent">
      <div className="">
        <div className="col-start-2 grid grid-cols-[auto_1fr_auto] items-center gap-x-4">
          <span> Scheff © {new Date().getFullYear()}</span>
          <div className="bg-accent/40 h-px" aria-hidden />
          <p className="whitespace-nowrap">With curiosity, from Tokyo</p>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
