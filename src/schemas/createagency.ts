import {
  Input,
  email,
  maxLength,
  minLength,
  minValue,
  number,
  object,
  string,
} from "valibot";

const createAgencySchema = object({
  userId: number([minValue(1, "Please enter the user id.")]),
  name: string([minLength(1, "Please enter your agency name.")]),
  website: string([minLength(1, "Please enter your agency website address.")]),
  contact: string([
    minLength(1, "Please enter your agency contact number."),
    maxLength(10, "Please enter your valid agency contact number"),
  ]),
  email: string([
    minLength(1, "Please enter your agency email."),
    email("Enter a valid Email address formatted."),
  ]),
  address: string([minLength(1, "Please enter your agency address.")]),
  description: string([minLength(1, "Please enter your agency description.")]),
  aadhar: string([minLength(1, "Please enter aadhar card number.")]),
  pan: string([minLength(1, "Please enter pan card number.")]),
});

type CreateAgencyForm = Input<typeof createAgencySchema>;

export { createAgencySchema, type CreateAgencyForm };
