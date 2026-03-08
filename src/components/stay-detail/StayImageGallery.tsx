interface StayImageGalleryProps {
  mainImage: string;
  title: string;
}

const StayImageGallery = ({ mainImage, title }: StayImageGalleryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10 rounded-2xl overflow-hidden">
      {/* Large main image */}
      <div className="md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto md:h-[480px]">
        <img
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
        />
      </div>
      {/* Two stacked smaller images */}
      <div className="hidden md:flex flex-col gap-3 h-[480px]">
        <div className="flex-1 overflow-hidden">
          <img
            src={mainImage}
            alt="View 2"
            className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <img
            src={mainImage}
            alt="View 3"
            className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default StayImageGallery;
