import { Input, email, maxLength, minLength, object, string } from "valibot";

const ContactSchema = object({
  name: string([minLength(1, "Please enter your name.")]),
  email: string([
    minLength(1, "Please enter your email."),
    email("Enter a valid Email address formatted."),
  ]),
  contact: string([
    minLength(1, "Please enter your contact number."),
    maxLength(10, "Contact number should be 10 digits."),
  ]),
  message: string([minLength(1, "Please enter your message.")]),
});

type ContactForm = Input<typeof ContactSchema>;

export { ContactSchema, type ContactForm };
