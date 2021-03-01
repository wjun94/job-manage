import * as React from 'react';
import './index.scss';
import { Col, Row } from 'antd';

export interface P {
  data: Node[]
  title: string
}

export interface Node {
  label: string
  value: string | number
}

class App extends React.Component<P, {}> {
  render() {
    const { data, title } = this.props
    return (
      <Col className='box-comp' span={11}>
        <p className='title'>{title}</p>
        <Row>
          {
            data.map((v, i: number) => (
              <Col className='content' span={6} key={'boxa-' + i}>
                <p>{v.label}</p>
                <h3>{v.value}</h3>
              </Col>
            ))
          }
        </Row>
      </Col>
    );
  }
}

export default App;
