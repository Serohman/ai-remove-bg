export function ImageProcessing({url}: {url: string}) {
  return (
    <div
      className="relative overflow-hidden w-full h-full flex flex-col justify-center items-center rounded-xl bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,.4), rgba(255,255,255,.4)), url(${url})`,
      }}
    >
      <div className="absolute inset-0 from-10%  via-50% to-90% animate-shimmer-infinite bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </div>
  );
}
