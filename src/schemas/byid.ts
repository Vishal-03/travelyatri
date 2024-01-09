import { Input, maxValue, number, object } from "valibot";

const ByIdSchema = object({
    id: number([
        maxValue(1, 'Please enter the id.'),
    ]),
});

type ByIdForm = Input<typeof ByIdSchema>;

export { ByIdSchema, type ByIdForm, }