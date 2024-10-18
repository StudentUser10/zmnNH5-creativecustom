'use client'

import { useState, useEffect } from 'react'
import { Typography, Table, Button, Modal, Form, Input, Select, Upload, Image, message } from 'antd'
import {
  ShoppingCartOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false)
  const [isProductModalVisible, setIsProductModalVisible] = useState(false)
  const [isAddProductModalVisible, setIsAddProductModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)
  const { mutateAsync: upload } = useUploadPublic()

  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    refetch: refetchOrders,
  } = Api.order.findMany.useQuery({
    include: { user: true, orderItems: { include: { product: true } } },
  })

  const {
    data: productsData,
    isLoading: isProductsLoading,
    refetch: refetchProducts,
  } = Api.product.findMany.useQuery({})

  const { mutateAsync: updateOrder } = Api.order.update.useMutation()
  const { mutateAsync: updateProduct } = Api.product.update.useMutation()
  const { mutateAsync: deleteProduct } = Api.product.delete.useMutation()
  const { mutateAsync: createProduct } = Api.product.create.useMutation()

  useEffect(() => {
    if (ordersData) setOrders(ordersData)
    if (productsData) setProducts(productsData)
  }, [ordersData, productsData])

  if (!user || (user.email !== "admin@admin.com" && user.globalRole !== 'ADMIN')) {
    router.push('/home')
    return null
  }

  const handleOrderProcess = async values => {
    try {
      await updateOrder({
        where: { id: selectedOrder.id },
        data: { status: values.status },
      })
      alert('Pedido atualizado com sucesso')
      setIsOrderModalVisible(false)
      refetchOrders()
    } catch (error) {
      alert('Falha ao atualizar o pedido')
    }
  }

  const handleProductUpdate = async values => {
    setIsUploading(true)
    try {
      let imageUrl = selectedProduct.imageUrl
      if (values.image && values.image[0]) {
        const file = values.image[0].originFileObj
        const { url } = await upload({ file })
        imageUrl = url
      }
      const { image, ...dataToUpdate } = values
      const updatedProduct = await updateProduct({ 
        where: { id: selectedProduct.id }, 
        data: { ...dataToUpdate, imageUrl } 
      })
      message.success('Produto atualizado com sucesso')
      setIsProductModalVisible(false)
      await refetchProducts()
      setSelectedProduct(updatedProduct)
    } catch (error) {
      message.error('Falha ao atualizar o produto: ' + (error.message || 'Erro desconhecido'))
    } finally {
      setIsUploading(false)
    }
  }

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleProductDelete = async productId => {
    try {
      await deleteProduct({ where: { id: productId } })
      alert('Produto excluído com sucesso')
      refetchProducts()
    } catch (error) {
      alert('Falha ao excluir o produto')
    }
  }

  const handleAddProduct = async values => {
    setIsUploading(true)
    try {
      let imageUrl = ''
      if (values.image && values.image[0]) {
        const file = values.image[0].originFileObj
        const { url } = await upload({ file })
        imageUrl = url
      }
      await createProduct({ data: { ...values, imageUrl } })
      message.success('Produto adicionado com sucesso')
      setIsAddProductModalVisible(false)
      refetchProducts()
    } catch (error) {
      message.error('Falha ao adicionar o produto: ' + (error.message || 'Erro desconhecido'))
    } finally {
      setIsUploading(false)
    }
  }

  const orderColumns = [
    { title: 'ID do Pedido', dataIndex: 'id', key: 'id' },
    { title: 'Cliente', dataIndex: ['user', 'name'], key: 'customer' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Valor Total', dataIndex: 'totalAmount', key: 'totalAmount' },
    {
      title: 'Data',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: date => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Ação',
      key: 'action',
      render: (_, record) => (
        <Button
          icon={<ShoppingCartOutlined />}
          onClick={() => {
            setSelectedOrder(record)
            setIsOrderModalVisible(true)
          }}
        >
          Processar
        </Button>
      ),
    },
  ]

  const productColumns = [
    { 
      title: 'Imagem', 
      dataIndex: 'imageUrl', 
      key: 'image',
      render: (imageUrl) => (
        <Image 
          src={`${imageUrl}?t=${Date.now()}`} 
          alt="Imagem do produto" 
          width={50} 
        />
      ),
    },
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Preço', dataIndex: 'price', key: 'price' },
    {
      title: 'Ação',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedProduct(record)
              setIsProductModalVisible(true)
            }}
          >
            Editar
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleProductDelete(record.id)}
            style={{ marginLeft: 8 }}
          >
            Excluir
          </Button>
        </>
      ),
    },
  ]

  if (isOrdersLoading || isProductsLoading) {
    return <PageLayout layout="narrow">Carregando...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Painel de Administração</Title>
      <Text>Gerenciar pedidos e produtos dos clientes</Text>

      <Title level={3} style={{ marginTop: 24 }}>
        Pedidos dos Clientes
      </Title>
      <Table dataSource={orders} columns={orderColumns} rowKey="id" />

      <Title level={3} style={{ marginTop: 24 }}>
        Gerenciar Produtos
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddProductModalVisible(true)}
          style={{ marginLeft: 16 }}
        >
          Adicionar Produto
        </Button>
      </Title>
      <Table dataSource={products} columns={productColumns} rowKey="id" />

      <Modal
        title="Processar Pedido"
        visible={isOrderModalVisible}
        onCancel={() => setIsOrderModalVisible(false)}
        footer={null}
      >
        <Form
          onFinish={handleOrderProcess}
          initialValues={{ status: selectedOrder?.status }}
        >
          <Form.Item name="status" label="Status">
            <Select>
              <Select.Option value="Pending">Pendente</Select.Option>
              <Select.Option value="Processing">Processando</Select.Option>
              <Select.Option value="Shipped">Enviado</Select.Option>
              <Select.Option value="Delivered">Entregue</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Atualizar Pedido
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Editar Produto"
        visible={isProductModalVisible}
        onCancel={() => setIsProductModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleProductUpdate} initialValues={selectedProduct}>
          <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Por favor, insira o nome do produto' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Preço" rules={[{ required: true, message: 'Por favor, insira o preço do produto' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Descrição">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="image" label="Arquivo">
            <Upload 
              beforeUpload={() => false} 
              maxCount={1}
              onPreview={handlePreview}
              listType="picture-card"
            >
              <Button icon={<UploadOutlined />}>Carregar Arquivo</Button>
            </Upload>
          </Form.Item>
          {selectedProduct?.imageUrl && (
            <Image src={`${selectedProduct.imageUrl}?t=${Date.now()}`} alt='Imagem atual do produto' width={100} />
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isUploading}>
              {isUploading ? 'Atualizando...' : 'Atualizar Produto'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={previewVisible}
        title="Pré-visualização da Imagem"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Pré-visualização" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      <Modal
        title="Adicionar Produto"
        visible={isAddProductModalVisible}
        onCancel={() => setIsAddProductModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddProduct}>
          <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Por favor, insira o nome do produto' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Preço" rules={[{ required: true, message: 'Por favor, insira o preço do produto' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="Descrição">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="image" label="Arquivo">
            <Upload 
              beforeUpload={() => false} 
              maxCount={1}
              onPreview={handlePreview}
              listType="picture-card"
            >
              <Button icon={<UploadOutlined />}>Carregar Arquivo</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isUploading}>
              {isUploading ? 'Adicionando...' : 'Adicionar Produto'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={previewVisible}
        title="Pré-visualização da Imagem"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Pré-visualização" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </PageLayout>
  )
}
