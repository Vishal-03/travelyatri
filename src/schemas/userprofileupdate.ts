import { Input, email, maxLength, minLength, object, string } from "valibot";

const UserProfileUpdateSchema = object({
    email: string([
        minLength(1, 'Please enter your email.'),
        email('Enter a valid Email address formatted.'),
    ]),
    name: string([
        minLength(1, 'Please enter your name.'),
    ]),
    contact: string([
        minLength(1, 'Please enter your contact number.'),
        maxLength(10, "Please enter your valid contact number")
    ]),
    secondcontact: string([
        minLength(1, 'Please enter your secondary contact number.'),
        maxLength(10, "Please enter your secondary valid contact number")
    ]),
    address: string([
        minLength(1, 'Please enter your address.'),
    ]),
});

type UserProfileUpdateForm = Input<typeof UserProfileUpdateSchema>;

export { UserProfileUpdateSchema, type UserProfileUpdateForm, }