/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ListingType {
  COMMERCIAL = "COMMERCIAL",
  RESIDENTIAL = "RESIDENTIAL",
}

export enum ListingsFilter {
  PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW",
  PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH",
}

export interface ConnectStripeInput {
  code: string;
}

export interface HostListingInput {
  title: string;
  description: string;
  image: string;
  type: ListingType;
  address: string;
  price: number;
  numOfGuests: number;
}

export interface LogInInput {
  code: string;
}

export interface createBookingInput {
  id: string;
  source: string;
  checkIn: string;
  checkOut: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
