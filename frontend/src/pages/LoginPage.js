import { Button, Form, Input, Notification } from '@arco-design/web-react';
import Title from '@arco-design/web-react/es/Typography/title'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';

export default function LoginPage() {
  const { login, loggedIn } = useAuth();

  async function handleLogin(credentials) {
    try {
      await login(credentials);
    } catch (e) {
      Notification.error({
        title: 'Error',
        content: 'No se ha encontrado ninguna cuenta activa con las credenciales indicadas',
        position: 'bottomRight'
      })
    }
  }

  if (loggedIn) return <Navigate to="/" />;

  return (
    <div style={{ height: '100vh', display: 'flex', alignContent: 'center', alignItems: 'center', width: '100%' }}>
      <div style={{ flex: 1, height: '100%' }} className="pattern">

      </div>
      <div style={{ flex: 1, backgroundColor: 'white', height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25vh' }} >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{
              backgroundColor: 'rgb(32, 52, 233)',
              padding: '10px',
              borderRadius: '50%',
              aspectRatio: 1,
              display: 'flex',
              flexDirection: ''
            }}>
              <svg style={{ width: '2.2rem', height: '2.2rem', color: '#f1f2ff' }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <Title style={{ margin: '0', lineHeight: '1.2', fontWeight: 600 }} heading={5}>SISTEMA DE <br /> FACTURACION</Title>
          </div>
          <div>
            <Title heading={4}>Inicio de sesión</Title>

            <Form onSubmit={handleLogin} style={{ width: "400px" }} wrapperCol={{ span: 24 }}>
              <Form.Item field="username">
                <Input placeholder="Usuario" />
              </Form.Item>
              <Form.Item field="password">
                <Input placeholder="Clave" type="password" />
              </Form.Item>
              <Button style={{ marginTop: '1rem' }} htmlType='submit' type='primary'>Acceder</Button>
            </Form>
          </div>
        </div>
      </div>
    </div >
  )
}
