import { useState } from 'react';
import { Button, Form, Input, Modal, Notification, PageHeader, Space, Table } from '@arco-design/web-react';
import { HiPlusSm } from 'react-icons/hi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getInvoices } from '../services/api/invoicing-actions/get-invoices';
import { deleteInvoice } from '../services/api/invoicing-actions/delete-invoice';
import { postInvoice } from '../services/api/invoicing-actions/post-invoice';
import { patchInvoices } from '../services/api/invoicing-actions/patch-invoice';
import Layout from '../components/Layout';
import { getArticles } from '../services/api/articles-actions/get-articles';
import { getSellers } from '../services/api/sellers-actions/get-sellers';
import { getClients } from '../services/api/clients-actions/get-clients';
import CustomSelect from '../components/CustomSelect';
import Text from '@arco-design/web-react/es/Typography/text';


export default function InvoicingPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery('invoices', getInvoices);
  const { data: articles } = useQuery('articles', getArticles);
  const { data: sellers } = useQuery('sellers', getSellers);
  const { data: clients } = useQuery('clients', getClients);

  const { mutate: post, isLoading: postIsLoading } = useMutation(postInvoice, {
    onSuccess: () => {
      queryClient.invalidateQueries('invoices')
      setShowModal(false);
      form.clearFields();
      form.setFieldValue('estado', true);
      Notification.success({
        title: 'Éxito',
        content: 'Factura registrada',
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

  const { mutate: remove } = useMutation(deleteInvoice, {
    onSuccess: () => {
      queryClient.invalidateQueries('invoices')
    }
  });

  const { mutate: edit, isLoading: editIsLoading } = useMutation(patchInvoices, {
    onSuccess: () => {
      queryClient.invalidateQueries('invoices');
      setEditingId(null);
      setShowModal(false);
      Notification.success({
        title: 'Éxito',
        content: 'Factura editada',
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: 'ID Artículo',
      dataIndex: 'id_articulo'
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad'
    },
    {
      title: 'ID Cliente',
      dataIndex: 'id_cliente'
    },
    {
      title: 'ID Vendedor',
      dataIndex: 'id_vendedor'
    },
    {
      title: 'Comentario',
      dataIndex: 'comentario'
    },
    {
      title: 'ID Registro Contabilidad',
      dataIndex: 'accounting_entry_id',
      render: (_, record) => {
        if (!record.accounting_entry_id) return <Text disabled>Sin contabilizar</Text>
        return <td>{record.accounting_entry_id}</td>;
      }
    },
    {
      title: 'Acción',
      dataIndex: 'ax',
      render: (_, record) => (
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
        title='Facturación'
        extra={
          <Button icon={<HiPlusSm />} type='primary' onClick={() => setShowModal(true)} >Facturar</Button>
        }
      />
      <Table
        rowKey='id'
        columns={columns}
        data={data?.data}
        rowSelection={{
          onChange: (selectedRowKeys) => {
            console.log('onChange:', selectedRowKeys);
            setSelectedRowKeys(selectedRowKeys);
          },
          selectedRowKeys, checkboxProps: (record) => {
            return {
              disabled: !!record.accounting_entry_id,
            };
          },
        }} />
      <Modal
        title='Facturar'
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
          <Form.Item label='Articulo' field='id_articulo'>
            <CustomSelect options={articles?.data} />
          </Form.Item>
          <Form.Item label='Cantidad' field='cantidad'>
            <Input type="number" />
          </Form.Item>
          <Form.Item label='Vendedor' field='id_vendedor'>
            <CustomSelect options={sellers?.data} />
          </Form.Item>
          <Form.Item label='Cliente' field='id_cliente'>
            <CustomSelect dataLabelName='nombre_comercial' options={clients?.data} />
          </Form.Item>
          <Form.Item label='Comentario' field='comentario' >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}
