import React from 'react'
import {
  Layout,
  Typography,
  Form,
  Input,
  InputNumber,
  Radio,
  Upload,
  Button
} from "antd";
import { Viewer } from '../../lib/types';
import { Link } from 'react-router-dom';
import { ListingType } from '../../lib/graphql/globalTypes';
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

export  function Host({viewer}:Props) {

  // if(!viewer.id || !viewer.hasWallet){
  // return (
  //   <Content className='host-content'>
  //   <div className='host__form-header'>
  //     <Title level={3} className='host__form-title'>You have to be signed in and connect your stripe account to host a listing</Title>
  //   <Text>
  //  We only allow users that have signed in and connected thier stripe accounts host a new listing
  //  You can sign in at  the  <Link to='/login'>/login</Link>  page and connect your stripe account shortly after!!
  //   </Text>
  //   </div>
  // </Content>
  // )
  // }
  return (
    <Content className='host-content'>
      <Form layout='vertical'>
      <div className='host__form-header'>
        <Title level={3} className='host__form-title'>Hi lets get started! Listing your place. </Title>
      <Text>
        In this Form we collect basic information about your listing.
      </Text>
      </div>
      <Item label='Type of the House' >
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
      <Item label='Title' extra="Max character count of 45">
      <Input maxLength={45} placeholder='iconic and luxurious apartment'/>
      </Item>
      <Item label='Description of listing' extra="Max character count of 400">
      <Input.TextArea rows={4} maxLength={400} placeholder='Modern and Clean home for everyone in Uganda....'/>
      </Item>
      <Item label='Address' >
      <Input  placeholder='luwumu street Kampala'/>
      </Item>
      <Item label='City/Town' >
      <Input placeholder='Kampala'/>
      </Item>
      <Item label='district' >
      <Input placeholder='Kampala'/>
      </Item>
      <Item label='Zip code' >
      <Input placeholder='please enter a zip code for your listing..'/>
      </Item>
      <Item label='Images have to be 2mbs and below in type of jpg,jpeg and png' >
      <div className='host__form-image-upload'>
      <Upload
      name='image'
      listType='picture-card'
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeImageUpload}
      />
      </div>
      </Item>
      
      <Item label='Price' extra="All price in $/month" >
      <InputNumber min={0} placeholder='500'/>
      </Item>
      </Form>
    </Content>
  )
}


const beforeImageUpload = (file:File) => {
  const validImageTypes = file.type=='image/jpeg' || file.type==='image/png' || file.type==='image/jpg'
  const fileIsValid=file.size/1024/1024 <1

  if(!validImageTypes){
    return false
  }

  if(!fileIsValid){
    return false
  }

  return validImageTypes && fileIsValid
}