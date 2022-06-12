import React from "react";
import { Link } from "react-router-dom";
import  { Card, Typography} from "antd";
import {UserOutlined}  from '@ant-design/icons';
import {iconColor,formatListingPrice} from "../../utils"

interface Props {
  listing: {
    id: string;
    title: string;
    image: string;
    address: string;
    price: number;
    numOfGuests: number;
  };
}

const { Text, Title } = Typography;

export function ListingCard({ listing }: Props) {
  const { id, title, image, address, price, numOfGuests } = listing;
  return (
      <Link to={`/listing/${id}`}>
    <Card
      hoverable
      cover={
        <div
          className="listing-card__cover-img"
          style={{ backgroundImage: `url(${image})` }}
        />
      }
    >
      <div className="listing-card__details">
        <div className="listing-card__description">
          <Title level={4} className="listing-card__price">
            {formatListingPrice(price) }
            <span>/month</span>
          </Title>
          <Text strong ellipsis className="listing-card__title">
          {title.length > 28 ? `${title.substring(0, 28)}...` : title}
          </Text>
          <Text  ellipsis className="listing-card__address">
          {address.length > 30 ? `${address.substring(0, 30)}...` : address}
          </Text>
        </div>
        <div className="listing-card__dimensions listing-card__dimensions--guests">
             <UserOutlined style={{color:iconColor}} />  <Text>{numOfGuests} guests</Text>
            </div>
      </div>
    </Card>
    </Link>
  );
}
