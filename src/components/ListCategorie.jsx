import React, { Component } from "react";
import { Col } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faUtensils,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ name }) => {
  if (name === "Makanan") {
    return <FontAwesomeIcon icon={faUtensils} className="me-2" />;
  } else if (name === "Minuman") {
    return <FontAwesomeIcon icon={faCoffee} />;
  } else if (name === "Cemilan") {
    return <FontAwesomeIcon icon={faCheese} className="me-2" />;
  }
};

export default class ListCategorie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        console.log(res.data);
        const categories = res.data;
        // 4. Simpan data ke state
        this.setState({ categories: categories });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }
  render() {
    const { categories } = this.state;
    const { changeCategory, categoriYangDipilih } = this.props;
    return (
      <Col md={2} mt="2">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>

        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={categoriYangDipilih === category.nama && "category-aktif"}
                style={{ cursor: 'pointer' }}
              >
                <h5>
                  <Icon name={category.nama} />
                  {category.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
