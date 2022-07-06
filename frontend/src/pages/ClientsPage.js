import React, { useState } from 'react'
import { Button, Form, Input, Modal, Notification, PageHeader, Space, Switch, Table } from '@arco-design/web-react';
import { HiPlusSm } from 'react-icons/hi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getClients } from '../services/api/getClients';
import { postClient } from '../services/api/postClient';
import { deleteClient } from '../services/api/deleteClient';
import { patchClient } from '../services/api/patchClient';


export default function ClientsPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery('clients', getClients);
  const { mutate: addClient, isLoading: clientPostIsLoading } = useMutation(postClient, {
    onSuccess: () => {
      queryClient.invalidateQueries('clients')
      setShowModal(false);
      form.clearFields();
      form.setFieldValue('estado', true);
      Notification.success({
        title: 'Éxito',
        content: 'Cliente registrado',
        position: 'bottomRight'
      })
    },
    onError: (e) => {
      Notification.error({
        title: 'Error',
        content: JSON.stringify(e.response.data),
        position: 'bottomRight'
      })
    }
  });
  const { mutate: removeClient } = useMutation(deleteClient, {
    onSuccess: () => {
      queryClient.invalidateQueries('clients')
    }
  });
  const { mutate: editClient, isLoading: editIsLoading } = useMutation(patchClient, {
    onSuccess: () => {
      queryClient.invalidateQueries('clients');
      setEditingId(null);
      setShowModal(false);
      Notification.success({
        title: 'Éxito',
        content: 'Cliente editado',
        position: 'bottomRight'
      })
    },
    onError: (e) => {
      Notification.error({
        title: 'Error',
        content: JSON.stringify(e.response.data),
        position: 'bottomRight'
      })
    }
  })
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const columns = [
    {
      title: 'RNC',
      dataIndex: 'rnc'
    },
    {
      title: 'Nombre comercial',
      dataIndex: 'nombre_comercial'
    },
    {
      title: 'Cuenta contable',
      dataIndex: 'cuenta_contable'
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      render: (col, record) => {
        if (record.estado) {
          return 'Activo'
        } else {
          return 'Inactivo'
        }
      }
    },
    {
      title: 'Acción',
      dataIndex: 'ax',
      render: (col, record) => (
        <Space>
          <Button type='secondary' onClick={() => {
            form.setFieldsValue(record);
            setEditingId(record.id);
            setShowModal(true);
          }}>
            Editar
          </Button>
          <Button type='text' onClick={() => removeClient({ id: record.id })}>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        style={{ marginBottom: '1rem' }}
        title='Gestión de clientes'
        extra={
          <Button icon={<HiPlusSm />} type='primary' onClick={() => setShowModal(true)} >Nuevo cliente</Button>
        }
      />
      <Table rowKey='id' columns={columns} data={data?.data} />
      <Modal
        title='Agregar cliente'
        visible={showModal}
        onCancel={() => setShowModal(false)}
        style={{ width: '50rem' }}
        footer={<>
          <Button onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button type='primary' loading={clientPostIsLoading || editIsLoading} onClick={() => form.submit()}>Agregar</Button>
        </>}
      >
        <Form
          form={form}
          initialValues={{ estado: true }}
          onSubmit={(values) => {
            if (editingId) {
              values.id = editingId;
              editClient(values);
            } else {
              addClient(values);
            }
            console.log(values);
          }}
        >
          <Form.Item label='Nombre comercial' field='nombre_comercial'>
            <Input />
          </Form.Item>
          <Form.Item label='RNC' field='rnc'>
            <Input />
          </Form.Item>
          <Form.Item label='Cuenta contable' field='cuenta_contable'>
            <Input />
          </Form.Item>
          <Form.Item label='Estado' field='estado' >
            <Switch checkedText='Activo' uncheckedText='Inactivo' defaultChecked />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
