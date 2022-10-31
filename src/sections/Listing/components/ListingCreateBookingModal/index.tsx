import { Modal, Button, Typography, Divider } from "antd";
import { Viewer } from "../../../../lib/types";
import moment, { Moment } from "moment";
import { KeyOutlined } from "@ant-design/icons";
import { formatListingPrice,displayErrorMessage,displaySuccessNotification} from "../../../../lib/utils";
import { CardElement, injectStripe,ReactStripeElements } from "react-stripe-elements";
import { useMutation } from "@apollo/client";
import { CreateBooking as CreateBookingData, CreateBookingVariables } from "../../../../lib/graphql/mutations/createBooking/__generated__/CreateBooking";
import { CREATE_BOOKING  } from "../../../../lib/graphql/mutations/createBooking";

const { Paragraph, Title, Text } = Typography;

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  price: number;
  checkInDate: Moment;
  checkOutDate: Moment;
  id: string;
  handleListingRefetch: () => Promise<void>;
  clearBookingData: () => void;
}

function ListingCreateBookingModal({
  price,
  checkInDate,
  checkOutDate,
  modalVisible,
  setModalVisible,
  stripe,
  clearBookingData,
  id,
  handleListingRefetch,
}: Props & ReactStripeElements.InjectedStripeProps) {

const [createBooking, { loading }] = useMutation<CreateBookingData, CreateBookingVariables>(CREATE_BOOKING, {
  onCompleted: () => {
    clearBookingData();
    displaySuccessNotification("You've successfully booked the listing!", "Booking history can always be found in your User page.");
    handleListingRefetch();
  },
onError: (error) => {
  displayErrorMessage("Sorry! We weren't able to create your booking. Please try again later!");
  
}
})


  const daysBooked = checkOutDate.diff(checkInDate, "days") + 1;
  const listingPrice = price * daysBooked;
  const TusengukeFee = listingPrice * 0.05;

  const totalPrice = listingPrice + TusengukeFee;

  const handelCreateBooking = async() =>{
    if(!stripe){
        return displayErrorMessage("Sorry We couldn't connect with Stripe")
    }
   let {token:stripeToken,error} =  await stripe.createToken();
   if(stripeToken){
    createBooking({
        variables:{
            input:{
                id,
                source:stripeToken.id,
                checkIn:moment(checkInDate).format("YYYY-MM-DD"),
                checkOut:moment(checkOutDate).format("YYYY-MM-DD")
            }
        }
    })
   }else{
        displayErrorMessage(error && error.message ? error.message : "Sorry We couldn't connect with Stripe")
   }
  }

  return (
    <Modal
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      footer={null}
      centered
    >
      <div className="listing-booking-modal">
        <div className="listing-booking-modal__intro">
          <Title className="listing-booking-modal__intro-title">
            <KeyOutlined />
          </Title>
          <Title level={3} className="listing-booking-modal__intro-title">
            Book Any House
          </Title>
          <Paragraph>
            Enter your payment information to book the listing from the dates
            between{" "}
            <Text mark strong>
              {moment(checkInDate).format("MMMM Do YYYY")}
            </Text>{" "}
            and{" "}
            <Text mark strong>
              {moment(checkOutDate).format("MMMM Do YYYY")}
            </Text>
            , inclusive.
          </Paragraph>
        </div>

        <Divider />
        <div className="listing-booking-modal__charge-summary">
          <Paragraph>
            {formatListingPrice(price, false)} * {daysBooked} days ={" "}
            <Text strong>{formatListingPrice(listingPrice, false)}</Text>
          </Paragraph>

          <Paragraph className="listing-booking-modal__charge-summary-total">
            Total = <Text mark>{formatListingPrice(listingPrice, false)}</Text>
          </Paragraph>
        </div>
        <Divider />
        <div className="listing-booking-modal__stripe-card-section">
            <CardElement hidePostalCode className="listing-booking-modal__stripe-card" />
          <Button
            type="primary"
            size="large"
            className="listing-booking-modal__cta"
            onClick={handelCreateBooking}
            loading={loading}
          >
            Book
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export const WrappedListingCreateBookingModal = injectStripe(
  ListingCreateBookingModal
);
