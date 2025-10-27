const Marquee = () => {
  return (
    <div className="h-8 bg-primary text-primary-foreground overflow-hidden flex items-center">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="text-xs font-semibold tracking-wider mx-8">
          HASSLE FREE TRAVEL EXPERIENCE LIKE A FREE BIRD
        </span>
        <span className="text-xs font-semibold tracking-wider mx-8">
          HASSLE FREE TRAVEL EXPERIENCE LIKE A FREE BIRD
        </span>
        <span className="text-xs font-semibold tracking-wider mx-8">
          HASSLE FREE TRAVEL EXPERIENCE LIKE A FREE BIRD
        </span>
        <span className="text-xs font-semibold tracking-wider mx-8">
          HASSLE FREE TRAVEL EXPERIENCE LIKE A FREE BIRD
        </span>
      </div>
    </div>
  );
};

export default Marquee;
