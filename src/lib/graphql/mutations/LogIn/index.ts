import {gql} from "graphql-tag"

export const LOG_IN = gql`
mutation LogIn($input: LogInInput) {
    logIn(input: $input) {
        token
        id
        avatar
        didRequest
        hasWallet
    }
}
`