import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import navBoxStyles from "../../styles/Layout.module.css";
import utilStyles from "../../styles/utils/utils.module.css"
// Components
import TradeUploadButton from "../../components/dashboard/TradeUploadButton";
import TradeUploadList from "../../components/dashboard/TradeUploadList";
import FileNameList from "../../components/dashboard/FileNameList";
import SearchBar from "../../components/dashboard/SearchBar"
import {
  useCurrentUser,
 
} from "../../contexts/CurrentUserContext"

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
  const currentUser = useCurrentUser();

  const [loading, setLoading] = useState(true);
  const [uploadTrigger, setUploadTrigger] = useState(false);
  const [fileNames, setFileNames] = useState([]); // State for file names
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [allProcessed, setAllProcessed] = useState(false);

  const fetchFileNames = async () => {
    setIsLoadingFiles(true);
    try {
      const response = await axios.get("filenames/");
      if (Array.isArray(response.data.results)) {
        setFileNames(response.data.results);
      } else {
        console.error("Expected an array but got:", response.data.results);
      }
    } catch (error) {
      console.error("Error fetching file names:", error);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleUploadSuccess = () => {
    setUploadTrigger((prev) => !prev); // Toggle the state to trigger refresh
    fetchFileNames();
  };

  const handleDeleteSuccess = () => {
    setUploadTrigger((prev) => !prev); // Toggle the state to trigger refresh
    fetchFileNames();
  };

  useEffect(() => {
    // Simulate data loading
    fetchFileNames();
    setTimeout(() => {
      setLoading(false);
    }, 500); 
  }, []);

  return (
    <>
      
      <Container fluid className="p-4">
        <h4 className="mb-5">Hi, Welcome back {currentUser?.username} 👋</h4>

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
                    <SearchBar/>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 bg-light`}
                
                >
                  <Card.Body className="d-flex p-0 h-100">
               
                    {/* Flex and full height */}
                    <div style={{ flex: 1, width: "100%", height: "100%" }}>
                  
                      {/* Container for the button */}
                      <TradeUploadButton
                        onUploadSuccess={handleUploadSuccess}
                        isMatchingInProgress={!allProcessed}
                        style={{ width: "100%", height: "100%" }} // Fill parent container
                      />
                    </div>
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
                    {/* <Card.Title>News Update</Card.Title> */}
                    <TradeUploadList
                      trigger={uploadTrigger}
                      allProcessed={allProcessed}
                      setAllProcessed={setAllProcessed}
                    />
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Card
                  className={`text-center shadow-sm border-0 rounded-3 ${navBoxStyles.BorderRadius}`}>
                  <Card.Body className={`p-2 overflow-auto ${utilStyles.bottomBar}`}>
              
                    {/* Added padding */}
                    <div className="d-flex flex-column">
                 
                      {/* Ensures content stacks properly */}
                      <FileNameList
                        fileNames={fileNames}
                        onDeleteSuccess={handleDeleteSuccess}
                      />
                    </div>
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
