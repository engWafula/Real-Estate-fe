import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER } from "../../lib/graphql/queries";
import {
  User as UserData,
  UserVariables,
} from "../../lib/graphql/queries/User/__generated__/User";
import { Col, Layout, Row } from "antd";
import { UserProfile,UserListings,UserBookings } from "./components";
import { PageSkeleton, ErrorBanner } from "../../lib/components";
import { Viewer } from "../../lib/types";

interface MatchParams {
  id: string;
}

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Content } = Layout;
const PAGE_LIMIT = 4;

export function User({
  setViewer,
  viewer,
  match,
}: Props & RouteComponentProps<MatchParams>) {
  const [listingsPage, setListingsPage] = useState(1);
  const [bookingsPage, setBookingsPage] = useState(1);

  const { data, loading, error,refetch } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id,
      bookingsPage,
      listingsPage,
      limit: PAGE_LIMIT,
    },
  });


  const user = data ? data.user : null;

  const viewerIsUser = viewer.id === match.params.id;

  const userListings = user ? user.listings : null;
  const userBookings = user ? user.bookings : null;

  const handleUserRefetch = async () => {
    await refetch();
  }

  const userProfileElement = user ? (
    <UserProfile user={user} viewer={viewer} setViewer={setViewer} 
    handleUserRefetch={handleUserRefetch} 
    viewerIsUser={viewerIsUser} />
  ) : null;

  const userListingsElement = userListings ? (
    <UserListings
      userListings={userListings}
      page={listingsPage}
      limit={PAGE_LIMIT}
      setListingsPage={setListingsPage}
    />
  ) : null;

  const userBookingsElement = userBookings ? (
    <UserBookings
      userBookings={userBookings}
      bookingsPage={bookingsPage}
      limit={PAGE_LIMIT}
      setBookingsPage={setBookingsPage}
    />
  ) : null;

  if (loading) {
    return (
      <Content className="user">
        <PageSkeleton />
      </Content>
    );
  }

  const stripeError= new URL(window.location.href).searchParams.get("stripe_error");

  const stripeErrorElement = stripeError ? (<ErrorBanner message="We had trouble connecting with Stripe. Please try again." />) : null;

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="This user may not exist in the Tusenguke Database.Please try again later" />
        <PageSkeleton />
      </Content>
    );
  }

  return (
    <Content className="user">
      {stripeErrorElement}
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
        <Col xs={24}>
        {userListingsElement}
        {userBookingsElement}
        </Col>
      </Row>
    </Content>
  );
}
