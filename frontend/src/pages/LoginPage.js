import { Button, Card, Form, Input, Notification } from '@arco-design/web-react';
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
    <div style={{ height: '100vh', display: 'flex', alignContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'column' }}>
      <Title>Inicio de sesión</Title>
      <Card>
        <Form onSubmit={handleLogin}>
          <Form.Item label="Usuario" field="username">
            <Input />
          </Form.Item>
          <Form.Item label="Clave" field="password">
            <Input type="password" />
          </Form.Item>

          <Button htmlType='submit' type='primary' long>Acceder</Button>
        </Form>
      </Card>
    </div>
  )
}
