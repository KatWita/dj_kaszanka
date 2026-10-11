// Month tabs, built from the months that actually have upcoming events.
const ToursFilterBtns = ({ months, selectedKey, onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center border-y-2 border-main-b px-6 py-1.5">
      <div className="flex gap-6 sm:gap-12 md:gap-16 lg:gap-24">
        {months.map((month) => {
          const isSelected = month.key === selectedKey;
          return (
            <button
              key={month.key}
              type="button"
              aria-pressed={isSelected}
              className={`duration-300 hover:text-main-p ${isSelected ? "text-main-p" : "text-white"}`}
              onClick={() => onSelect(month.key)}
            >
              {/* short names on phones so 4 months always fit */}
              <span className="sm:hidden" aria-hidden="true">
                {month.short}
              </span>
              <span className="max-sm:sr-only">{month.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default ToursFilterBtns;
