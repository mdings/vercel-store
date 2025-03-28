export function TickerRibbon() {
  const message = "Jack salutes you my friend ✌🏽 Stay healthy, clean & fresh!";

  return (
    <div className="w-full bg-[#c9d9db] overflow-hidden whitespace-nowrap mt-12 py-3">
      <div className="flex animate-marquee">
        {[...Array(10)].map((_, index) => (
          <span key={index} className="mx-8 text-black text-sm py-2">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
