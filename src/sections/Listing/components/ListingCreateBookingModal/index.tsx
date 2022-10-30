import { Modal,Button,Typography,Divider } from "antd";
import { Viewer } from "../../../../lib/types";
import moment, { Moment } from "moment";
import { KeyOutlined } from "@ant-design/icons";
import { formatListingPrice } from "../../../../lib/utils";


const { Paragraph, Title, Text } = Typography;

interface Props {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
    price: number;
    checkInDate: Moment ;
    checkOutDate: Moment ;
}

export function ListingCreateBookingModal({price,checkInDate,checkOutDate, modalVisible, setModalVisible }: Props) {
   const daysBooked = checkOutDate.diff(checkInDate,"days") + 1;
    const listingPrice = price * daysBooked;
    const TusengukeFee = listingPrice * 0.05;

    const totalPrice = listingPrice + TusengukeFee;

    return (
        <Modal
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
            centered
        >
            <div className="listing-booking-modal">
                <div className="listing-booking-modal__intro">
                    <Title  className="listing-booking-modal__intro-title">
                        <KeyOutlined/>
                    </Title>
                    <Title level={3} className="listing-booking-modal__intro-title">
                        Book Any House
               </Title>
               <Paragraph>
                     Enter your payment information to book the listing from the dates between{" "}
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
                        {formatListingPrice(price,false)} * {daysBooked} days ={" "}
                        <Text strong>{formatListingPrice(listingPrice,false)}</Text>
                    </Paragraph>

                    <Paragraph className="listing-booking-modal__charge-summary-total">
                        Total = <Text mark>{formatListingPrice(listingPrice,false)}</Text>
                    </Paragraph>

             </div>
                <Divider />
                <div className="listing-booking-modal__stripe-card-section">
                    <Button type="primary" size="large" className="listing-booking-modal__cta">
                        Book
                    </Button>
                    </div>
             </div>

        </Modal>

    );
}

