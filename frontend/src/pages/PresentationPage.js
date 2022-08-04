import { Avatar, Card, Grid, PageHeader, Space } from '@arco-design/web-react';
import Title from '@arco-design/web-react/es/Typography/title';
import Layout from '../components/Layout';
import Lottie from "lottie-react";
import invoiceAnimation from "../invoice-animation.json";
import joel from '../joel-peep.svg';
import elvis from '../elvis-peep.svg';
import franlys from '../franlys-peep.svg';
import ashley from '../ashley-peep.svg';

export default function PresentationPage() {

  return (
    <Layout>
      <PageHeader
        style={{ marginBottom: '1rem' }}
        title='INTEGRANTES'
        subTitle='EXAMEN FINAL DE INTEGRACIÓN PROPIETARIA/OPEN SOURCE'
      />
      <div style={{ width: '14rem', margin: '0 auto' }}>
        <Lottie animationData={invoiceAnimation} />
      </div>
      <Title heading={2} style={{ textAlign: 'center' }}>Bienvenido al Sistema de Facturación</Title>
      <div style={{ maxWidth: '50rem', margin: '0 auto' }}>
        <Grid.Row gutter={16} style={{ marginBottom: 16, }} >
          <Grid.Col span={12}>
            <Card hoverable>
              <Space size="large">
                <Avatar size={80}>
                  <img src={elvis} alt='elvis' style={{ objectFit: 'cover', scale: '1.4', transform: 'translate(-3px,5px)' }} />
                </Avatar>
                <Card.Meta title='Elvis Tejeda' description='A00105346' />
              </Space>
            </Card>
          </Grid.Col>
          <Grid.Col span={12}>
            <Card hoverable>
              <Space size="large" >
                <Avatar size={80}>
                  <img src={joel} alt='joel' style={{ objectFit: 'cover', scale: '1.4', transform: 'translate(-3px,5px)' }} />
                </Avatar>
                <Card.Meta title='Joel Arias' description='A00105265' />
              </Space>
            </Card>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={16} style={{ marginBottom: 16 }}>
          <Grid.Col span={12}>
            <Card hoverable>
              <Space size="large">
                <Avatar size={80}>
                  <img src={ashley} alt='ashley' style={{ objectFit: 'cover', scale: '1.4', transform: 'translate(-3px,5px)' }} />
                </Avatar>
                <Card.Meta title='Ashly Cuevas' description='A00105291' />
              </Space>
            </Card>
          </Grid.Col>
          <Grid.Col span={12}>
            <Card hoverable>
              <Space size="large">
                <Avatar size={80}>
                  <img src={franlys} alt='franlys' style={{ objectFit: 'cover', scale: '1.4', transform: 'translate(-3px,5px)' }} />
                </Avatar>
                <Card.Meta title='Franlys González' description='A00105882' />
              </Space>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </div>
    </Layout >
  )
}
