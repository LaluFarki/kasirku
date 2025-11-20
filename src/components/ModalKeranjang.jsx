import React from "react";
import { Badge, Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

export const ModalKeranjang = ({
  showModal,
  handleClose,
  namaMenu,
  jumlah,
  keranjangDetail,
  keterangan,
  tambah,
  kurang,
  changeHandler,
  handleSubmit,
  totalHarga,
  hapusPesanan,
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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total Harga : </Form.Label>
              <p>
                <strong>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID").format(
                   totalHarga
                  )}
                </strong>
              </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah : </Form.Label>
                <br />
              <Button variant="primary" size="sm" className="mr-3">
                <FontAwesomeIcon icon={faMinus} onClick={ () => kurang()} />
              </Button>
              <strong>{jumlah}</strong>
              <Button variant="primary" size="sm" className="ml-3">
                <FontAwesomeIcon icon={faPlus} onClick={ () => tambah()} />
              </Button>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Keterangan </Form.Label>
              <Form.Control 
              as="textarea" 
              rows={3}
               name="keterangan" 
               placeholder="Contoh : Pedes, Nasi setengah"
               value={keterangan}
               onChange={(event) => changeHandler(event)}
               />
            </Form.Group>
            <Button variant="primary" type="submit"> 
              Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick = { () => hapusPesanan(keranjangDetail.id)}>
            <FontAwesomeIcon icon={faTrash} />
            Hapus Pesanan
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
