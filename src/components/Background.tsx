/**
 * Background — soft radial gradients, blurred shapes and fine noise.
 * Purely decorative, fixed behind all content.
 */
export function Background() {
  return (
    <div
      aria-hidden="true"
      className="noise pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 78% 8%, rgba(37,99,235,0.10), rgba(0,0,0,0) 70%), radial-gradient(50% 40% at 8% 20%, rgba(99,102,241,0.08), rgba(0,0,0,0) 70%), radial-gradient(70% 50% at 50% 110%, rgba(37,99,235,0.07), rgba(0,0,0,0) 70%)",
        }}
      />
      <div
        className="absolute -left-32 top-24 h-[26rem] w-[26rem] rounded-full opacity-50"
        style={{ background: "rgba(37,99,235,0.12)", filter: "blur(120px)" }}
      />
      <div
        className="absolute right-[-8rem] top-[38rem] h-[30rem] w-[30rem] rounded-full opacity-40"
        style={{ background: "rgba(14,165,233,0.12)", filter: "blur(140px)" }}
      />
    </div>
  );
}
