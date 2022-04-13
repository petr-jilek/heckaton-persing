import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';

export default function HomeView() {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/inventura">Inventura</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Outlet />
        </>
    );
}
