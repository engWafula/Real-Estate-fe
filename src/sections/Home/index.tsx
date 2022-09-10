import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Card, Col, Input, Row, Typography,Layout } from "antd";
import { useQuery } from "@apollo/client";
import { HomeHero, HomeListingsSkeleton } from "./components";
import map from "./assets/map-background.jpg";
import { displayErrorMessage } from "../../lib/utils";
import { Listings as ListingsData,ListingsVariables } from "../../lib/graphql/queries/Listings/__generated__/Listings";
import { Link } from "react-router-dom";
import { LISTINGS } from "../../lib/graphql/queries/Listings";
import { ListingsFilter } from "../../lib/graphql/globalTypes";
import { HomeListings } from "./components";


import mbaleImage from "./assets/mbale.jpg";

import mbararaImage from "./assets/mbarara.jpg";


const {Content}=Layout;
const { Paragraph, Title } = Typography;


const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

export const Home = ({history}:RouteComponentProps) => {
  const onSearch=(value:string)=>{
    const trimedValue = value.trim()

    if(trimedValue){
      history.push(`/listings/${trimedValue}`);
    }
    else{
   displayErrorMessage("Please enter a valid search input")
    }
  
  }
 
  const { data, loading, error } = useQuery<ListingsData,ListingsVariables>(LISTINGS, {
    variables: {
        filter: ListingsFilter.PRICE_HIGH_TO_LOW,
        limit: PAGE_LIMIT,
        page: PAGE_NUMBER,
    },
});
  
const renderListingsSection=()=> {
  if (loading) {
      return  <HomeListingsSkeleton/>
  }

  if (data) {
      return (
          <HomeListings
              title="Premium Listings"
              listings={data.listings.result}
          />
      )
  }

  return null;
}
  return (
    <Content className="home" style={{backgroundImage:`url(${map})`}}>
      <HomeHero  onSearch={onSearch} />

      <div className="home__cta-section">
                <Title level={2} className="home__cta-section-title">
                    Your guide to help you find the perfect home
                </Title>
                <Paragraph>
                    Helping you make the best decision in renting your best locations
                </Paragraph>
                <Link
                    to="/listings/uganda"
                    className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button"
                >
                    Popular houses in  Uganda
                </Link>
            </div>

              {renderListingsSection()}
            <div className="home__listings">
                <Title level={4} className="home__listings-title">
                    Listing of any kind
                </Title>
                <Row gutter={12} className="home-hero__cards">
                    <Col xs={24} sm={12}>
                        <Link to="/listings/mbale">
                            <div className="home__listings-img-cover">
                            <Card  cover={<img src={mbaleImage}  className="home__listings-img" alt="entebbe" />}>Week or two trip to the mountain Elgon</Card>
                            </div>
                        </Link>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Link to="/listings/mbarara">
                            <div className="home__listings-img-cover">
                            <Card  cover={<img src={mbararaImage}  className="home__listings-img" alt="entebbe" />}>Have a trip to the land of Milk</Card>

                            </div>
                        </Link>
                    </Col>
                </Row>
            </div>
    </Content>
  )
};
