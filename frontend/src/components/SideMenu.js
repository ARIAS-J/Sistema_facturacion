import { Card, Menu, Typography } from '@arco-design/web-react'
import React from 'react'
import { HiOutlineArchive, HiOutlineChartPie, HiOutlineUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'

export default function SideMenu() {
  const location = useLocation();

  return (
    <Menu selectedKeys={[location.pathname]}>
      <Link to="/">
        <Card style={{ margin: '.5rem auto', display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
          <Typography.Text type='secondary' bold={true}>SISTEMA DE FACTURACION</Typography.Text>
        </Card>
      </Link>
      <Link to="/clientes">
        <Menu.Item key='/clientes'>
          <div className='menu-item-container'>
            <HiOutlineUser size={15} />
            <p>Clientes</p>
          </div>
        </Menu.Item>
      </Link>
      <Link to="/articulos">
        <Menu.Item key='/articulos'>
          <div className='menu-item-container'>
            <HiOutlineArchive size={15} />
            <p>Artículos</p>
          </div>
        </Menu.Item>
      </Link>
      <Link to="/vendedores">
        <Menu.Item key='/vendedores'>
          <div className='menu-item-container'>
            <HiOutlineChartPie size={15} />
            <p>Vendedores</p>
          </div>
        </Menu.Item>
      </Link>
    </Menu>
  )
}
