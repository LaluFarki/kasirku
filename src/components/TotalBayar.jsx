import React, { Component } from 'react'
import {Row,Col,Button} from 'react-bootstrap';


export default class TotalBayar extends Component {
  render() {

        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
          return result + item.total_harga;
        }, 0);
    return (
      <div className='fixed-bottom'>
        <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
                <h4>
                    <strong className='float-right mr-2'>Total Bayar: Rp. {new Intl.NumberFormat("id-ID").format(totalBayar)}</strong>
                </h4>
                <Button variant="primary" block className="mb-2 mt-2 mr-2" size="lg">    
                    <strong>
                        BAYAR
                    </strong>
                </Button>
            </Col>
        </Row>
        </div>
    )
  }
}
