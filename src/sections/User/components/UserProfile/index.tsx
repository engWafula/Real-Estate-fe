import React from "react";
import { User as UserData } from "../../../../lib/graphql/queries/User/__generated__/User";
import { Avatar, Divider, Card, Typography,Button } from "antd";

interface Props {
  user: UserData["user"]; //this is known as index lookup types
  viewerIsUser:boolean
}

const { Title, Paragraph, Text } = Typography;

export function UserProfile({ user,viewerIsUser }: Props) {

    const additionalDetails =viewerIsUser?(
        <>
        <Divider/>
        <div className="user-profile_details">
            <Title level={4}>
            Additional Details
             </Title>  
             <Paragraph>
                 Intereted in hosting your Apartments,Rentals,Hostels,Hotels on Tusenguke,Please Register with your Bank Account to receive money from your tenants
                 </Paragraph> 
                 <Button type="primary"  className="user-profile__details-cta">
                     Connect with Stripe
                     </Button>
                     <Paragraph type="secondary">
        Tusenguke uses{" "}
        <a
          href="https://stripe.com/en-US/connect"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stripe
        </a>{" "}
        to help transfer your earnings in a secure and trusted manner.
      </Paragraph>
        </div>
        </>
    ):null

  return (
    <div className="user-profile">
      <Card className="user-profile_card">
        <div className="user-profile_avatar">
          <Avatar size={100} src={user.avatar} />
        </div>
        <Divider />
        <div className="user-profile_details">
            <Title level={4}>Details</Title>
            <Paragraph> 
                Name: <Text strong>{user.name}</Text>
            </Paragraph>
            <Paragraph>
                Contact: <Text strong>{user.contact}</Text>
            </Paragraph>
           
        </div>  
        {additionalDetails}  
      </Card>
    </div>
  );
}
