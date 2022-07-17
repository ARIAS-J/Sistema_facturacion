import React, { useState } from 'react'
import { Button, Form, Input, Modal, Notification, PageHeader, Space, Switch, Table, Typography } from '@arco-design/web-react';
import { HiPlusSm } from 'react-icons/hi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getArticles } from '../services/api/articles-actions/get-articles';
import { postArticle } from '../services/api/articles-actions/post-article';
import { patchArticle } from '../services/api/articles-actions/patch-article';
import { deleteArticle } from '../services/api/articles-actions/delete-article';
import Layout from '../components/Layout';


export default function ArticlesPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery('articles', getArticles);

  const { mutate: post, isLoading: postIsLoading } = useMutation(postArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles')
      setShowModal(false);
      form.clearFields();
      form.setFieldValue('estado', true);
      Notification.success({
        title: 'Éxito',
        content: 'Artículo registrado',
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

  const { mutate: remove } = useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles')
    }
  });

  const { mutate: edit, isLoading: editIsLoading } = useMutation(patchArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles');
      setEditingId(null);
      setShowModal(false);
      Notification.success({
        title: 'Éxito',
        content: 'Artículo editado',
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
      title: 'Descripción',
      dataIndex: 'descripcion'
    },
    {
      title: 'Precio unitario (RD$)',
      dataIndex: 'precio_unitario'
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      render: (col, record) => {
        if (record.estado) {
          return <Typography.Text type='success'>Activo</Typography.Text>
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
    <Layout>
      <PageHeader
        style={{ marginBottom: '1rem' }}
        title='Gestión de artículos'
        extra={
          <Button icon={<HiPlusSm />} type='primary' onClick={() => setShowModal(true)} >Nuevo artículo</Button>
        }
      />
      <Table rowKey='id' columns={columns} data={data?.data} />
      <Modal
        title='Agregar artículo'
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
          <Form.Item label='Descripción' field='descripcion'>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label='Precio unitario' field='precio_unitario'>
            <Input type="number" />
          </Form.Item>
          <Form.Item label='Estado' field='estado' >
            <Switch checkedText='Activo' uncheckedText='Inactivo' defaultChecked />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}
