import React, { Component } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import TotalBayar from "./TotalBayar";
import { ModalKeranjang } from "./ModalKeranjang";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";



export default class Hasil extends Component {
  // Menggunakan Class Field untuk state (lebih ringkas dan menghindari error 'undefined')
  state = {
    showModal: false,
    keranjangDetail: {}, // Ubah ke objek kosong agar tidak undefined saat pertama diakses
    jumlah: 0,
    keterangan: "",
    totalHarga: 0,
  };

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      // Inisialisasi jumlah dan keterangan dari data keranjang
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan || "",
      totalHarga: menuKeranjang.total_harga || 0,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:  this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Implementasi logika simpan perubahan di sini
    const data = {
      jumlah: this.state.jumlah,
      total_harga:this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan:this.state.keterangan
    };


    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        swal({
          title: "Update Pesanan",
          text:
            "Sukses Update Pesanan!" +
            data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
        // ⬇️ BARIS BARU DITAMBAHKAN DI SINI ⬇️
        this.getListKeranjang();
      })
      .catch((error) => {
        console.log("Error yaa ", error);
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
              tambah={this.tambah}
              kurang={this.kurang}
             changeHandler={this.changeHandler}
             handleSubmit={this.handleSubmit}
            />
          </ListGroup>
        )}

        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
