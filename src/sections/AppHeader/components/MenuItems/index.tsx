import React from 'react'
import { Button,Menu ,Avatar} from 'antd'
import { useMutation } from '@apollo/client';
import Icon, { HomeOutlined ,LogoutOutlined} from '@ant-design/icons';
import { LOG_OUT } from "../../../../lib/graphql/mutations";
import { LogOut as LogoutData } from "../../../../lib/graphql/mutations/LogOut/__generated__/LogOut";

import { Viewer } from '../../../../lib/types';
import {
  displaySuccessNotification,
  displayErrorMessage
} from "../../../../lib/utils";

import { Link } from 'react-router-dom'

const {SubMenu,Item} =Menu

interface Props{
    viewer:Viewer,
    setViewer:(viewer:Viewer)=>void
}

export  function MenuItems({viewer,setViewer}:Props) {

  const [logout] = useMutation<LogoutData>(LOG_OUT, {
    onCompleted: data => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        // sessionStorage.removeItem("token");
        displaySuccessNotification("You 've successfully logged out!");
      }
    },
    onError: () => {
      displayErrorMessage(
        "Sorry we were'nt able to log you out. Please try again later!"
      );
    }
  });


  const handleLogOut=()=>{
    logout();
  }

  const subMenuLogin =
  viewer.id && viewer.avatar ? (
    <SubMenu title={<Avatar src={viewer.avatar} />}>
      <Item key="/user">
        <Link to={`/user/${viewer.id}`}>
          {/* <Icon type="user" /> */}
          Profile
        </Link>
      </Item>
      <Item key="/logout">
        <div onClick={handleLogOut} >
        <LogoutOutlined /> Log Out
        </div>
      </Item>
    </SubMenu>
  ) : (
    <Item>
      <Link to="/login">
        <Button type="primary">Sign In</Button>
      </Link>
    </Item>
  );

  return (
    <Menu mode='horizontal' selectable={false} className="menu">
          <Item key="/host">
        <Link to="/host">
          <HomeOutlined />    Host
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  )
}
