import React from "react";
import { Badge, Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const ModalKeranjang = ({
  showModal,
  handleClose,
  namaMenu,
  jumlah,
  keranjangDetail,
}) => {
  if (keranjangDetail.product) {
    return (
      <Modal show={showModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {/* Tampilkan nama menu yang dipilih */}
            Edit Pesanan: <strong>{keranjangDetail.product.nama}</strong>
            <strong>
              Rp.{" "}
              {new Intl.NumberFormat("id-ID").format(
                keranjangDetail.product.harga
              )}
            </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Simpan Perubahan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>kosong</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Simpan Perubahan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};
