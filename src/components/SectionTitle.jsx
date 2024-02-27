const SectionTitle = ({ text, redText, triangle, twoPart }) => {
  return (
    <div className="relative">
      <h3 className={`text-2xl`}>
        {text}
        <span className="text-main-r">
          {twoPart && <span>&nbsp;</span>}
          {redText}
        </span>
        {twoPart && ":"}
      </h3>
      <img
        src={triangle}
        className="absolute -top-14 w-16 xl:-left-20 xl:-top-11 xl:w-20"
      />
    </div>
  );
};
export default SectionTitle;
