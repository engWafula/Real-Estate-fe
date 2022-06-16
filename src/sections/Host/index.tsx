import React,{useState} from 'react'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import {
  PlusOutlined
} from '@ant-design/icons';
import {
  Layout,
  Typography,
  Form,
  Input,
  InputNumber,
  Radio,
  Upload,
  Button,
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

const {Content}=Layout
const {Title,Text}=Typography
const {Item}=Form 
interface Props{
  viewer:Viewer
}

export  function Host({viewer}: Props)  {

  // const [imageLoading,setImageLoading]=useState(false)
  const [fileList, setFileList] =useState<UploadFile[]>([ ])
  const [form] = Form.useForm();
  console.log(fileList)

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

const handleSubmit=()=>{

}

  return (
    <Content className='host-content'>
      <Form  form={form} layout='vertical'  onFinish={handleSubmit}>
      <div className='host__form-header'>
        <Title level={3} className='host__form-title'>Hi lets get started! Listing your place. </Title>
      <Text>
        In this Form we collect basic information about your listing.
      </Text>
      </div>
      <Item label='Type of the House'         rules={[{ required: true, message: 'Please specify the type' }]}>
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
      <Item label='Max number of Guests' extra="All price in $/month" rules={[{ required: true }]} >
      <InputNumber min={1} placeholder='4'/>
      </Item>
      <Item label='Title' extra="Max character count of 45"      rules={[{ required: true, message: 'Please input the title!' }]}>
      <Input maxLength={45} placeholder='iconic and luxurious apartment'/>
      </Item>
      <Item label='Description of listing' extra="Max character count of 400"         rules={[{ required: true, message: 'Please input description' }]}>
      <Input.TextArea rows={4} maxLength={400} placeholder='Modern and Clean  home for everyone in Uganda....'/>
      </Item>
      <Item label='Address'         rules={[{ required: true, message: 'Please input the address' }]} >
      <Input  placeholder='luwumu street Kampala'/>
      </Item>
      <Item label='City/Town'         rules={[{ required: true, message: 'Please input your username!' }]}>
      <Input placeholder='Kampala'/>
      </Item>
      <Item label='district' rules={[{ required: true, message: 'Please input the district' }]} >
      <Input placeholder='Kampala'/>
      </Item>
      <Item label='Zip code' rules={[{ required: true, message: 'Please input zip code' }]} >
      <Input placeholder='please enter a zip code for your listing..'/>
      </Item>
      <Item label='Images have to be 2mbs and below in type of jpg,jpeg and png' rules={[{ required: true, message: 'Please input image' }]}>
      <div className='host__form-image-upload'>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        beforeUpload={beforeImageUpload}
      >
     {fileList.length < 5 && '+ Upload'}
      </Upload>
      </div>
      </Item>
      
      <Item label='Price' extra="All price in $/month" >
      <InputNumber min={0} placeholder='500'/>
      </Item>

      <Item >
      <Button type='primary'>Submit</Button>
      </Item>
      </Form>
    </Content>
  )
}


const beforeImageUpload = (file:File) => {
  const validImageTypes = file.type==='image/jpeg' || file.type==='image/png' || file.type==='image/jpg'
  const fileIsValid=file.size/1024/1024 <1

  if(!validImageTypes){
    displayErrorMessage("You're only able to upload valid JPG or PNG files!");
  }

  if(!fileIsValid){
    displayErrorMessage(
      "You're only able to upload valid image files of under 1MB in size!"
    );
  }

  return validImageTypes && fileIsValid
}


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



