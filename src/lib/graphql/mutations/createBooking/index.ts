import {gql} from "graphql-tag"


export const CREATE_BOOKING = gql`
    mutation CreateBooking($input: createBookingInput!) {
        createBooking(input: $input) {
            id
        }
    }`