
import {useQuery,useMutation} from '@apollo/client';
import  { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout, List, Typography, Affix } from "antd";
import { ListingCard, ErrorBanner } from "../../lib/components";
import {
  Listings as ListingsData,
  ListingsVariables
} from "../../lib/graphql/queries/Listings/__generated__/Listings";
import {LISTINGS} from '../../lib/graphql/queries/Listings';
import { ListingsFilter } from '../../lib/graphql/globalTypes';
import { RouteComponentProps } from 'react-router-dom';
import {
  ListingsFilters,
  ListingsPagination,
  ListingsSkeleton,
  // ListingsSkeleton
} from "./components";


const { Content } = Layout;
const { Title, Text,Paragraph } = Typography;


interface MatchParams{
  location:string;
}


const PAGE_LIMIT = 8;

export const Listings=({match}:RouteComponentProps<MatchParams>)=>{
  
  const locationRef = useRef(match.params.location);

  const [filter,setFilter]=useState<ListingsFilter>(ListingsFilter.PRICE_LOW_TO_HIGH );
  const [page,setPage]=useState(1);
  const {data,loading,error}=useQuery<ListingsData,ListingsVariables>(LISTINGS,{
    skip: locationRef.current !== match.params.location && page !== 1 ,

    variables:{
      location:match.params.location,
      filter,
      limit:PAGE_LIMIT,
      page
    },
  })

  const listings= data?data.listings:null;
  const listingsRegion = listings?listings.region:null;

  useEffect(()=>{
    setPage(1);
    locationRef.current=match.params.location;
  },[match.params.location])
  
  if (loading) {
    return (
      <Content className="listings">
        <ListingsSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="listings">
        <ErrorBanner description="We either couldn't find anything matching your search or we've encountered an error. If you're searching for a unique location, try searching again with more common keywords." />
        <ListingsSkeleton />
      </Content>
    );
  }

  const listingsElement=listings && listings.result.length?(
    <div>
           <Affix offsetTop={64}>
          <>
             <ListingsPagination
              limit={PAGE_LIMIT}
              total={listings.total}
              page={page}
              setPage={setPage}
            /> 
            <ListingsFilters filter={filter} setFilter={setFilter} />
          </>
        </Affix>
   
    <List
    grid={{
      gutter: 8,
      lg: 4,
      sm: 2,
      xs: 1
    }}
    dataSource={listings.result}
    renderItem={item => (
      <List.Item>
        <ListingCard listing={item} />
      </List.Item>
    )}
  />
   </div>
  ):(
    <div>
    <Paragraph>
      It seems that there is no listings that have been created for{" "}
      <Text mark>{listingsRegion}</Text>
    </Paragraph>
    <Paragraph>
      Be the first person to create a{" "}
      <Link to="/host">listing in this Region,Thank you !!!</Link>
    </Paragraph>
  </div>
  )

  const listingsRegionElement = listingsRegion ? (
    <Title level={3} className="listings__title">
      Results for "{listingsRegion}"
    </Title>
  ) : null;


  return <Content className='listings'>
    {listingsRegionElement}
    {listingsElement}
    </Content>
}