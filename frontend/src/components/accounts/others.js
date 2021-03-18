export const TransactionAmount = ({ amount }) => (
  <span className="block w-full text-right">{amount}</span>
);
export const Color = ({ color }) => (
  <span
    style={{
      display: "block",
      width: 15,
      height: 15,
      backgroundColor: color,
      borderRadius: "100%",
    }}
  ></span>
);
export const Percentage = ({
  totalValue,
  itemValue,
  toFixed = 2,
  className,
  ...others
}) => {
  const value = ((itemValue / totalValue) * 100).toFixed(toFixed);

  return (
    <span className={`font-bold ${className}`} {...others}>{`${value}%`}</span>
  );
};
