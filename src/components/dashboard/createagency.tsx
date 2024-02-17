"use client";
import {
  createAgency,
  uploadagencyBanner,
  uploadagencyLogo,
} from "@/actions/agency/createagency";
import { ApiResponseType } from "@/models/responnse";
import { createAgencySchema } from "@/schemas/createagency";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { SetStateAction, useRef, useState } from "react";
import { toast } from "react-toastify";
import { safeParse } from "valibot";
import { IconamoonSignPlusCircleLight, IconamoonTrashDuotone } from "../icons";

interface CreateAgencyProps {
  user: any;
}

const CreateAgency = (props: CreateAgencyProps) => {
  const router = useRouter();

  const name = useRef<HTMLInputElement>(null);
  const website = useRef<HTMLInputElement>(null);
  const contact = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLTextAreaElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);

  const [logo, setLogo] = useState<File | null>(null);
  const cLogo = useRef<HTMLInputElement>(null);

  const [banner, setBanner] = useState<File | null>(null);
  const cBanner = useRef<HTMLInputElement>(null);

  const handleLogoChange = (
    value: React.ChangeEvent<HTMLInputElement>,
    setFun: (value: SetStateAction<File | null>) => void
  ) => {
    let file_size = parseInt(
      (value!.target.files![0].size / 1024 / 1024).toString()
    );
    if (file_size < 1) {
      if (value!.target.files![0].type.startsWith("image/")) {
        setFun((val) => value!.target.files![0]);
      } else {
        toast.error("Please select an image file.", { theme: "light" });
      }
    } else {
      toast.error("Image file size must be less then 1 mb", { theme: "light" });
    }
  };

  async function createAgencyFuncation() {
    const result = safeParse(createAgencySchema, {
      userId: props.user.id,
      name: name.current?.value,
      website: website.current?.value,
      contact: contact.current?.value,
      email: email.current?.value,
      address: address.current?.value,
      description: description.current?.value,
    });

    if (result.success) {
      if (logo == null) return toast.error("Upload your logo");
      if (banner == null) return toast.error("Upload your banner");

      const imageBuffer = await logo.arrayBuffer();
      const image: string = Buffer.from(imageBuffer).toString("base64");

      const uploadimage: ApiResponseType<string | null> =
        await uploadagencyLogo({
          name: logo.name,
          arrayBuffer: image,
        });

      if (!uploadimage.status || uploadimage.data == null)
        return toast.error(uploadimage.message);

      const imageBufferTwo = await banner.arrayBuffer();
      const imageTwo: string = Buffer.from(imageBufferTwo).toString("base64");

      const uploadimageTwo: ApiResponseType<string | null> =
        await uploadagencyBanner({
          name: banner.name,
          arrayBuffer: imageTwo,
        });

      if (!uploadimageTwo.status || uploadimageTwo.data == null)
        return toast.error(uploadimageTwo.message);

      const createAgencyResponse = await createAgency({
        id: props.user.id,
        name: result.output.name,
        website: result.output.website,
        contact: result.output.contact,
        email: result.output.email,
        address: result.output.address,
        description: result.output.description,
        logo: uploadimage.data,
        banner: uploadimageTwo.data,
      });

      if (createAgencyResponse.status) {
        toast.success(createAgencyResponse.message);
        name.current!.value = "";
        website.current!.value = "";
        contact.current!.value = "";
        email.current!.value = "";
        address.current!.value = "";
        description.current!.value = "";
        return router.push("/dashboard");
      } else {
        toast.error(createAgencyResponse.message);
      }
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

  return (
    <>
      <div className="flex min-h-screen w-full flex-col gap-10 p-10 bg-[#eeeeee]">
        <h1 className="text-4xl ">Agency information</h1>

        <div className="flex flex-col gap-5 rounded-lg shadow-lg p-5 bg-white">
          <h1 className="text-3xl font-semibold">Agency details</h1>

          {/* Logo and banner */}

          <div className="flex gap-4 flex-col sm:flex-row">
            {logo != null ? (
              <div>
                <Image
                  src={URL.createObjectURL(logo!)}
                  alt="logo"
                  className="w-60 h-60 object-cover object-center rounded-md"
                />
              </div>
            ) : null}
            {banner != null ? (
              <div>
                <Image
                  src={URL.createObjectURL(banner!)}
                  alt="logo"
                  className="w-[36rem] h-60 object-cover object-center rounded-md"
                />
              </div>
            ) : null}
          </div>
          <div className="flex gap-6">
            <button
              onClick={() => cLogo.current?.click()}
              className="text-white font-semibold text-md py-1 my-2 inline-block px-4 rounded-md bg-[#1bc48b]"
            >
              {logo == null ? "Add Logo" : "Change Logo"}
            </button>

            <button
              onClick={() => cBanner.current?.click()}
              className="text-white font-semibold text-md py-1 my-2 inline-block px-4 rounded-md bg-[#1bc48b]"
            >
              {banner == null ? "Add Banner" : "Change Banner"}
            </button>
          </div>
          <div className="hidden">
            <input
              type="file"
              ref={cLogo}
              accept="image/*"
              onChange={(val) => handleLogoChange(val, setLogo)}
            />

            <input
              type="file"
              ref={cBanner}
              accept="image/*"
              onChange={(val) => handleLogoChange(val, setBanner)}
            />
          </div>

          <p className="pt-2  text-gray-500 text-lg">Basic Information :</p>

          <div className="flex flex-col gap-4">
            <div className="w-full flex justify-between">
              <span className="flex-1">Name:</span>

              <input
                type="text"
                className="grow rounded-lg border-2  p-4 focus:outline-none"
                ref={name}
              />
            </div>

            <div className="w-full flex justify-between">
              <span className="flex-1">Agency website:</span>

              <input
                type="text"
                className="grow rounded-lg border-2  p-4 focus:outline-none"
                ref={website}
              />
            </div>

            <div className="w-full flex justify-between">
              <span className="flex-1">Agency support contact number:</span>

              <input
                type="text"
                className="grow rounded-lg border-2  p-4 focus:outline-none"
                ref={contact}
              />
            </div>

            <div className="w-full flex justify-between">
              <span className="flex-1">Agency support email address:</span>

              <input
                type="text"
                className="grow rounded-lg border-2  p-4 focus:outline-none"
                ref={email}
              />
            </div>

            <div className="w-full flex justify-between">
              <span className="flex-1">Agency complete address:</span>

              <textarea
                className="grow rounded-lg border-2 h-24 resize-none p-6 focus:outline-none"
                ref={address}
              ></textarea>
            </div>

            <div className="w-full flex justify-between">
              <span className="flex-1">Agency description:</span>

              <textarea
                className="grow rounded-lg border-2 h-24 resize-none p-6 focus:outline-none"
                ref={description}
              ></textarea>
            </div>
          </div>

          <button
            onClick={createAgencyFuncation}
            className="rounded-md border-2 bg-[#1bc48b]  p-2 font-bold text-white transition-all duration-300 ease-in-out hover:opacity-80"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateAgency;
