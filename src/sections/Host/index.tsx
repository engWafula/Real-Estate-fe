import React,{FormEvent, useState} from 'react'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import {
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
  Spin
} from "antd";
import { Viewer } from '../../lib/types';
import { Link } from 'react-router-dom';
import { ListingType } from '../../lib/graphql/globalTypes';
import { UploadChangeParam } from 'antd/lib/upload';
// import FormComponentsProps from "antd/lib/form"
import {
  iconColor,
  displayErrorMessage,
  displaySuccessNotification
} from "../../lib/utils";
import { BankOutlined, HomeOutlined } from '@ant-design/icons';
import {
  HostListing as HostListingData,
  HostListingVariables
} from "../../lib/graphql/mutations/HostListing/__generated__/HostListing";
import { HOST_LISTING } from "../../lib/graphql/mutations";
// import { UploadFile } from 'antd/lib/upload/interface';

const {Content}=Layout
const {Title,Text}=Typography
const {Item}=Form 
interface Props{
  viewer:Viewer
}





export  function Host({viewer}: Props)  {

  const [hostListing, { loading, data }] = useMutation<
  HostListingData,
  HostListingVariables
>(HOST_LISTING, {
  onError: () =>
    displayErrorMessage(
      "Sorry! We were'nt able to create your listing. Please try again later."
    ),
  onCompleted: () => {
    displaySuccessNotification("You've successfully created your listing!");
  }
});

  const [imageLoading,setImageLoading]=useState(false)
  const [fileList, setFileList] =useState<UploadFile[]>([ ])
  const [image,setImage]=useState()
  const [imageBase64Value, setImageBase64Value] = useState<string | null>(null);
  const [baseImage, setBaseImage] = useState("");


  const [form] = Form.useForm();
  

  if(!viewer.id || !viewer.hasWallet){
  return (
    <Content className='host-content'>
    <div className='host__form-header'>
      <Title level={3} className='host__form-title'>You have to be signed in and connect your stripe account to host a listing</Title>
    <Text>
   We only allow users that have signed in and connected thier stripe accounts host a new listing
   You can sign in at  the  <Link to='/login'>/login</Link>  page and connect your stripe account shortly after!!
    </Text>
    </div>
  </Content>
  )
  }

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setImageLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, url => {
        setImageLoading(false);
        setImageBase64Value(url);
      });
    }
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleImageUpload = (info: UploadChangeParam) => {
    const { file } = info;
    if (file.status === "uploading") {
      setImageBase64Value(null);
      setImageLoading(true);
      return;
    }

    if (file.status === "done" && file.originFileObj) {
      getBase64Value(file.originFileObj, (imageBase64Value: string) => {
        setImageBase64Value(imageBase64Value);
        setImageLoading(false);
      });
    }
  };

const handleHostListing=(values: any): void=>{
 
  const fullAddress = `${values.address}, ${values.city}, ${values.state}, ${values.zip}`;
  const input = {
    ...values,
    address: fullAddress,
    image: baseImage,
    price: values.price * 100
  };
  console.log(values) 


  delete input.city;
  delete input.state;
  delete input.zip;

  hostListing({
    variables: {
      input
    }
  });
}

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

const selectedImage=(e: any)=>{
setImage(e.target.files[0])
}

if (data && data.hostListing) {
  return <Redirect to={`/listing/${data.hostListing.id}`} />;
}


const onFinishFailed = ():void => {
  displayErrorMessage("Please fill in all the required fields");
};

