import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../components/NavBar";
import navBoxStyles from "../../styles/Layout.module.css";
// Components
import TradeUploadButton from "../../components/dashboard/TradeUploadButton";

// Skeleton loader component
const SkeletonLoader = ({ width, height }) => (
  <div
    style={{
      width,
      height,
      backgroundColor: "#e0e0e0",
      borderRadius: "4px",
      marginBottom: "1rem",
    }}></div>
);

const AppView = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Replace with actual data fetching logic
  }, []);

  return (
    <>
      <NavBar />
      <Container fluid className="p-4">
        <h4 className="mb-5">Hi, Welcome back 👋</h4>

        <Row className="g-3 mb-4 mt-2">
          {loading ? (
            [...Array(4)].map((_, index) => (
              <Col xs={12} sm={6} md={3} key={index}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <SkeletonLoader width="100%" height="2rem" />
                    <SkeletonLoader width="60%" height="2rem" />
                    <SkeletonLoader width="80%" height="2rem" />
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <>
              <Col xs={12} sm={6} md={3}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <Card.Title>Weekly Sales</Card.Title>
                    <i className="fa-solid fa-dollar-sign fa-2x mb-2"></i>
                    <Card.Text>$714,000</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} sm={6} md={3}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <Card.Title>New Users</Card.Title>
                    <i className="fa-solid fa-users fa-2x mb-2"></i>
                    <Card.Text>1,352,831</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} sm={6} md={3}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <Card.Title>Item Orders</Card.Title>
                    <i className="fa-solid fa-box fa-2x mb-2"></i>
                    <Card.Text>1,723,315</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} sm={6} md={3}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <Card.Title>Bug Reports</Card.Title>
                    <i className="fa-solid fa-exclamation-triangle fa-2x mb-2"></i>
                    <Card.Text>234</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>

    
       

        <Row className="g-3 mb-4">
          {loading ? (
            <>
              <Col xs={12} md={6} lg={8}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <SkeletonLoader width="100%" height="15rem" />
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <SkeletonLoader width="100%" height="15rem" />
                  </Card.Body>
                </Card>
              </Col>
            </>
          ) : (
            <>
              <Col xs={12} md={6} lg={8}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <Card.Title>Conversion Rates</Card.Title>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <TradeUploadButton/>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>

        <Row className="g-3 mb-4">
          {loading ? (
            <>
              <Col xs={12} md={6} lg={8}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <SkeletonLoader width="100%" height="15rem" />
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <SkeletonLoader width="100%" height="15rem" />
                  </Card.Body>
                </Card>
              </Col>
            </>
          ) : (
            <>
              <Col xs={12} md={6} lg={8}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <Card.Title>News Update</Card.Title>
                    <ListGroup>
                      {[...Array(5)].map((_, index) => (
                        <ListGroup.Item
                          key={index}
                          className="border-0 rounded-3">
                          <div>News Title {index + 1}</div>
                          <div>News Description goes here</div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <Card.Title>Order Timeline</Card.Title>
                    <ListGroup>
                      {[...Array(5)].map((_, index) => (
                        <ListGroup.Item
                          key={index}
                          className="border-0 rounded-3">
                          Order event {index + 1}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>

        <Row className="g-3 mb-4">
          {loading ? (
            <>
              <Col xs={12} md={6} lg={4}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <SkeletonLoader width="100%" height="15rem" />
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6} lg={8}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <SkeletonLoader width="100%" height="15rem" />
                  </Card.Body>
                </Card>
              </Col>
            </>
          ) : (
            <>
              <Col xs={12} md={6} lg={4}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <Card.Title>Traffic by Site</Card.Title>
                    <ListGroup>
                      <ListGroup.Item className="border-0 rounded-3">
                        <i className="fa-brands fa-facebook-f me-2"></i>{" "}
                        FaceBook: 323,234
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 rounded-3">
                        <i className="fa-brands fa-google me-2"></i> Google:
                        341,212
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 rounded-3">
                        <i className="fa-brands fa-linkedin-in me-2"></i>{" "}
                        LinkedIn: 411,213
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 rounded-3">
                        <i className="fa-brands fa-twitter me-2"></i> Twitter:
                        443,232
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6} lg={8}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body>
                    <Card.Title>Tasks</Card.Title>
                    <ListGroup>
                      {[...Array(5)].map((_, index) => (
                        <ListGroup.Item
                          key={index}
                          className="border-0 rounded-3">
                          <i className="fa-solid fa-check me-2"></i> Task{" "}
                          {index + 1}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default AppView;
