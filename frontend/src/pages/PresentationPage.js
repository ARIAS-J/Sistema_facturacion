import { Card, Grid, PageHeader } from '@arco-design/web-react';
import Layout from '../components/Layout';

export default function PresentationPage() {

  return (
    <Layout>
      <PageHeader
        style={{ marginBottom: '1rem' }}
        title='INTEGRANTES'
        subTitle='2DO PARCIAL DE INTEGRACIÓN PROPIETARIA/OPEN SOURCE'
      />
      <Grid.Row gutter={16} style={{ marginBottom: 16 }} >
        <Grid.Col span={12}>
          <Card hoverable>
            <Card.Meta title='Elvis Tejeda' description='A00105346' />
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card hoverable>
            <Card.Meta title='Joel Arias' description='A00105265' />
          </Card>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row gutter={16} style={{ marginBottom: 16 }}>
        <Grid.Col span={12}>
          <Card hoverable>
            <Card.Meta title='Ashly Cuevas' description='A00105291' />
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card hoverable>
            <Card.Meta title='Franlys González' description='A00105882' />
          </Card>
        </Grid.Col>
      </Grid.Row>
    </Layout>
  )
}
