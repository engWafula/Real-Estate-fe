import React, { useState } from "react";
import { Moment } from "moment";
import { useParams } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import { PageSkeleton, ErrorBanner } from "../../lib/components";
import { useQuery } from "@apollo/client";
import { LISTING } from "../../lib/graphql/queries/Listing";
import {
  Listing as ListingData,
  ListingVariables,
} from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { Viewer } from "../../lib/types";
import {
  ListingDetails,
  ListingBookings,
  ListingCreateBooking,
  ListingCreateBookingModal,
} from "./components";
import { Footer } from "../Footer";

interface MatchProps {
  id: string;
}

interface Props {
  viewer: Viewer;
}

const PAGE_LIMIT = 3;
const { Content } = Layout;

export function Listing({viewer, match }:Props & RouteComponentProps<MatchProps>) {
  const [bookingsPage, setBookingsPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Moment | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null);
  const { data, error, loading, refetch } = useQuery<
    ListingData,
    ListingVariables
  >(LISTING, {
    variables: {
      id: match.params.id,
      limit: PAGE_LIMIT,
      bookingsPage,
    },
  });

  if (loading) {
    return (
      <Content className="listings">
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="listings">
        <ErrorBanner description="This listing may not exist or we 've encounted an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  const listing = data ? data.listing : null;
  const listingBookings = listing ? listing.bookings : null;

  const listingDetailsElement = listing ? (
    <ListingDetails listing={listing} />
  ) : null;
  const listingBookingsElement = listingBookings ? (
    <ListingBookings
      listingBookings={listingBookings}
      setBookingsPage={setBookingsPage}
      limit={PAGE_LIMIT}
      bookingsPage={bookingsPage}
    />
  ) : null;

  const listingCreateBookingElement = listing ? (
    <ListingCreateBooking
      bookingsIndex={listing.bookingsIndex}
      host={listing.host}
      viewer={viewer}
      price={listing.price}
      checkOutDate={checkOutDate}
      checkInDate={checkInDate}
      setCheckOutDate={setCheckOutDate}
      setCheckInDate={setCheckInDate}
      setModalVisible={setModalVisible}
    />
  ) : null;

  const listingCreateBookingModalElement = listing && checkInDate && checkOutDate ? (
    <ListingCreateBookingModal
     price={listing?.price}
     checkOutDate={checkOutDate}
      checkInDate={checkInDate}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      />
  ) : null;

  return (
    <>
    <Content className="listing">
      <Row gutter={24} justify="space-between" className="content_row">
        <Col xs={24} lg={14}>
          {listingDetailsElement}
          {listingBookingsElement}
        </Col>
        <Col xs={24} lg={10}>
          {listingCreateBookingElement}
        </Col>
      </Row>
      {listingCreateBookingModalElement}

    </Content>
    <Footer/>
    </>
  );
}
