/*
 * Mimium Pty. Ltd. ("LKG") CONFIDENTIAL
 * Copyright (c) 2022 Mimium project Pty. Ltd. All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of LKG. The intellectual and technical concepts contained
 * herein are proprietary to LKG and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from LKG.  Access to the source code contained herein is hereby forbidden to anyone except current LKG employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 */
import React from "react";
import { Col, Row, Image, Container } from "react-bootstrap";

interface CollageProps {
  images: string[];
}

export const Collage: React.FC<CollageProps> = ({ images }) => {
  return (
    <Container fluid>
      <Row className="g-3">
        {images.map((image, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index}>
            <div className="position-relative">
              <Image
                src={image}
                alt={`Collage Image ${index + 1}`}
                fluid
                className="rounded-3"
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
