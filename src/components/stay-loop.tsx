import Typewriter from "./fancy/text/typewriter";

export function StayTextLoop() {
  return (
    <div className="block text-xl font-semibold whitespace-pre-wrap">
      <span>{"Stay "}</span>
      <Typewriter
          text={[
            "hungry",
            "foolish",
            "creative",
            "innovative",
            "healthy",
          ]}
          speed={70}
          className="text-accent text-pretty"
          waitTime={1500}
          deleteSpeed={40}
          cursorChar={"_"}
        />
    </div>
  );
}
