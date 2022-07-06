import React, { useState } from 'react'
import { Button, Form, Input, Modal, Notification, PageHeader, Space, Switch, Table } from '@arco-design/web-react';
import { HiPlusSm } from 'react-icons/hi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getSellers } from '../services/api/sellers-actions/get-sellers';
import { postSeller } from '../services/api/sellers-actions/post-seller';
import { patchSeller } from '../services/api/sellers-actions/patch-seller';
import { deleteSeller } from '../services/api/sellers-actions/delete-seller';


export default function SellersPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery('sellers', getSellers);

  const { mutate: post, isLoading: postIsLoading } = useMutation(postSeller, {
    onSuccess: () => {
      queryClient.invalidateQueries('sellers')
      setShowModal(false);
      form.clearFields();
      form.setFieldValue('estado', true);
      Notification.success({
        title: 'Éxito',
        content: 'Vendedor registrado',
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

  const { mutate: remove } = useMutation(deleteSeller, {
    onSuccess: () => {
      queryClient.invalidateQueries('sellers')
    }
  });

  const { mutate: edit, isLoading: editIsLoading } = useMutation(patchSeller, {
    onSuccess: () => {
      queryClient.invalidateQueries('sellers');
      setEditingId(null);
      setShowModal(false);
      Notification.success({
        title: 'Éxito',
        content: 'Vendedor editado',
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
      title: 'Nombre',
      dataIndex: 'nombre'
    },
    {
      title: 'Porciento de comisión',
      dataIndex: 'porciento_comision'
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
          <Button type='text' onClick={() => remove({ id: record.id })}>
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
        title='Gestión de vendedores'
        extra={
          <Button icon={<HiPlusSm />} type='primary' onClick={() => setShowModal(true)} >Nuevo vendedor</Button>
        }
      />
      <Table rowKey='id' columns={columns} data={data?.data} />
      <Modal
        title='Agregar vendedor'
        visible={showModal}
        onCancel={() => setShowModal(false)}
        style={{ width: '50rem' }}
        footer={<>
          <Button onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button type='primary' loading={postIsLoading || editIsLoading} onClick={() => form.submit()}>Guardar</Button>
        </>}
      >
        <Form
          form={form}
          initialValues={{ estado: true }}
          onSubmit={(values) => {
            if (editingId) {
              values.id = editingId;
              edit(values);
            } else {
              post(values);
            }
            console.log(values);
          }}
        >
          <Form.Item label='Nombre' field='nombre'>
            <Input />
          </Form.Item>
          <Form.Item label='Porciento de comisión' field='porciento_comision'>
            <Input type="number" />
          </Form.Item>
          <Form.Item label='Estado' field='estado' >
            <Switch checkedText='Activo' uncheckedText='Inactivo' defaultChecked />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
