import {
  Input,
  custom,
  date,
  forward,
  maxSize,
  maxValue,
  minLength,
  minValue,
  number,
  object,
  string,
} from "valibot";

const TripSchema = object(
  {
    name: string([minLength(1, "Please enter trip name.")]),
    description: string([minLength(1, "Please enter trip description.")]),
    start_date: date("Please enter trip start date."),
    end_date: date("Please enter trip end date."),
    price: number([minValue(1, "Please enter trip price.")]),
    number_of_people: number([
      minValue(1, "Please enter number of people."),
      maxValue(30, "Number of people can only be 30 or less then 30"),
    ]),
    trip_type: string([minLength(1, "Select Trip Type.")]),
    category: string([minLength(1, "Select Trip Category.")]),
    createdBy: number([minValue(1, "Provider the id the the trip owner.")]),
  },
  [
    forward(
      custom(
        (input) => input.start_date < input.end_date,
        "Start date should be less than end date."
      ),
      ["end_date"]
    ),
    forward(
      custom((input) => input.trip_type != "0", "Select Trip type."),
      ["trip_type"]
    ),
    forward(
      custom((input) => input.category != "0", "Select Trip Category."),
      ["category"]
    ),
  ]
);

type TripForm = Input<typeof TripSchema>;

export { TripSchema, type TripForm };
