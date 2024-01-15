import { isContainSpace } from "@/utils/methods";
import { Input, custom, email, minLength, object, regex, string } from "valibot";

const LoginSchema = object({
    email: string([
        minLength(1, 'Please enter your email.'),
        email('Enter a valid Email address formatted.'),
    ]),
    password: string([
        minLength(1, 'Please enter your password.'),
        custom(isContainSpace, 'Password cannot contain space.'),
    ]),
});

type LoginForm = Input<typeof LoginSchema>;

export { LoginSchema, type LoginForm, }