import React from "react";

function About() {
  return (
    <div className="about">
      <h1 className="about-header">About our company</h1>
      <p className="about-p">
        ISO Property's approach to business is unique. It's not just about
        buying or selling real estate; it is about trust, it is about the way we
        conduct our business that makes us different from our competitors and
        makes our customers return to us again and again. We are committed to
        providing you with a personal and professional service, underpinned by a
        committed approach to getting the job done with honesty and integrity.
      </p>

      <p className="about-p">
        Buying or selling your home is one of the most financially important
        decisions you will ever encounter. We strive to alleviate any
        uncertainties and concerns you have during the process. Please feel free
        to contact us to discuss your real estate needs.
      </p>
      <p className="about-p">Broker cooperation always welcomed.</p>
      <p className="about-p">
        Member of the National Association of REALTORS<br></br> Member of New
        York State Association of REALTORS<br></br>Member of the Hudson
        GatewayAssociation of REALTORS
      </p>
      <h1 className="agents-header">Our Agents</h1>
      <div className="agents">
        <img
          className="agent-img"
          src="https://frugalfrolicker.com/wp-content/uploads/2014/06/top-of-the-rock-1.jpg"
          alt="address"
        />
        <div className="agent-info">
          <p>
            <b>Name:</b>Isaac Oserin
          </p>
          <p>
            <b>Email:</b>
            <span className="agent-email">isaac@isoproperty.com</span>
          </p>
          <p>
            <b>Phone: 212-252-2704</b>
          </p>
          <p>
            <b>Mobile: 917-733-6686</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
