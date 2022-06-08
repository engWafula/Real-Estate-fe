import React from "react";
import { Card, Col, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";

import entebbeImage from "../../assets/entebbe.jpg";
import kampalaImage from "../../assets/kampala.jpg";
import guluImage from "../../assets/gulu.jpg";
import jinjaImage from "../../assets/jinja.jpg";


const { Title } = Typography;
const { Search } = Input;


interface Props{
    onSearch: (value: string) => void;
  }
  

export function HomeHero({onSearch}:Props) {
  return (
    <div className="home-hero">
      <div className="home-hero__search">
        <Title className="home-hero__title">
          Find a Place you'll love to stay
        </Title>
        <Search
          placeholder='Search "Kampala"'
          size="large"
          enterButton="Search"
          className="home-hero__search-input"
          onSearch={onSearch}
        />
      </div>

      <Row gutter={12} className="home-hero__cards">
        <Col xs={12} md={6}>
            <Link to="/listings/kampala">
          <Card cover={<img src={kampalaImage} alt="kampala" />}>Kampala</Card>
          </Link>
        
        </Col>
        <Col xs={12} md={6}>
        <Link to="/listings/entebbe">
          <Card cover={<img src={entebbeImage} alt="entebbe" />}>Entebbe</Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
        <Link to="/listings/gulu">
          <Card cover={<img src={guluImage}  alt="gulu"/>}>Gulu</Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
        <Link to="/listings/jinja">
          <Card cover={<img src={jinjaImage} alt="jinja" />}>Jinja</Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
}
