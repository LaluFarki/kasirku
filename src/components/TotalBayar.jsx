import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

// Fungsi Pembungkus untuk React Router v6
export function withRouterV6(Component) {
  function ComponentWithRouterProp(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}

class TotalBayar extends Component {
  sumbitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };

    axios
      .post(API_URL + "pesanans", pesanan)
      .then((res) => {
        // Navigasi ke halaman sukses (Perbaikan RRD v6)
        this.props.navigate("/sukses");

        // Hapus semua item dari keranjang di JSON Server
        this.props.keranjangs.forEach((item) => {
          axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then(() => {
              // Tidak perlu setState di sini karena navigasi akan memuat ulang Home
            })
            .catch((error) => {
              console.error(
                "Gagal menghapus item keranjang ID:",
                item.id,
                error
              );
            });
        });
      })
      .catch((error) => {
        console.log("Error saat submit pesanan:", error);
      });
  };

  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <div className="fixed-bottom">
        <Row>
          {/* Menggunakan offset 9 untuk menempatkan di 3 kolom terakhir */}
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            {/* Tata Letak Total Bayar (Perbaikan Rata Kanan) */}
            <Row className="mt-2 mb-3">
              <Col xs={6}>
                <h4>
                  <strong>Total Bayar:</strong>
                </h4>
              </Col>
              <Col xs={6} className="text-right">
                <h4>
                  <strong>
                    Rp. {new Intl.NumberFormat("id-ID").format(totalBayar)}
                  </strong>
                </h4>
              </Col>
            </Row>

            {/* Tombol BAYAR */}
            <Button
              variant="primary"
              block
              className="mb-2 mt-2"
              size="lg"
              onClick={() => this.sumbitTotalBayar(totalBayar)}
              disabled={totalBayar === 0} // Non-aktifkan jika keranjang kosong
            >
              {" "}
                 
              <FontAwesomeIcon icon={faShoppingCart} />  <strong>BAYAR</strong>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

// Ekspor komponen dengan wrapper navigasi
export default withRouterV6(TotalBayar);
