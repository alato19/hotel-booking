import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/User/Sidebar";

export default function Dashboard() {
  return (
    <Container fluid className="mt-5 pt-4">
      <Row>
        <Col md={3} lg={2} className="bg-light min-vh-100 p-3">
          <Sidebar />
        </Col>

        <Col md={9} lg={10} className="p-4">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
