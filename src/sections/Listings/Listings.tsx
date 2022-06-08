
import {useQuery,useMutation} from '@apollo/client';
// import {ListingsData,deleteListingData,deleteListingVariables} from './types';
import gql from 'graphql-tag';
import { Listings as ListingsData} from './__generated__/Listings';
import {DeleteListing as deleteListingData} from './__generated__/DeleteListing';
import {DeleteListingVariables as deleteListingVariables } from './__generated__/DeleteListing';
import { List,Avatar,Button,Spin,Alert} from 'antd';
import './styles/listings.css'
import   ListingsSkeleton from  "./components/ListingsSkeleton/ListingsSkeleton";




interface Props{
  title: string;
}

// const LISTING= gql`
//   query Listings{
//     listings{
//     title
//     id
//     image
//     address
//     price
//     numOfGuests
//     numOfBeds
//   }
// }
// `

// const DELETE_LISTING= gql`
//   mutation DeleteListing($id: ID!){
//     deleteListing(id: $id){
//       id
//       title
//       image
//     }
//   }`

export  function  Listings({title}:Props) {

//   const {data,refetch,loading,error}=useQuery<ListingsData>(LISTING);
//   const [deleteListings,{loading:deleteListingLoading,error:deleteListingError}]=useMutation<deleteListingData,deleteListingVariables>(DELETE_LISTING)


//   const handledeleteListings=async(id:string)=>{

//   await  deleteListings({variables:{id}})
//   refetch();
//   }
  

//   const listings=data?data.listings:null;

//   if(loading){
//     return <div className='listings'><ListingsSkeleton title={title }/></div>
//   }

//   if(error){
//     return <div className='listings'><ListingsSkeleton title={title } error/></div>
//   }

//   const deleteListingErrorAlert=deleteListingError?<Alert message="Something went wrong try again later" 
//   type="error"  className="listings-alert"/>:null;
// ;


//   const deleteListingErrorMessage=deleteListingError?<h1>Failed to Delete the listing</h1>:null;

//   const deleteListingLoadingMessage=deleteListingLoading?<h1>Deleting the listing...</h1>:null;

//   const listingsList=listings?(
//     <List
//     itemLayout="horizontal"
//     dataSource={listings}
//     renderItem={listing => (
//       <List.Item actions={[<Button  type="primary" onClick={()=>handledeleteListings(listing.id)}>Delete </Button>]}>
//         <List.Item.Meta
//           title={listing.title}
//           description={listing.address}
//           avatar={<Avatar src={listing.image} shape="square" size={48}/>}
//         />
//       </List.Item>
//     )}
//   />

//   ):null;


  return (
    <div>
      {/* <Spin spinning={deleteListingLoading}>
        {deleteListingErrorAlert}
    <h1>{title}</h1>
      {listingsList}
      {deleteListingErrorMessage}
      </Spin> */}
      listing
      </div>

  );
}
