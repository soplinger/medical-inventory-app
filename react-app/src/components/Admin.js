import React, { useEffect, useState } from "react";
import { isAdmin } from "../api/api";
import Navigation from "./Navigation";
import { Modal, Button, Container, Row, Col, Card } from "react-bootstrap"; // Import necessary Bootstrap components
import Register from "./Register"; // Import the Register component

const AdminPanel = () => {
  const [adminStatus, setAdminStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const result = await isAdmin();
      if (result.isAdmin) {
        setAdminStatus(true);
      }
    };

    checkAdminStatus();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (!adminStatus) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <p>Loading or Not Authorized</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div>
      <Navigation />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Welcome to the Admin Dashboard</Card.Title>
                <Card.Text>Register a user here</Card.Text>
                <Button variant="primary" onClick={handleShowModal}>
                  Register New User
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Register New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Register />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminPanel;
