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
