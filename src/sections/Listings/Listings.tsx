
import {useQuery,useMutation} from '@apollo/client';
import {ListingsData,deleteListingData,deleteListingVariables} from './types';
import gql from 'graphql-tag';

interface Props{
  title: string;
}

const LISTING= gql`
  query Listings{
    listings{
    title
    id
    image
    address
    price
    numOfGuests
    numOfBeds
  }
}
`

const DELETE_LISTING= gql`
  mutation DeleteListing($id: ID!){
    deleteListing(id: $id){
      id
      title
      image
    }
  }`

export default function  Listings({title}:Props) {

  const {data,refetch,loading,error}=useQuery<ListingsData>(LISTING);
  const [deleteListings,{loading:deleteListingLoading,error:deleteListingError}]=useMutation<deleteListingData,deleteListingVariables>(DELETE_LISTING)


  const handledeleteListings=async(id:string)=>{

  await  deleteListings({variables:{id}})
  refetch();
  }
  

  const listings=data?data.listings:null;

  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>Something went wrong Please return later.. </div>
  }

  const deleteListingErrorMessage=deleteListingError?<h1>Failed to Delete the listing</h1>:null;

  const deleteListingLoadingMessage=deleteListingLoading?<h1>Deleting the listing...</h1>:null;

  


  return (
    <div>
    <h1>{title}</h1>

 
    <div>
      <ul>
      {
        
        listings?.map((listing)=>(
          <>
          <li key={listing.id}>{listing.title} {listing.price}</li>
          <button onClick={()=>handledeleteListings(listing.id)}>Delete</button>
          </>
         
        ))
      }
      </ul>
      <div>
      {deleteListingErrorMessage}
      {deleteListingLoadingMessage}
      </div>
    </div>
    </div>
  );
}
