import * as React from "react";
import { List, Typography } from "antd";
import { ListingCard } from "../../../../lib/components";
import { Listings } from "../../../../lib/graphql/queries/Listings/__generated__/Listings";

interface Props {
    title: string;
    listings: Listings["listings"]["result"];
}


const { Title } = Typography;

export function HomeListings({ title, listings }: Props) {
    return (
        <div className="home-listings">
            <Title level={4} className="home-listings__title">
                {title}
            </Title>
            <List
                grid={{
                    gutter: 8,
                    xs: 1,
                    sm: 2,
                    lg: 4,
                }}
                dataSource={listings}
                renderItem={(listing) => (
                    <div className="holder">
                    <List.Item className="listing__items">
                        <ListingCard listing={listing} />
                    </List.Item>
                    </div>
                )}
            />
        </div>
    );
}
