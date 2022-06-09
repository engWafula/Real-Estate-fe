import React from "react";
import { User as UserData } from "../../../../lib/graphql/queries/User/__generated__/User";
import { Avatar, Divider, Card, Typography,Button,Tag } from "antd";
import { Viewer } from "../../../../lib/types";
import { formatListingPrice,  displaySuccessNotification,
  displayErrorMessage } from "../../../../lib/utils";
import { DISCONNECT_STRIPE } from "../../../../lib/graphql/mutations";
import { useMutation } from "@apollo/client";
import { DisconnectStripe as DisconnectStripeData } from "../../../../lib/graphql/mutations/DisconnectStripe/__generated__/DisconnectStripe";


interface Props {
  user: UserData["user"]; //this is known as index lookup types
  viewerIsUser:boolean;
  viewer:Viewer
  setViewer: (viewer:Viewer) => void;
  handleUserRefetch: () => void;
}

const { Title, Paragraph, Text } = Typography;

const stripeAuthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_S_CLIENT_ID}&scope=read_write`;

export function UserProfile({ user,viewerIsUser,viewer,setViewer,handleUserRefetch }: Props) {


  const [disconnectStripe, { loading }] = useMutation<DisconnectStripeData>(
    DISCONNECT_STRIPE,
    {
      onCompleted: data => {
        if (data && data.disconnectStripe) {
          setViewer({
            ...viewer,
            hasWallet: data.disconnectStripe.hasWallet
          });
          displaySuccessNotification(
            "You've successfully disconnected from Stripe!",
            "You'll have to reconnect with Stripe to continue to create listings."
          );
          handleUserRefetch()
        }
      },
      onError: () => {
        displayErrorMessage(
          "Sorry! We were'nt able to disconnect you from Stripe. Please try again later!"
        );
      }
    }
  );

  const redirectToStripe=()=>{

    window.location.href=stripeAuthUrl;

    
  }


  const additionalDetails = viewer.hasWallet ? (
    <>
      <Paragraph>
        <Tag color="green">Stripe Registered</Tag>
      </Paragraph>
      <Paragraph>
        Icome Earned:{" "}
        <Text strong>
          {user.income ? formatListingPrice(user.income) : "0$"}
        </Text>
      </Paragraph>
      <Button
         type="primary"
        className="user-profile__details-cta"
        loading={loading}
        onClick={() => disconnectStripe()}
      >
        Disconnect Stripe
      </Button>
      <Paragraph type="secondary">
        By disconnecting, you won't be able to recieve{" "}
        <Text strong>any further payments</Text>. This will prevent users from
        booking listings that you might have already created.
      </Paragraph>
    </>
  ) : (
    <>
      <Paragraph>
        Interested in becoming a TinyHouse host? Register with your Stripe
        account!
      </Paragraph>
      <Button
        type="primary"
        className="user-profile__details-cta"
        onClick={redirectToStripe}
      >
        Connect with Stripe
      </Button>
      <Paragraph type="secondary">
        TinyHouse uses{" "}
        <a
          href="https://stripe.com/en-US/connect"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stripe
        </a>{" "}
        to help transfer your earnings in a secure and trusted manner.
      </Paragraph>
    </>
  );
    const additionalDetailsElement =viewerIsUser?(
        <>
        <Divider/>
        <div className="user-profile_details">
            <Title level={4}>
            Additional Details
             </Title>  
            {additionalDetails}
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
        {additionalDetailsElement}  
      </Card>
    </div>
  );
}
