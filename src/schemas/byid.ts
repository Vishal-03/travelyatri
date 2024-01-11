import { Input, maxValue, minValue, number, object } from "valibot";

const ByIdSchema = object({
    id: number([
        minValue(1, 'Please enter the id.'),
    ]),
});

type ByIdForm = Input<typeof ByIdSchema>;

export { ByIdSchema, type ByIdForm, }