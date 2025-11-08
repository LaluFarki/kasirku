import React, { Component } from "react";

import "./App.css";
import { Row, Col, Container } from "react-bootstrap";
import { NavbarComponent, ListCategorie, Hasil, Menus } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoriYangDipilih)
      .then((res) => {
        console.log(res.data);
        const menus = res.data;
        // 4. Simpan data ke state
        this.setState({ menus: menus });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });

    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        console.log(res.data);
        const keranjangs = res.data;
        // 4. Simpan data ke state
        this.setState({ keranjangs: keranjangs });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }

  //untuk ngecek update agar tidak perlu reload saat menambah barang/hapus barang dll
  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      axios
        .get(API_URL + "keranjangs")
        .then((res) => {
          console.log(res.data);
          const keranjangs = res.data;
          // 4. Simpan data ke state
          this.setState({ keranjangs: keranjangs });
        })
        .catch((error) => {
          console.log("Error yaa ", error);
        });
    }
  }

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        console.log(res.data);
        const menus = res.data;
        // 4. Simpan data ke state
        this.setState({ menus: menus });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text:
                  "Produk berhasil ditambahkan ke keranjang!" +
                  keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        } // punya if
        else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text:
                  "Produk berhasil ditambahkan ke keranjang!" +
                  keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        } // punya else
      }) // punya then
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state;
    console.log("menus: ", menus);
    return (
      <div>
        <div className="App">
          <div className="mt-3">
            <Container fluid>
              <Row>
                <ListCategorie
                  changeCategory={this.changeCategory}
                  categoriYangDipilih={categoriYangDipilih}
                />
                <Col>
                  <h4>
                    <strong>Daftar Produk</strong>
                  </h4>
                  <hr />
                  <Row>
                    {menus &&
                      menus.map((menu) => (
                        <Menus
                          key={menu.id}
                          menu={menu}
                          masukKeranjang={this.masukKeranjang}
                        />
                      ))}
                  </Row>
                </Col>
                <Hasil keranjangs={keranjangs} />
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
