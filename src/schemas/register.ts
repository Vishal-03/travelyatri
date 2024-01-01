import { isContainSpace } from "@/utils/methods";
import { Input, custom, email, maxLength, minLength, object, regex, string } from "valibot";



const RegisterSchema = object({
    username: string([
        minLength(1, 'Please enter your email.'),
        maxLength(20, 'Username must be less than 20 characters.'),
        regex(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric.'),
        custom(isContainSpace, 'Username cannot contain space.'),
    ]),
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
    role: string([
        minLength(1, 'Please elect your role.'),
        custom(isContainSpace, 'Role cannot contain space.'),
    ]),
});

type RegisterForm = Input<typeof RegisterSchema>;

export { RegisterSchema, type RegisterForm, }