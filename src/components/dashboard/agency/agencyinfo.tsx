"use client"
interface AgencyInfoProps {
    agency: any;
}
const AgencyInfo = (props: AgencyInfoProps) => {
    console.log(props.agency)
    return (
        <>
            <h1>Name: {props.agency.name}</h1>
            <h1>email: {props.agency.email}</h1>
            <h1>contact: {props.agency.contact}</h1>
            <h1>website: {props.agency.website}</h1>
            <h1>description:: {props.agency.description}</h1>
            <h1>Create Time: {new Date(props.agency.createdAt.toString()).toDateString()}</h1>
        </>
    );
}

export default AgencyInfo;