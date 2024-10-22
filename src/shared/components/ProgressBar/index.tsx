function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-xl bg-gray-300">
      <div className="h-2 origin-left bg-main-pink transition-transform duration-300" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

export default ProgressBar;
