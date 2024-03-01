"use client";
import { updateUser, uploaduserAvatar } from "@/actions/user/updateuser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApiResponseType } from "@/models/responnse";
import { UserProfileUpdateSchema } from "@/schemas/userprofileupdate";
import { handleNumberChange } from "@/utils/methods";
import { Image } from "@nextui-org/react";
import { user } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { safeParse } from "valibot";

interface EditProfile {
  userdata: user;
}

const EditProfile = (props: EditProfile) => {
  const router = useRouter();

  const [logo, setLogo] = useState<File | null>(null);
  const cLogo = useRef<HTMLInputElement>(null);

  const name = useRef<HTMLInputElement>(null);
  const contact = useRef<HTMLInputElement>(null);
  const secondcontact = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLTextAreaElement>(null);

  const handleLogoChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    let file_size = parseInt(
      (value!.target.files![0].size / 1024 / 1024).toString()
    );
    if (file_size < 1) {
      if (value!.target.files![0].type.startsWith("image/")) {
        setLogo((val) => value!.target.files![0]);
      } else {
        toast.error("Please select an image file.", { theme: "light" });
      }
    } else {
      toast.error("Image file size must be less then 1 mb", { theme: "light" });
    }
  };

  async function updateprofile() {
    const result = safeParse(UserProfileUpdateSchema, {
      email: props.userdata!.email,
      name: name.current?.value,
      contact: contact.current?.value,
      secondcontact: secondcontact.current?.value,
      address: address.current?.value,
    });

    if (result.success) {
      let logourl: null | string;

      if (
        props.userdata.avatar == null ||
        (props.userdata.avatar != null && logo != null)
      ) {
        if (logo == null) return toast.error("Upload your avatar");
        const imageBuffer = await logo.arrayBuffer();
        const image: string = Buffer.from(imageBuffer).toString("base64");

        const uploadimage: ApiResponseType<string | null> =
          await uploaduserAvatar({
            name: logo.name,
            id: props.userdata.id,
            arrayBuffer: image,
          });

        if (!uploadimage.status || uploadimage.data == null)
          return toast.error(uploadimage.message);
        logourl = uploadimage.data;
      } else if (props.userdata.avatar != null && logo == null) {
        logourl = props.userdata.avatar;
      } else {
        if (logo == null) return toast.error("Upload your avatar");
        const imageBuffer = await logo.arrayBuffer();
        const image: string = Buffer.from(imageBuffer).toString("base64");
        const uploadimage: ApiResponseType<string | null> =
          await uploaduserAvatar({
            name: logo.name,
            id: props.userdata.id,
            arrayBuffer: image,
          });

        if (!uploadimage.status || uploadimage.data == null)
          return toast.error(uploadimage.message);
        logourl = uploadimage.data;
      }

      const updateprofile = await updateUser({
        id: props.userdata.id,
        name: result.output.name,
        contact: result.output.contact,
        secondcontact: result.output.secondcontact,
        address: result.output.address,
        avatar: logourl,
      });

      if (!updateprofile.status) return toast.error(updateprofile.message);
      router.back();
      return toast.success(updateprofile.message);
    } else {
      let errorMessage = "";
      if (result.issues[0].input) {
        errorMessage = result.issues[0].message;
      } else {
        errorMessage = result.issues[0].path![0].key + " is required";
      }
      toast.error(errorMessage);
    }
  }

  useEffect(() => {
    name!.current!.value = props.userdata.name as string;
    contact!.current!.value = props.userdata.contact as string;
    secondcontact!.current!.value = props.userdata.secondcontact as string;
    address!.current!.value = props.userdata.address as string;
  }, []);

  return (
    <>
      <div className="p-6">
        <div className="bg-white  shadow-xl  rounded-xl py-6">
          <div className="p-4 font-serif text-2xl font-semibold text-center">
            Edit Profile
          </div>
          <div className="mx-4">
            {logo == null && props.userdata.avatar != null ? (
              <>
                <Image
                  src={props.userdata.avatar}
                  alt="logo"
                  className="w-80 h-80 object-cover object-center rounded-md"
                />
              </>
            ) : (
              <></>
            )}

            {logo != null ? (
              <div className="mx-4">
                <Image
                  src={URL.createObjectURL(logo!)}
                  alt="logo"
                  className="w-80 h-80 object-cover object-center rounded-md"
                />
              </div>
            ) : null}
          </div>

          <button
            onClick={() => cLogo.current?.click()}
            className="text-white font-semibold text-md mx-4 py-1 my-2 inline-block px-4 rounded-md bg-green-500 mt-4"
          >
            {props.userdata.avatar == null && logo == null
              ? "Add Avatar"
              : "Change Avatar"}
          </button>
          <div className="hidden">
            <input
              type="file"
              ref={cLogo}
              accept="image/*"
              onChange={handleLogoChange}
            />
          </div>
          <div className="flex flex-col sm:flex-row w-full gap-4 px-4">
            <div className="flex flex-col flex-1">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                className="mt-2"
                ref={name}
              />
            </div>

            <div className="flex flex-col flex-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                disabled
                placeholder="Enter your email"
                className="mt-2"
                value={props.userdata!.email}
              />
            </div>
          </div>
          <div className="flex w-full flex-col sm:flex-row  gap-4 px-4 mt-4">
            <div className="flex flex-col grow">
              <Label htmlFor="contect">Contact</Label>
              <Input
                type="text"
                name="contect"
                id="contect"
                placeholder="Enter your Contact"
                ref={contact}
                className="mt-2"
                onChange={handleNumberChange}
                maxLength={10}
              />
            </div>
            <div className="flex flex-col grow">
              <Label>Secondary Contact</Label>
              <Input
                type="contectsec"
                name="contectsec"
                id="contectsec"
                placeholder="Enter your secondary Contact"
                className="mt-2"
                ref={secondcontact}
                onChange={handleNumberChange}
                maxLength={10}
              />
            </div>
          </div>
          <div className="flex w-full flex-col grow mt-2 px-4">
            <Label>Address</Label>
            <Textarea
              name="address"
              id="address"
              className="mt-2 border-2 rounded-md resize-none h-28"
              placeholder="Enter your Address"
              ref={address}
            ></Textarea>
            <button
              onClick={updateprofile}
              className="mt-4  rounded-md border-2 bg-green-500  p-2 font-bold text-white transition-all duration-300 ease-in-out hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
