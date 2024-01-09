"use server"

import CreateTrips from "@/components/dashboard/createtrip";
import { cookies } from "next/headers";

const CreateTripsPage = () => {
    const usercookies = cookies().get("user")?.value;
    const user = JSON.parse(usercookies!);
    return (
        <CreateTrips id={user.id} />
    );
}
export default CreateTripsPage;