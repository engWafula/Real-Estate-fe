import { Typography, Card, Divider, Button, DatePicker } from "antd";
import { displayErrorMessage, formatListingPrice } from "../../../../lib/utils";
import moment,{Moment} from "moment"
import { Viewer } from "../../../../lib/types";
import { Listing as ListingData } from "../../../../lib/graphql/queries/Listing/__generated__/Listing";
import { BookingsIndex } from "./types";
const { Paragraph, Title, Text } = Typography;

interface Props {
  bookingsIndex: ListingData["listing"]["bookingsIndex"];
  host: ListingData["listing"]["host"];
  viewer: Viewer;
  price: number;
  checkInDate: Moment | null;
  checkOutDate: Moment | null;
  setCheckInDate: (checkInDate: Moment | null) => void;
  setCheckOutDate: (checkOutDate: Moment | null) => void;
  setModalVisible: (modalVisible: boolean) => void;
}

export function ListingCreateBooking({
  setModalVisible,
  bookingsIndex,
  viewer,
  host,
  price,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}: Props) {
  const bookingsIndexJSON:BookingsIndex = JSON.parse(bookingsIndex);
 
  const dateIsBooked = (currentDate: Moment) => {
  const year = moment(currentDate).year();
  const month = moment(currentDate).month();
  const day = moment(currentDate).date();

  if(bookingsIndexJSON[year] && bookingsIndexJSON[year][month]){
    return Boolean(bookingsIndexJSON[year][month][day]);
  }else{
    return false;
  }
  }

  const disabledDate = (currentDate: Moment) => {
    if(currentDate){
     const dateIsBeforeEndOfDay = currentDate.isBefore(moment().endOf("day"));
     return dateIsBeforeEndOfDay || dateIsBooked(currentDate);
    }
    else{
      return false
    }

  }

  const verifyAndSetCheckOutDate=(selectedCheckOutDate:Moment|null)=>{
    if(checkInDate && selectedCheckOutDate){
      if(moment(selectedCheckOutDate).isBefore(checkInDate,"days")){
  return displayErrorMessage("You can't  check out anything before the day of checkout,Choose another date please!!");
      }
      let dateCursor = checkInDate;
      while(moment(dateCursor).isBefore(selectedCheckOutDate,"days")){
        dateCursor = moment(dateCursor).add(1,"days");
        const year = moment(dateCursor).year();
        const month = moment(dateCursor).month();
        const day = moment(dateCursor).date();
        if(bookingsIndexJSON[year] && bookingsIndexJSON[year][month] && bookingsIndexJSON[year][month][day]){
          return  displayErrorMessage("You can't book a period of time that overlaps existing bookings.Please try again!!")
        }
      }

    }
    setCheckOutDate(selectedCheckOutDate);
  }

 const viewerIsHost = viewer.id === host.id;

const checkInInputDisabled = !viewer.id  || viewerIsHost || !host.hasWallet;
const checkOutInputDisabled =checkInInputDisabled || !checkInDate
const buttonDisabled= checkOutInputDisabled || !checkInDate || !checkOutDate
let buttonMessage = "You will not be charged yet"

if(!viewer.id){
  buttonMessage="You have to be signed in to book a listing"
}
else if(viewerIsHost){
  buttonMessage="You can't book your own listing"
}
else if(!host.hasWallet){
  buttonMessage="The host has disconnected from Stripe and thus won't be able to receive payments"
}

  return (
    <div className="listing-booking">
      <Card className="listing-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-booking__card-title">
              {formatListingPrice(price)}
              <span>/month</span>
            </Title>
          </Paragraph>
          <Divider />
          <div className="listing-booking__card-date-picker">
            <Paragraph strong> Check In</Paragraph>
            <DatePicker
            value={checkInDate?checkInDate:undefined}
            onChange={(dateValue)=>setCheckInDate(dateValue)}
            format={"YYYY/MM/DD"}
            showToday={false}
            disabled={checkInInputDisabled}
            disabledDate={disabledDate}
            onOpenChange={()=>setCheckOutDate(null)}
            />
          </div>

          <div className="listing-booking__card-date-picker">
            <Paragraph strong> Check Out</Paragraph>
            <DatePicker 
            value={checkOutDate?checkOutDate:undefined}
            onChange={(checkOutDate)=>verifyAndSetCheckOutDate(checkOutDate)}
            format={'YYYY/MM/DD'}
            disabledDate={disabledDate}
            showToday={false}
            disabled={checkOutInputDisabled}
            />
          </div>
        </div>
        <Divider />
        <Button
          size="large"
          type="primary"
          className="listing-booking__card-cta"
          disabled={buttonDisabled}
          onClick={() => setModalVisible(true)}
        >
          Request To Book
        </Button>
        <Text type="secondary" mark>{buttonMessage}</Text>
      </Card>
    </div>
  );
}
