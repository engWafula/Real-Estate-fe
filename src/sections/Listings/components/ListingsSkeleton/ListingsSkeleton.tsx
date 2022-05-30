import { Skeleton, Divider,Alert } from "antd";
import "./listingsSkeleton.css";

interface Props {
  title: string;
  error?:boolean
}
export default function ListingsSkeleton({ title ,error=false}: Props) {

  const errorAlert=error?<Alert message="Something went wrong try again later" 
  type="error"  className="listings-skeleton__alert"/>:null;

  return (
    <div className="listings-skeleton">
      {errorAlert}
      <h1>{title}</h1>
      <Skeleton paragraph={{ rows: 1 }} active />
      <Divider />
      <Skeleton paragraph={{ rows: 1 }} active />
      <Divider />
      <Skeleton paragraph={{ rows: 1 }} active />
      <Divider />
      <Skeleton paragraph={{ rows: 1 }} active />
    </div>
  );
}
