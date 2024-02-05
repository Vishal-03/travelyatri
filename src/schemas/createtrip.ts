import { Input, custom, forward, minLength, minValue, number, object, string } from "valibot";

const TripSchema = object({
    name: string([
        minLength(1, 'Please enter trip name.'),
    ]),
    description: string([
        minLength(1, 'Please enter trip description.'),
    ]),
    location: string([
        minLength(1, 'Please enter trip location.'),
    ]),
    location_description: string([
        minLength(1, 'Please enter trip description.'),
    ]),
    start_date: string([
        minLength(1, 'Select Trip Category.'),
    ]),
    end_date: string([
        minLength(1, 'Select Trip Category.'),
    ]),
    price: number([
        minValue(1, 'Please enter trip price.'),
    ]),
    number_of_people: number([
        minValue(1, 'Please enter number of people.'),
    ]),
    trip_type: string([
        minLength(1, 'Select Trip Type.'),
    ]),
    category: string([
        minLength(1, 'Select Trip Category.'),
    ]),
    createdBy: number([
        minValue(1, 'Provider the id the the trip owner.'),
    ]),
}, [
    forward(
        custom(
            (input) => input.start_date < input.end_date,
            'Start date should be less than end date.'
        ),
        ['end_date']
    ),
    forward(
        custom(
            (input) => input.trip_type != "0",
            'Select Trip type.'
        ),
        ['trip_type']
    ),
    forward(
        custom(
            (input) => input.category != "0",
            'Select Trip Category.'
        ),
        ['category']
    )

]);

type TripForm = Input<typeof TripSchema>;

export { TripSchema, type TripForm, }