"use client";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, SetStateAction, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Fa6SolidCalendarDays,
  FaSolidTrashAlt,
  IconamoonSignPlusCircleLight,
  IconamoonTrashDuotone,
} from "../icons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { safeParse } from "valibot";
import { TripSchema } from "@/schemas/createtrip";
import { ApiResponseType } from "@/models/responnse";
import {
  createTrip,
  uploadimageTrip,
  uploadtripImage,
  uploadtripLogo,
} from "@/actions/trip/createtrip";
import { TripCategory, TripType } from "@prisma/client";
import { capitalcase } from "@/utils/methods";

interface TripProps {
  id: number;
}
const CreateTrips = (props: TripProps) => {
  const router = useRouter();

  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);

  const price = useRef<HTMLInputElement>(null);
  const number_of_people = useRef<HTMLInputElement>(null);

  const [tripCategory, setTripcategory] = useState<string>("");
  const [tripType, setTripType] = useState<string>("");

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handlePriceInput = (e: ChangeEvent<HTMLInputElement>) => {
    price.current!.value = e.target.value.replace(/\D/g, "");
  };
  const handleNumberOfPeopleInput = (e: ChangeEvent<HTMLInputElement>) => {
    number_of_people.current!.value = e.target.value.replace(/\D/g, "");
  };

  const [logo, setLogo] = useState<File | null>(null);
  const cLogo = useRef<HTMLInputElement>(null);

  let imgref = useRef<HTMLInputElement | null>(null);
  let [images, setImages] = useState<File[]>([]);

  interface dayinfo {
    title: string;
    description: string[];
  }

  const [locations, setLocation] = useState<string[]>([]);
  const [daysinfo, setDayingo] = useState<dayinfo[]>([]);
  const [exclusion, setExclusion] = useState<string[]>([]);
  const [inclusion, setInclusion] = useState<string[]>([]);

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

  const submit = async () => {
    const result = safeParse(TripSchema, {
      name: name.current!.value,
      description: description.current!.value,
      start_date: startDate,
      end_date: endDate,
      price: parseInt(price.current!.value),
      number_of_people: parseInt(number_of_people.current!.value),
      trip_type: tripType,
      category: tripCategory,
      createdBy: props.id,
    });
    if (result.success) {
      if (locations.length < 1)
        return toast.error("Enter at least one location.");
      if (daysinfo.length < 1)
        return toast.error("Enter at least one day description.");
      if (logo == null) return toast.error("Upload your trip logo first.");
      if (images.length < 3)
        return toast.error("Please upload at least three image.");
      if (inclusion.length < 1)
        return toast.error("Enter at least one inclusion.");
      if (exclusion.length < 1)
        return toast.error("Enter at least one exclusion.");
      const imageBuffer = await logo.arrayBuffer();
      const image: string = Buffer.from(imageBuffer).toString("base64");
      const uploadimage: ApiResponseType<string | null> = await uploadtripLogo({
        name: logo.name,
        arrayBuffer: image,
      });
      if (!uploadimage.status || uploadimage.data == null)
        return toast.error(uploadimage.message);
      const createdtrip = await createTrip({
        name: result.output.name,
        start: result.output.start_date,
        end: result.output.end_date,
        image: uploadimage.data,
        price: result.output.price,
        category: result.output.category as TripCategory,
        trip_type: result.output.trip_type as TripType,
        description: result.output.description,
        number_of_people: result.output.number_of_people,
        createdBy: result.output.createdBy,
        location: locations,
        dayinfo: daysinfo,
        inclusion: inclusion,
        exclusion: exclusion,
      });
      if (!createdtrip.status) return toast.error(createdtrip.message);
      for (let i = 0; i < images.length; i++) {
        const imageBufferTwo = await images[i].arrayBuffer();
        const imageTwo: string = Buffer.from(imageBufferTwo).toString("base64");
        const uploadimageTwo: ApiResponseType<string | null> =
          await uploadtripImage({
            name: images[i].name,
            arrayBuffer: imageTwo,
          });
        if (!uploadimageTwo.status || uploadimageTwo.data == null)
          return toast.error(uploadimageTwo.message);
        const updatetrip = await uploadimageTrip({
          id: createdtrip.data?.id!,
          path: uploadimageTwo!.data!,
        });
        if (!updatetrip.status) return toast.error(updatetrip.message);
      }
      toast.success(createdtrip.message);
      return router.replace(`/dashboard/trips/${createdtrip.data?.id}`);
    } else {
      let errorMessage = "";
      if (result.issues[0].input) {
        errorMessage = result.issues[0].message;
      } else {
        errorMessage = result.issues[0].path![0].key + " is required";
      }
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="p-6 sm:p-10">
        <h1 className="text-[#162f57] text-2xl font-semibold">Create Trips</h1>
        <p className="text-sm mt-4 mb-2">
          Get started by addding your trip details below.
        </p>
        <div className="bg-white rounded-sm shadow-sm p-4">
          <p className="text-gray-500">GENERAL INFORMATION</p>
          <div className="flex flex-col items-center justify-center">
            {logo != null ? (
              <div>
                <Image
                  src={URL.createObjectURL(logo!)}
                  alt="logo"
                  className="w-60 h-60 object-cover object-center rounded-md"
                />
              </div>
            ) : null}

            <button
              onClick={() => cLogo.current?.click()}
              className="text-white font-semibold text-md py-1 my-2 inline-block px-4 rounded-md bg-green-500"
            >
              {logo == null ? "Add Logo" : "Change Logo"}
            </button>
          </div>
          <div className="hidden">
            <Input
              type="file"
              ref={cLogo}
              accept="image/*"
              onChange={(val) => handleLogoChange(val, setLogo)}
            />
          </div>

          <div className="flex gap-4 flex-col md:flex-row mt-4">
            <div className="grid items-center gap-1.5 w-full">
              <Label htmlFor="name">Trip Name</Label>
              <Input
                id="name"
                type="text"
                className="w-full"
                ref={name}
                placeholder="Enter trip name"
              />
            </div>
            <div className="grid items-center gap-1.5 w-full">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="text"
                className="w-full"
                ref={price}
                placeholder="Enter trip price"
                onChange={handlePriceInput}
              />
            </div>
          </div>

          <div className="grid items-center gap-1.5 w-full mt-4">
            <Label htmlFor="address">Description</Label>
            <Textarea
              id="description"
              className="w-full resize-none h-28"
              ref={description}
              placeholder="Enter trip description"
            ></Textarea>
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            <div className="grid items-center gap-1.5 w-full mt-4">
              <Label htmlFor="name">Trip Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal
                      ${!startDate && "text-muted-foreground"}
                    `}
                  >
                    <Fa6SolidCalendarDays className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Pick start date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date < new Date() || endDate! <= date}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid items-center gap-1.5 w-full mt-4">
              <Label htmlFor="name">Trip End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal
                      ${!endDate && "text-muted-foreground"}
                    `}
                  >
                    <Fa6SolidCalendarDays className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Pick start date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => date < new Date() || startDate! >= date}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            <div className="grid items-center gap-1.5 w-full mt-4">
              <Label htmlFor="name">Select Trip Type</Label>
              <Select
                onValueChange={(val) => {
                  if (!val) return;
                  setTripType(val);
                }}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Select File Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Trip Type</SelectLabel>
                    <SelectItem value={"PRIVATE"}>PRIVATE</SelectItem>
                    <SelectItem value={"PUBLIC"}>PUBLIC</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid items-center gap-1.5 w-full mt-4">
              <Label htmlFor="address">Select Trip Category</Label>
              <Select
                onValueChange={(val) => {
                  if (!val) return;
                  setTripcategory(val);
                }}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Select Trip Cateogry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Trip Category</SelectLabel>
                    <SelectItem value="SCHOOL">SCHOOL</SelectItem>
                    <SelectItem value="COUPLE">COUPLE</SelectItem>
                    <SelectItem value="FAMILY">FAMILY</SelectItem>
                    <SelectItem value="OFFICE">OFFICE</SelectItem>
                    <SelectItem value="FRIENDS">FRIENDS</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid items-center gap-1.5 w-full mt-4">
            <Label htmlFor="price">Number of Peoples</Label>
            <Input
              id="price"
              type="text"
              onChange={handleNumberOfPeopleInput}
              ref={number_of_people}
              className="w-full"
              placeholder="Enter Number of peoples"
            />
          </div>

          <div className="w-full bg-gray-400 h-[1px] mt-4"></div>
          <div className="p-2 min-w-60 flex-1">
            <div className="flex items-center">
              <p className="text-gray-500">Add Locations</p>
              <div className="grow"></div>
              <div
                className="text-sm px-4 text-white py-1 rounded-sm cursor-pointer bg-green-500"
                onClick={() => {
                  if (locations.length >= 20) {
                    toast.error("You can add only 20 locations");
                    return;
                  }

                  if (locations[locations.length - 1] === "") {
                    toast.error("Please fill the location name");
                    return;
                  }
                  setLocation((val) => [...val, ""]);
                }}
              >
                Add Location
              </div>
            </div>
            <div className="flex flex-col mt-4 gap-2">
              {locations.map((val: string, index: number) => (
                <div
                  key={index}
                  className="flex gap-2 text-center items-center"
                >
                  <Input
                    value={val}
                    onChange={(e) => {
                      const temp = [...locations];

                      temp[index] = capitalcase(e.target.value);

                      setLocation((val) => temp);
                    }}
                    placeholder={"Location"}
                  />
                  <FaSolidTrashAlt
                    className="text-lg text-rose-500 cursor-pointer"
                    onClick={() => {
                      const temp = [...locations];
                      temp.splice(index, 1);
                      setLocation((val) => temp);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* description start from here */}

          <div className="w-full bg-gray-400 h-[1px] mt-4"></div>
          <div className="p-2 min-w-60 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-gray-500">Description Of Each Day</p>
              <div className="grow"></div>

              <div className="flex gap-4">
                <div
                  className="text-sm px-4 text-white py-1 rounded-sm cursor-pointer bg-green-500 flex-1"
                  onClick={() => {
                    if (daysinfo.length >= 30) {
                      toast.error("You can add only 30 days");
                      return;
                    }
                    if (daysinfo.length === 0) {
                      setDayingo((val) => [{ title: "", description: [""] }]);
                      return;
                    }

                    if (daysinfo[daysinfo.length - 1].title === "") {
                      toast.error("Please fill the last day title first");
                      return;
                    }

                    if (daysinfo[daysinfo.length - 1].description.length < 1) {
                      toast.error("Please fill the last day description first");
                      return;
                    }

                    if (
                      daysinfo[daysinfo.length - 1].description[
                        daysinfo[daysinfo.length - 1].description.length - 1
                      ] === ""
                    ) {
                      toast.error("Please fill the last day description first");
                      return;
                    }

                    setDayingo((val) => [
                      ...val,
                      { title: "", description: [""] },
                    ]);
                  }}
                >
                  Add Day {daysinfo.length + 1}
                </div>

                {daysinfo.length > 0 ? (
                  <>
                    <div
                      className="text-sm px-4 text-white py-1 rounded-sm cursor-pointer bg-green-500"
                      onClick={() => {
                        if (daysinfo.length >= 30) {
                          toast.error("You can add only 30 days");
                          return;
                        }
                        if (daysinfo[daysinfo.length - 1].title === "") {
                          toast.error("Please fill the last day title first");
                          return;
                        }

                        console.log("daysinfo", daysinfo);

                        if (
                          daysinfo[daysinfo.length - 1].description.length < 1
                        ) {
                          toast.error(
                            "Please fill the last day description first"
                          );
                          return;
                        }

                        if (
                          daysinfo[daysinfo.length - 1].description[
                            daysinfo[daysinfo.length - 1].description.length - 1
                          ] === ""
                        ) {
                          toast.error(
                            "Please fill the last day description first"
                          );
                          return;
                        }

                        // keep old title and description of the last day and add new description field
                        const temp = [...daysinfo];
                        temp[daysinfo.length - 1].description.push("");
                        setDayingo((val) => temp);
                      }}
                    >
                      Add Day {daysinfo.length + 1} Description
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex flex-col mt-4 gap-2">
              {daysinfo.map((val: dayinfo, index: number) => (
                <div key={index}>
                  <h1 className="mt-4 mb-2">Day {index + 1} Details</h1>
                  <div className="flex gap-2 text-center items-center">
                    <Input
                      value={val.title}
                      onChange={(e) => {
                        const temp = [...daysinfo];

                        temp[index].title = capitalcase(e.target.value);

                        setDayingo((val) => temp);
                      }}
                      placeholder={`Day ${index + 1} title`}
                    />
                    <FaSolidTrashAlt
                      className="text-lg text-rose-500 cursor-pointer"
                      onClick={() => {
                        const temp = [...daysinfo];
                        temp.splice(index, 1);
                        setDayingo((val) => temp);
                      }}
                    />
                  </div>
                  <div className="mt-2 text-center items-start">
                    {val.description.map((valdescription, indexvalue) => (
                      <div
                        key={indexvalue}
                        className="flex gap-2 text-center items-start mt-2"
                      >
                        <Textarea
                          value={valdescription}
                          onChange={(e) => {
                            const temp = [...daysinfo];
                            temp[index].description[indexvalue] =
                              e.target.value;
                            setDayingo((val) => temp);
                          }}
                          placeholder={`Day ${index + 1} description`}
                          className="resize-none h-24 w-full grow"
                        ></Textarea>
                        <FaSolidTrashAlt
                          className="text-lg text-rose-500 cursor-pointer"
                          onClick={() => {
                            const temp = [...daysinfo];
                            temp[index].description.splice(index, 1);
                            setDayingo((val) => temp);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full bg-gray-400 h-[1px] mt-4"></div>
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="p-2 min-w-60 flex-1">
              <div className="flex items-center">
                <p className="text-gray-500">Inclusion</p>
                <div className="grow"></div>
                <div
                  className="text-sm px-4 text-white py-1 rounded-sm cursor-pointer bg-green-500"
                  onClick={() => {
                    if (inclusion.length >= 20) {
                      toast.error("You can add only 20 inclusion");
                      return;
                    }

                    if (inclusion[inclusion.length - 1] === "") {
                      toast.error("Please fill the location name");
                      return;
                    }
                    setInclusion((val) => [...val, ""]);
                  }}
                >
                  Add Inclusion
                </div>
              </div>
              <div className="flex flex-col mt-4 gap-2">
                {inclusion.map((val: string, index: number) => (
                  <div
                    key={index}
                    className="flex gap-2 text-center items-center"
                  >
                    <Input
                      value={val}
                      onChange={(e) => {
                        const temp = [...inclusion];

                        temp[index] = capitalcase(e.target.value);

                        setInclusion((val) => temp);
                      }}
                      placeholder={"Inclusion"}
                    />
                    <FaSolidTrashAlt
                      className="text-lg text-rose-500 cursor-pointer"
                      onClick={() => {
                        const temp = [...inclusion];
                        temp.splice(index, 1);
                        setInclusion((val) => temp);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-2 min-w-60 flex-1">
              <div className="flex items-center">
                <p className="text-gray-500">Exclusion</p>
                <div className="grow"></div>
                <div
                  className="text-sm px-4 text-white py-1 rounded-sm cursor-pointer bg-green-500"
                  onClick={() => {
                    if (exclusion.length >= 20) {
                      toast.error("You can add only 20 exclusion");
                      return;
                    }

                    if (exclusion[exclusion.length - 1] === "") {
                      toast.error("Please fill the location name");
                      return;
                    }
                    setExclusion((val) => [...val, ""]);
                  }}
                >
                  Add Exclusion
                </div>
              </div>
              <div className="flex flex-col mt-4 gap-2">
                {exclusion.map((val: string, index: number) => (
                  <div
                    key={index}
                    className="flex gap-2 text-center items-center"
                  >
                    <Input
                      value={val}
                      onChange={(e) => {
                        const temp = [...exclusion];

                        temp[index] = capitalcase(e.target.value);

                        setExclusion((val) => temp);
                      }}
                      placeholder={"Exclusion"}
                    />
                    <FaSolidTrashAlt
                      className="text-lg text-rose-500 cursor-pointer"
                      onClick={() => {
                        const temp = [...exclusion];
                        temp.splice(index, 1);
                        setExclusion((val) => temp);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* images start from here */}

          <div className="w-full bg-gray-400 h-[1px] mt-4"></div>

          <p className="text-gray-500 mt-4">TRIPS IMAGES</p>

          <div className="hidden">
            <input
              type="file"
              accept="image/*"
              ref={imgref}
              onChange={(value) => {
                let file_size = parseInt(
                  (value!.target.files![0].size / 1024 / 1024).toString()
                );
                if (file_size < 1) {
                  if (value!.target.files![0].type.startsWith("image/")) {
                    setImages((val) => [...val, value!.target.files![0]]);
                  } else {
                    toast.error("Please select an image file.");
                  }
                } else {
                  toast.error("Image file size must be less then 1 mb");
                }
              }}
            />
          </div>
          <div className="flex gap-4 flex-wrap w-full mt-6">
            {images.map((value: File, i: number) => {
              var url = URL.createObjectURL(value);
              return (
                <div key={i}>
                  <div className="w-40 h-40 bg-gray-200 rounded-xl grid place-items-center relative">
                    <div className="top-0 left-0 absolute h-full w-full">
                      <Image
                        removeWrapper
                        src={url}
                        alt="error"
                        className="w-full h-full rounded-xl object-cover"
                      />
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        let arr = [...images];
                        arr.splice(i, 1);
                        setImages(arr);
                      }}
                    >
                      <IconamoonTrashDuotone className="text-red-500 font-bold text-lg top-0 right-0 absolute" />
                    </div>
                  </div>
                </div>
              );
            })}
            {images.length < 8 ? (
              <div
                className="w-40 h-40 bg-gray-200 rounded-xl grid place-items-center cursor-pointer"
                onClick={() => {
                  imgref.current?.click();
                }}
              >
                <IconamoonSignPlusCircleLight className="text-gray-400 text-3xl font-bold text-center" />
              </div>
            ) : (
              <></>
            )}
          </div>

          <Button
            onClick={submit}
            className="w-full mt-4 bg-[#1bc48b] hover:bg-[#1bc48b]"
          >
            CREATE
          </Button>
        </div>
      </div>
    </>
  );
};
export default CreateTrips;
