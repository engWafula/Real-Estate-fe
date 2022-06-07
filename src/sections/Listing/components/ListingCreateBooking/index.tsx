import { Typography, Card, Divider, Button, DatePicker } from "antd";
import { displayErrorMessage, formatListingPrice } from "../../../../lib/utils";
import moment,{Moment} from "moment"

const { Paragraph, Title, Text } = Typography;

interface Props {
  price: number;
  checkInDate: Moment | null;
  checkOutDate: Moment | null;
  setCheckInDate: (checkInDate: Moment | null) => void;
  setCheckOutDate: (checkOutDate: Moment | null) => void;
}

export function ListingCreateBooking({
  price,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}: Props) {

  const disabledDate = (currentDate: Moment) => {
    if(currentDate){
     const dateIsBeforeEndOfDay = currentDate.isBefore(moment().endOf("day"));
     return dateIsBeforeEndOfDay;
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

    }
    setCheckOutDate(selectedCheckOutDate);
  }

const checkInputDisabled =!checkInDate
const buttonDisabled=!checkInDate || !checkOutDate

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
            disabled={checkInputDisabled}
            />
          </div>
        </div>
        <Divider />
        <Button
          size="large"
          type="primary"
          className="listing-booking__card-cta"
          disabled={buttonDisabled}
        >
          Request To Book
        </Button>
      </Card>
    </div>
  );
}
