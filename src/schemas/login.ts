import { isContainSpace } from "@/utils/methods";
import { Input, custom, email, minLength, object, regex, string } from "valibot";

const LoginSchema = object({
    email: string([
        minLength(1, 'Please enter your email.'),
        email('Enter a valid Email address formatted.'),
    ]),
    password: string([
        minLength(1, 'Please enter your password.'),
        minLength(8, 'Your password must have 8 characters or more.'),
        regex(/^(?=.*[0-9]).*$/, 'Your password must have at least one number.'),
        regex(/^(?=.*[!@#$%^&*]).*$/, 'Your password must have at least one special character.'),
        regex(/^(?=.*[A-Z]).*$/, 'Your password must have at least one uppercase.'),
        regex(/^(?=.*[a-z]).*$/, 'Your password must have at least one lowercase.'),
        custom(isContainSpace, 'Password cannot contain space.'),
    ]),
});

type LoginForm = Input<typeof LoginSchema>;

export { LoginSchema, type LoginForm, }