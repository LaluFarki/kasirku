import React, { Component } from 'react'
import { Badge, Col ,Row} from 'react-bootstrap';
import ListGroup from "react-bootstrap/ListGroup";

export default class Hasil extends Component {
  render() {
    const {keranjangs} = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>

        {keranjangs.length !== 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((menuKeranjang) => (
              <ListGroup.Item>
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
                    <strong className='float-right'>
                      Rp.{" "}
                      {new Intl.NumberFormat("id-ID").format(
                        menuKeranjang.total_harga
                      )}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    );
  }
}
