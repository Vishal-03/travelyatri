"use client";
import {
  createAgency,
  uploadaadhar,
  uploadagencyBanner,
  uploadagencyLogo,
  uploadpan,
} from "@/actions/agency/createagency";
import { ApiResponseType } from "@/models/responnse";
import { createAgencySchema } from "@/schemas/createagency";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { SetStateAction, useRef, useState } from "react";
import { toast } from "react-toastify";
import { safeParse } from "valibot";
import { errorToString, handleNumberChange, longtext } from "@/utils/methods";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

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
  const aadharcard = useRef<HTMLInputElement>(null);
  const pancard = useRef<HTMLInputElement>(null);

  const [logo, setLogo] = useState<File | null>(null);
  const cLogo = useRef<HTMLInputElement>(null);

  const [banner, setBanner] = useState<File | null>(null);
  const cBanner = useRef<HTMLInputElement>(null);

  const [aadharimg, setAadharimg] = useState<File | null>(null);
  const cAadharimg = useRef<HTMLInputElement>(null);
  const [panimg, setPanimg] = useState<File | null>(null);
  const cPanimg = useRef<HTMLInputElement>(null);

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
  const handlepaChange = (
    value: React.ChangeEvent<HTMLInputElement>,
    setFun: (value: SetStateAction<File | null>) => void
  ) => {
    let file_size = parseInt((value!.target.files![0].size / 1024).toString());
    if (file_size < 101) {
      if (value!.target.files![0].type.startsWith("image/")) {
        setFun((val) => value!.target.files![0]);
      } else {
        toast.error("Please select an image file.", { theme: "light" });
      }
    } else {
      toast.error("Image file size must be less then 100 kb", {
        theme: "light",
      });
    }
  };

  async function createAgencyFuncation() {
    try {
      const result = safeParse(createAgencySchema, {
        userId: props.user.id,
        name: name.current?.value,
        contact: contact.current?.value,
        email: email.current?.value,
        address: address.current?.value,
        description: description.current?.value,
        aadhar: aadharcard.current?.value,
        pan: pancard.current?.value,
      });

      if (result.success) {
        if (logo == null) return toast.error("Upload your logo");
        if (banner == null) return toast.error("Upload your banner");
        if (aadharimg == null) return toast.error("Upload aadhar card");
        if (panimg == null) return toast.error("Upload your pan card");

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

        const imageBufferThree = await aadharimg.arrayBuffer();
        const imageThree: string =
          Buffer.from(imageBufferThree).toString("base64");

        const uploadimageThree: ApiResponseType<string | null> =
          await uploadaadhar({
            name: aadharimg.name,
            arrayBuffer: imageThree,
          });

        if (!uploadimageThree.status || uploadimageThree.data == null)
          return toast.error(uploadimageThree.message);

        const imageBufferFour = await panimg.arrayBuffer();
        const imageFour: string =
          Buffer.from(imageBufferFour).toString("base64");

        const uploadimageFour: ApiResponseType<string | null> = await uploadpan(
          {
            name: panimg.name,
            arrayBuffer: imageFour,
          }
        );

        if (!uploadimageFour.status || uploadimageFour.data == null)
          return toast.error(uploadimageFour.message);

        const createAgencyResponse = await createAgency({
          id: props.user.id,
          name: result.output.name,
          website: website.current?.value,
          contact: result.output.contact,
          email: result.output.email,
          address: result.output.address,
          description: result.output.description,
          logo: uploadimage.data,
          banner: uploadimageTwo.data,
          aadhar: result.output.aadhar,
          pan: result.output.pan,
          aadharurl: uploadimageThree.data,
          panurl: uploadimageFour.data,
        });

        if (createAgencyResponse.status) {
          toast.success(createAgencyResponse.message);
          name.current!.value = "";
          website.current!.value = "";
          contact.current!.value = "";
          email.current!.value = "";
          address.current!.value = "";
          description.current!.value = "";
          return router.push(`/dashboard`);
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
    } catch (e) {
      toast.error(errorToString(e));
    }
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col p-6 bg-[#eeeeee]">
        <h1 className="text-[#162f57] text-2xl font-semibold text-center">
          Create Agency
        </h1>
        <p className="text-sm mt-2 mb-2 text-center">
          Get started by addding your agency details below.
        </p>

        <div className="bg-white rounded-sm shadow-sm p-4  lg:w-4/6 w-full mx-auto mt-4">
          <p className="text-gray-500">GENERAL INFORMATION</p>

          {/* Logo and banner */}

          <div className="flex gap-4 flex-col md:flex-row flex-wrap">
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

            <input
              type="file"
              ref={cAadharimg}
              accept="image/*"
              onChange={(val) => handlepaChange(val, setAadharimg)}
            />

            <input
              type="file"
              ref={cPanimg}
              accept="image/*"
              onChange={(val) => handlepaChange(val, setPanimg)}
            />
          </div>

          <div className="flex gap-4 flex-col md:flex-row mt-4">
            <div className="grid items-center gap-1.5 w-full flex-1">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Agency Name"
                ref={name}
              />
            </div>

            <div className="grid items-center gap-1.5 w-full flex-1">
              <Label htmlFor="website">Agency website</Label>

              <Input
                type="text"
                id="website"
                name="website"
                placeholder="Enter your Agency Website"
                ref={website}
              />
            </div>
          </div>

          <div className="flex gap-4 flex-col md:flex-row mt-4">
            <div className="grid items-center gap-1.5 w-full flex-1">
              <Label htmlFor="contact">Agency support contact number</Label>
              <Input
                type="text"
                name="contact"
                id="contect"
                placeholder="Enter Your Agency Contact Number"
                ref={contact}
                maxLength={10}
                onChange={handleNumberChange}
              />
            </div>

            <div className="grid items-center gap-1.5 w-full flex-1">
              <Label htmlFor="email">Agency support email</Label>
              <Input
                type="text"
                ref={email}
                id="email"
                name="email"
                placeholder="Enter Agenc E-Mail"
              />
            </div>
          </div>

          <div className="flex gap-4 flex-col md:flex-row mt-4">
            <div className="grid items-center gap-1.5 flex-1">
              <Label htmlFor="aadhar">Agency aadhar card number</Label>
              <Input
                id="aadhar"
                name="aadhar"
                type="text"
                ref={aadharcard}
                onChange={handleNumberChange}
                maxLength={12}
              />
            </div>

            <div className="grid items-center gap-1.5 flex-1">
              <Label>Upload aadhar image</Label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => cAadharimg.current?.click()}
                  className="text-white text-sm w-36 font-semibold text-md py-1 my-2 inline-block px-4 rounded-md bg-[#1bc48b]"
                >
                  {aadharimg == null ? "Add Aadhar" : "Change Aadhar"}
                </button>
                {aadharimg == null || aadharimg == undefined ? (
                  <></>
                ) : (
                  <p>{longtext(aadharimg.name, 18)}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 flex-col md:flex-row mt-4">
            <div className="grid items-center gap-1.5 flex-1">
              <Label htmlFor="pan">Agency pan card number</Label>

              <Input
                id="pan"
                name="pan"
                type="text"
                ref={pancard}
                maxLength={10}
              />
            </div>

            <div className="grid items-center gap-1.5 flex-1">
              <Label>Upload pan image:</Label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => cPanimg.current?.click()}
                  className="text-white text-sm w-36 font-semibold text-md py-1 my-2 inline-block px-4 rounded-md bg-[#1bc48b]"
                >
                  {panimg == null ? "Add Pan" : "Change Pan"}
                </button>
                {panimg == null || panimg == undefined ? (
                  <></>
                ) : (
                  <p>{longtext(panimg.name, 18)}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 flex-col md:flex-row mt-4">
            <div className="grid items-center gap-1.5 w-full flex-1">
              <Label htmlFor="address">Agency complete address</Label>

              <Textarea
                id="address"
                placeholder="Enter Agency Address"
                name="address"
                className="mt-2 border-2 rounded-md resize-none h-20"
                ref={address}
              ></Textarea>
            </div>

            <div className="grid items-center gap-1.5 w-full flex-1">
              <Label htmlFor="description">Agency description:</Label>

              <Textarea
                id="description"
                placeholder="Enter Agency description"
                name="description"
                className="mt-2 border-2 rounded-md resize-none h-20"
                ref={description}
              ></Textarea>
            </div>
          </div>

          <Button
            onClick={createAgencyFuncation}
            className="bg-[#1bc48b] hover:bg-[#1bc48b] mt-4 text-center w-full"
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateAgency;
