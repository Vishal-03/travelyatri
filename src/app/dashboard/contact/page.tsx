"use server";
import { Fa6SolidUser, IcBaselineContactPage } from "@/components/icons";
import prisma from "../../../../prisma/database";
import UserCard from "@/components/user/adminusercard";
const Contact = async () => {
  // remover the id 1 and 2 from the list
  const contact = await prisma.contact.findMany({});

  return (
    <>
      {contact.length === 0 ? (
        <div className="bg-white p-4 rounded-md w-80 border-l-4 border-red-500">
          <h1 className="text-center text-xl font-semibold">
            There is no user Contact from submitted yet
          </h1>
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap justify-between m-5">
          {contact.map((item: any, index: number) => {
            return (
              <ContactFrom
                key={index}
                name={item.name}
                email={item.email}
                contact={item.contact}
                message={item.message}
              ></ContactFrom>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Contact;

interface ContactFromProps {
  name: string;
  email: string;
  contact: string;
  message: string;
}

const ContactFrom = (props: ContactFromProps) => {
  return (
    <div className=" bg-white p-4 min-w-80 rounded-md">
      <div className="flex flex-col">
        <h1 className="text-black text-xl font-medium">{props.name}</h1>
        <h1 className="text-black text-sm font-medium">Email: {props.email}</h1>
        <h1 className="text-black text-sm font-medium">
          Contact: {props.contact}
        </h1>
        <h1 className="text-black text-sm bg-gray-100 rounded-md p-2 mt-2 font-medium">
          {props.message}
        </h1>
      </div>
    </div>
  );
};
