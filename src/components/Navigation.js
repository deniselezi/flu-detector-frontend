import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";

function Navigation() {
  return (
    <Navbar bg="light" variant="light" className="shadow-sm">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand className="fw-bold">Final Year Project - Denis Elezi</Navbar.Brand>
        <a
          href="https://github.com/deniselezi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark"
          style={{ fontSize: "2rem" }}
        >
          <FaGithub />
        </a>
      </Container>
    </Navbar>
  );
}

export default Navigation;