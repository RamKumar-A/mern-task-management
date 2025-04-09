function InfoCard({ label, color, value }) {
  return (
    <div className={` p-1`}>
      <div className={`w-2 md:w-2 h-3 md:h-5 ${color} rounded-full`} />
      <p className="text-xs md:text-sm text-gray-500">
        <span className="text-sm md:text-[15px] text-black font-semibold">
          {value}
        </span>{' '}
        {label}
      </p>
    </div>
  );
}

export default InfoCard;
