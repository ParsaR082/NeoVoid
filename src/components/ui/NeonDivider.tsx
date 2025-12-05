export function NeonDivider({ width = "w-32" }: { width?: string }) {
  return (
    <div
      className={`h-px ${width} bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 blur-[0.3px] shadow-[0_0_30px_-10px_#22d3ee]`}
    />
  );
}
