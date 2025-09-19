import Typewriter from "./fancy/text/typewriter";

export function StayTextLoop() {
  return (
    <div className="mt-8 block text-base font-medium whitespace-pre-wrap">
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
