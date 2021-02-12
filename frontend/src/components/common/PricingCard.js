import Button from "./Button";

const PricingCard = ({
  planName,
  planDescription,
  price,
  paymentFrequency,
  planOptions = [],
  onClick,
  className = "",
  ...restOfProps
}) => {
  return (
    <div
      className={`pricing-plan-wrap w-full md:w-3/4 mx-auto lg:w-1/3 my-4 md:my-6 lg:mr-10 ${className} shadow-xl`}
      {...restOfProps}
    >
      <div className="pricing-plan  border-t-4 border-solid border-white bg-white text-center max-w-sm mx-auto hover:border-green-600 transition-colors duration-300">
        <div class="p-6 md:py-8">
          <h4 class="font-medium leading-tight text-2xl mb-2">{planName}</h4>
          <p class="text-gray-600">{planDescription}</p>
        </div>

        <div class="pricing-amount bg-indigo-100 p-6 transition-colors duration-300">
          <div class="text-center">
            <span class="text-4xl font-semibold">{price}</span> /
            {paymentFrequency}
          </div>
        </div>
        <div className="p-6 text-center">
          <ul className="leading-loose">
            {planOptions.map((option) => (
              <li>{option}</li>
            ))}
          </ul>
          <div className="mt-6 py-4">
            <Button onClick={onClick}>Get Started</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
