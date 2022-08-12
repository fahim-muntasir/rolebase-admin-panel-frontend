export default function DashboardCard({
  mainIcon,
  secondaryIcon,
  title,
  amount,
  borderColor,
  iconBgColor,
  secondaryIconColor,
}) {
  return (
    <div
      className={`w-full mb-5 lg:mb-0 lg:w-80 flex justify-between py-6 px-5 shadow-lg border-b-4 rounded-lg ${borderColor}`}
    >
      <div
        className={`text-4xl ${iconBgColor} w-16 h-16 rounded-full flex items-center justify-center text-white`}
      >
        {mainIcon}
      </div>
      <div className="pr-8">
        <span className="font-semibold uppercase text-gray-600">{title}</span>
        <div className="flex items-center gap-1 text-3xl font-semibold">
          <h2>{amount}</h2>
          <span className={secondaryIconColor}>{secondaryIcon}</span>
        </div>
      </div>
    </div>
  );
}