const uploadButton = (
  <div>
    {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

const uploadImage = async (e: any) => {
  const file = e.target.files[0];
  const base64:any = await convertBase64(file);
  setBaseImage(base64);
};

const convertBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
  return (
    <Content className='host-content'>
      <Form form={form} layout='vertical' autoComplete='off'  onFinish={handleHostListing}
      onFinishFailed={onFinishFailed}
>
      <div className='host__form-header'>
        <Title level={3} className='host__form-title'>Hi lets get started! Listing your place. </Title>
      <Text>
        In this Form we collect basic information about your listing.
      </Text>
      </div>
      <Item label='Type of the House' hasFeedback name="type" rules={[{ required: true, message: 'Please specify the type' }]}>
      <Radio.Group>
        <Radio.Button value={ListingType.APARTMENT}>
        <BankOutlined  style={{color:iconColor}}/> 
          <span>Apartment</span>
        </Radio.Button>
        <Radio.Button value={ListingType.RENTAL}>
       
        <HomeOutlined style={{color:iconColor}} />
         <span>Rental</span>
        </Radio.Button>
        <Radio.Button value={ListingType.HOSTEL}>
        <BankOutlined  style={{color:iconColor}}/> 
          <span>Hostel</span>
        </Radio.Button>
        <Radio.Button value={ListingType.HOTEL}>
        <BankOutlined  style={{color:iconColor}}/> 
          <span>Hotel</span>
        </Radio.Button>
      </Radio.Group>
      </Item>
      <Item label='Max number of Guests' hasFeedback name="Max number of Guests" extra="All price in $/month" rules={[{ required: true,message: 'Please input number of guests'}]} >
      <InputNumber min={1} placeholder='4'/>
      </Item>
      <Item label='Title' hasFeedback name="Title" extra="Max character count of 45" rules={[{ required: true, message: 'Please input the title!' }]}>
      <Input maxLength={45} placeholder='iconic and luxurious apartment'/>
      </Item>
      <Item label='Description of listing' hasFeedback name="Description of listing" extra="Max character count of 400" rules={[{ required: true, message: 'Please input description' }]}>
      <Input.TextArea rows={4} maxLength={400} placeholder='Modern and Clean  home for everyone in Uganda....'/>
      </Item>
      <Item label='Address' name="Address" hasFeedback  rules={[{ required: true, message: 'Please input the address' }]} >
      <Input  placeholder='luwumu street Kampala'/>
      </Item>
      <Item label='City/Town'  name="city" htmlFor='city' hasFeedback     rules={[{ required: true, message: 'Please input your username!' }]}>
      <Input placeholder='Kampala'/>
      </Item>
      <Item label='district' name="state" htmlFor='state'  hasFeedback rules={[{ required: true, message: 'Please input the district' }]} >
      <Input placeholder='Kampala'/>
      </Item>
      <Item label='Zip code' name="zip" htmlFor='zip' hasFeedback rules={[{ required: true, message: 'Please input zip code' }]} >
      <Input placeholder='please enter a zip code for your listing..'/>
      </Item>
      {/* <Item label='Images have to be 2mbs and below in type of jpg,jpeg and png' hasFeedback name="image" rules={[{ required: true, message: 'Please input image' }]}>
      <div className='host__form-image-upload'>
      <Upload
        showUploadList={false}
        action="http://localhost:3000/"
        listType="picture-card"
        onChange={(e) => {
          uploadImage(e);
        }}  
            beforeUpload={beforeUpload}
      >
         {baseImage ? <img src={baseImage} alt="avatar" style={{ width: '100%' }} /> : null}
      </Upload>
      </div>
      </Item> */}
      <Item label='Images have to be 2mbs and below in type of jpg,jpeg and png' name="image"  hasFeedback rules={[{ required: true, message: 'Please input zip code' }]} >
      <Input type="file"    onChange={(e) => {
          uploadImage(e);
        }}  />
      </Item>
      
      <Item label='Price' extra="All price in $/month" name="price"  hasFeedback rules={[{ required: true, message: 'Please input price' }]}>
      <InputNumber min={0} placeholder='500'/>
      </Item>
      {/* <Item rules={[{ required: true, message: 'Please agree to the terms and conditions' }]} >
      {""}
      <Checkbox>
      I agree to the <Link to='/agreement'>terms and conditions</Link>
      </Checkbox>
      </Item> */}

      <Item >
      <Button block type='primary' htmlType='submit'>Submit</Button>
      </Item>
      </Form>
    </Content>
  )
}


const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const getBase64Value = (
  file: File | Blob,
  callback: (imageBase64Value: string) => void
) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
   callback(reader.result as string);
  };
};



const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

