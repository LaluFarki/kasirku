import React, { Component } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import TotalBayar from "./TotalBayar";
import { ModalKeranjang } from "./ModalKeranjang";

export default class Hasil extends Component {
  // Menggunakan Class Field untuk state (lebih ringkas dan menghindari error 'undefined')
  state = {
    showModal: false,
    keranjangDetail: {}, // Ubah ke objek kosong agar tidak undefined saat pertama diakses
    jumlah: 0,
    keterangan: "",
  };

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      // Inisialisasi jumlah dan keterangan dari data keranjang
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan || "",
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { keranjangs } = this.props;
    const { showModal, keranjangDetail, jumlah, keterangan } = this.state;

    // Pastikan product ada di keranjangDetail sebelum diakses
    const namaMenu = keranjangDetail.product
      ? keranjangDetail.product.nama
      : "";

    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>

        {keranjangs.length !== 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((menuKeranjang) => (
              <ListGroup.Item
                key={menuKeranjang.id}
                onClick={() => this.handleShow(menuKeranjang)}
                style={{ cursor: "pointer" }} // Tambahkan style agar terlihat bisa diklik
              >
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill bg="success">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{menuKeranjang.product.nama}</h5>
                    <p>
                      Rp.{" "}
                      {new Intl.NumberFormat("id-ID").format(
                        menuKeranjang.product.harga
                      )}
                    </p>
                  </Col>
                  <Col>
                    <h5>Total</h5>
                    <strong className="float-right">
                      Rp.{" "}
                      {new Intl.NumberFormat("id-ID").format(
                        menuKeranjang.total_harga
                      )}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

            <ModalKeranjang
              handleClose={this.handleClose}
              {...this.state}
              keranjangDetail={keranjangDetail}
            />
          </ListGroup>
        )}

        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
