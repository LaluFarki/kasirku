// pages/Sukses.jsx
// GANTI SEMUA ISI FILE DENGAN KODE INI

import React, { Component } from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Sukses extends Component {
  render() {
    return (
      <div className="mt-4 text-center">
        <Container>
          <Row>
            <Col>
              {/* Tutorialnya mungkin punya gambar.
                Jika Anda punya, letakkan di folder public/images/sukses.png
              */}
              <Image src="assets/images/sukses.png" width="300" />
              <h2>Sukses!</h2>
              <p>Pesanan Anda berhasil diproses, terima kasih!</p>
              
              <Button
                as={Link}
                to="/"
                variant="primary"
                className="btn-pointer" /* ⬅️ TAMBAHKAN INI */
              >
                Kembali ke Home
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
