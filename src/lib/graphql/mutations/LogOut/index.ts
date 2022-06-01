import {gql} from "graphql-tag"

export const LOG_OUT = gql`
mutation LogOut {
    logOut {
        token
        id
        avatar
        didRequest
        hasWallet
    }
}
`