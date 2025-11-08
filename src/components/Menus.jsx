import React from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const Menus = ({ menu , masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-3">
      <Card className="shadow" onClick={() => masukKeranjang(menu)} style={{ cursor: 'pointer' }}>
        <Card.Img 
          variant={"top"}
          src={
            "../public/assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body>
          <Card.Title>
            {menu.nama}
            <strong>
                ({menu.kode})
            </strong>
          </Card.Title>
          <Card.Text>
            {/* //new Intl.NumberFormat('id-ID').format ini adalah untuk number format agar ada koma */}
            {new Intl.NumberFormat("id-ID").format(menu.harga)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
