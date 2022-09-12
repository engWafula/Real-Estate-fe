import { Typography } from "antd";
import { useState } from "react";
import Modal from "../../lib/components/Modal";
import "./footer.css";

const { Title } = Typography;

export const Footer = () =>{
  const [modalOpen, setModalOpen] = useState(false);

  return  (
    <>
    {modalOpen && <Modal setOpenModal={setModalOpen} />}

  <div className="gpt3__footer section__padding">
    <div className="gpt3__footer-heading">
      <Title level={4} className="footer-title">
        Flexibilty in Finding a New Home
      </Title>
    </div>

    <div className="gpt3__footer-btn">
      <button
              onClick={() => {
                setModalOpen(true);
              }}
        className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button"
      >
        Contact Us
      </button>
    </div>

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <h4>
          Senguka <br /> All Rights
          Reserved
        </h4>
      </div>
      <div className="gpt3__footer-links_div">
        <h3>Links</h3>
        <h4>Overons</h4>
        <h4>Social Media</h4>
        <h4>Counters</h4>
        <h4>Contact</h4>
      </div>
      <div className="gpt3__footer-links_div">
        <h3>Company</h3>
        <h4>Terms & Conditions </h4>
        <h4>Privacy Policy</h4>
        <h4>Contact</h4>
      </div>
      <div className="gpt3__footer-links_div">
        <h3>Get in touch</h3>
        <h4>Makerere </h4>
        <h4>0708832767</h4>
        <h4>info@senguka.com</h4>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <h4>@2022 Senguka. All rights reserved.</h4>
    </div>
  </div>
  </>
)};
