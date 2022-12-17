import React, { FormEvent, useState } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import {
  Modal,
  Layout,
  message,
  Typography,
  Form,
  Input,
  InputNumber,
  Radio,
  Upload,
  Button,
  Checkbox,
  Spin,
} from "antd";
import { Viewer } from "../../lib/types";
import { Link } from "react-router-dom";
import { ListingType } from "../../lib/graphql/globalTypes";
import { UploadChangeParam } from "antd/lib/upload";
 import FormComponentsProps from "antd/lib/form"
import {
  iconColor,
  displayErrorMessage,
  displaySuccessNotification,
} from "../../lib/utils";
import { BankOutlined, HomeOutlined } from "@ant-design/icons";
import {
  HostListing as HostListingData,
  HostListingVariables,
} from "../../lib/graphql/mutations/HostListing/__generated__/HostListing";
import { HOST_LISTING } from "../../lib/graphql/mutations";
// import { UploadFile } from 'antd/lib/upload/interface';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Item } = Form;
interface Props {
  viewer: Viewer;
}

export function Host({ viewer }: Props) {
  const [hostListing, { loading, data }] = useMutation<
    HostListingData,
    HostListingVariables
  >(HOST_LISTING, {
    onError: (error) =>{
      console.log("Cannot host a listing=====>",error)
      displayErrorMessage(
        "Sorry! We were'nt able to create your listing. Please try again later."
      )
    },
    onCompleted: () => {
      displaySuccessNotification("You've successfully created your listing!");
    },
  });


  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [type,setType] = useState('')
  const [title,setTitle] = useState("")
  const [address,setAddress] = useState("")
  const [desc,setDesc] = useState("")
  const [city,setCity] = useState("")
  const [state,setState] = useState("")
  const [zip,setZip] = useState("")
  const [price,setPrice] = useState("")
  const [guest,setGuest] = useState("")
  console.log(type,title,address,desc,city,state,zip,price,guest,fileList)

  const [form] = Form.useForm();


  if (!viewer.id || !viewer.hasWallet) {
    return (
      <Content className="host-content">
        <div className="host__form-header">
          <Title level={3} className="host__form-title">
            You have to be signed in and connect your stripe account to host a
            listing
          </Title>
          <Text>
            We only allow users that have signed in and connected thier stripe
            accounts host a new listing You can sign in at the{" "}
            <Link to="/login">/login</Link> page and connect your stripe account
            shortly after!!
          </Text>
        </div>
      </Content>
    );
  }

  const handleHostListing = (e:FormEvent):void => {
    e.preventDefault()
          // @ts-ignore

    const input = {
      address: city,
      image: fileList[0].thumbUrl,
      price: parseInt(price) * 100,
      title:title,
      type:type,
      numOfGuests:parseInt(guest),
      description:desc,
    };



     hostListing({
     variables: {
      // @ts-ignore
       input
       }
    });
  };

  if (loading) {
    return (
      <Content className="host-content">
        <div className="host__form-header">
          <Title level={3} className="host__form-title">
            Please wait!
          </Title>
          <Text type="secondary">We're creating your listing now.</Text>
        </div>
      </Content>
    );
  }

  if(data && data.hostListing){
    return <Redirect to={`/listing/${data.hostListing.id}`}/>
  }


  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Content className="host-content">
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"

      >
        <div className="host__form-header">
          <Title level={3} className="host__form-title">
            Hi lets get started! Listing your place.{" "}
          </Title>
          <Text>
            In this Form we collect basic information about your listing.
          </Text>
        </div>
        <Item
          label="Type of the House"
          hasFeedback
          name="type"
          rules={[{ required: true, message: "Please specify the type" }]}
        >
          <Radio.Group >
            <Radio.Button value={ListingType.COMMERCIAL} onChange={e => setType(e.target.value)}>
              <BankOutlined style={{ color: iconColor }} />  <span>Commercial</span>
            </Radio.Button>
            <Radio.Button value={ListingType.RESIDENTIAL} onChange={e => setType(e.target.value)}>
              <HomeOutlined style={{ color: iconColor }}  />  <span>Residential</span>
            </Radio.Button>
          </Radio.Group>
        </Item>
        <Item
          label="Title"
          hasFeedback
          name="title"
          extra="Max character count of 45"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input onChange={e=>setTitle(e.target.value)} maxLength={45} placeholder="iconic and luxurious apartment" />
        </Item>
        <Item
          label="Description of listing"
          hasFeedback
          name="description"
          extra="Max character count of 400"
          rules={[{ required: true, message: "Please input description" }]}
        >
          <Input.TextArea
          onChange={e=>setDesc(e.target.value)}
            rows={4}
            maxLength={400}
            placeholder="Modern and Clean  home for everyone in Uganda...."
          />
        </Item>
        <Item
          label="Address"
          name="address"
          hasFeedback
          rules={[{ required: true, message: "Please input the address" }]}
        >
          <Input onChange={e=>setAddress(e.target.value)} placeholder="luwumu street Kampala" />
        </Item>
        <Item
          label="City/Town"
          name="city"
          htmlFor="city"
          hasFeedback
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input onChange={e=>setCity(e.target.value)} placeholder="Kampala" />
        </Item>
        <Item
          label="district"
          name="state"
          htmlFor="state"
          hasFeedback
          rules={[{ required: true, message: "Please input the district" }]}
        >
          <Input  onChange={e=>setState(e.target.value)} placeholder="Kampala" />
        </Item>
        <Item
          label="Zip code"
          name="zip"
          htmlFor="zip"
          hasFeedback
          rules={[{ required: true, message: "Please input zip code" }]}
        >
          <Input onChange={e=>setZip(e.target.value)} placeholder="please enter a zip code for your listing.." />
        </Item>
        <Item
          label="Images have to be 2mbs and below in type of jpg,jpeg and png"
          hasFeedback
          name="image"
          rules={[{ required: true, message: "Please input image" }]}
        >
          <div className="host__form-image-upload">
          <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      <Modal  title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
          </div>
        </Item>

        <Item
          label="Price"
          extra="All price in $/month"
          name="price"
          hasFeedback
          rules={[{ required: true, message: "Please input price" }]}
        >
          <Input onChange={e=>setPrice(e.target.value)} placeholder="500" />
        </Item>
        <Item
          label="Max Number of Guests"
          name="guests"
          hasFeedback
          rules={[{ required: true, message: "Please Enter the max number of guests" }]}
        >
          <Input onChange={e=>setGuest(e.target.value)}  placeholder="4" />
        </Item>
        <Item
        name="terms"
        hasFeedback
        >
          {""}
          <Checkbox value='terms'>
            I agree to the <Link to="/agreement">terms and conditions</Link>
          </Checkbox>
        </Item>

        <Item>
          <Button block type="primary" htmlType="submit" onClick={handleHostListing}>
            Submit
          </Button>
        </Item>
      </Form>
    </Content>
  );
}

// const beforeImageUpload = (file: File): boolean => {
//   const fileIsValidImage =
//     file.type === "image/jpeg" ||
//     file.type === "image/png" ||
//     file.type === "image/webp";
//   const fileIsValidSize = file.size / 1024 / 1024 < 1;

//   if (!fileIsValidImage) {
//     displayErrorMessage("You're only able to upload valid JPG or PNG files!");
//   }

//   if (!fileIsValidSize) {
//     displayErrorMessage(
//       "You're only able to upload valid image files of under 1MB in size!"
//     );
//   }

//   return fileIsValidImage && fileIsValidSize;
// };

// const getBase64Value = (
//   file: File | Blob,
//   callback: (imageBase64Value: string) => void
// ): void => {
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => {
//     if (typeof reader.result === "string") callback(reader.result);
//   };
// };


const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });


