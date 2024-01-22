import { isContainSpace } from "@/utils/methods";
import { Input, custom, email, forward, minLength, object, regex, string } from "valibot";

const ChangePassowrdSchema = object({
    email: string([
        minLength(1, 'Please enter your email.'),
        email('Enter a valid Email address formatted.'),
    ]),
    currentpassword: string([
        minLength(1, 'Please enter your current password.'),
    ]),
    newpassword: string([
        minLength(1, 'Please enter your new password.'),
        minLength(8, 'Your new password must have 8 characters or more.'),
        regex(/^(?=.*[0-9]).*$/, 'Your new password must have at least one number.'),
        regex(/^(?=.*[!@#$%^&*]).*$/, 'Your new password must have at least one special character.'),
        regex(/^(?=.*[A-Z]).*$/, 'Your new password must have at least one uppercase.'),
        regex(/^(?=.*[a-z]).*$/, 'Your new password must have at least one lowercase.'),
        custom(isContainSpace, 'New password cannot contain space.'),
    ]),
    confirmpassword: string([
        minLength(1, 'Please enter your confirm password.'),
        minLength(8, 'Your confirm password must have 8 characters or more.'),
        regex(/^(?=.*[0-9]).*$/, 'Your confirm password must have at least one number.'),
        regex(/^(?=.*[!@#$%^&*]).*$/, 'Your confirm password must have at least one special character.'),
        regex(/^(?=.*[A-Z]).*$/, 'Your confirm password must have at least one uppercase.'),
        regex(/^(?=.*[a-z]).*$/, 'Your confirm password must have at least one lowercase.'),
        custom(isContainSpace, 'Confirm password cannot contain space.'),
    ]),
}, [
    forward(
        custom(
            (input) => input.newpassword === input.confirmpassword,
            'New Password and Confirm Password should be same.'
        ),
        ['confirmpassword']
    ),
]);

type ChangePassowrdForm = Input<typeof ChangePassowrdSchema>;

export { ChangePassowrdSchema, type ChangePassowrdForm }