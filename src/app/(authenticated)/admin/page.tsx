'use client'

import { useUserContext } from '@/core/context'
import { useUploadPublic } from '@/core/hooks/upload'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import {
  Button,
  Form,
  Image,
  Input,
  message,
  Modal,
  Select,
  Switch,
  Table,
  Typography,
  Upload,
} from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
const { Title, Text } = Typography

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false)
  const [isProductModalVisible, setIsProductModalVisible] = useState(false)
  const [isAddProductModalVisible, setIsAddProductModalVisible] =
    useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)
  const [imageType, setImageType] = useState('file')
  const [generateMockup, setGenerateMockup] = useState(false)
  const { mutateAsync: upload } = useUploadPublic()
  const { mutateAsync: generateImage } = Api.ai.generateImage.useMutation()
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

  if (
    !user ||
    (user.email !== 'admin@admin.com' && user.globalRole !== 'ADMIN')
  ) {
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
        imageUrl = url || '/path/to/placeholder.jpg'
      }
      if (generateMockup) {
        const { url } = await generateImage({
          prompt: `Generate a mockup for product: ${values.name}`,
        })
        imageUrl = url
      }
      const { image, ...dataToUpdate } = values
      const updatedProduct = await updateProduct({
        where: { id: selectedProduct.id },
        data: { ...dataToUpdate, imageUrl },
      })
      message.success('Produto atualizado com sucesso')
      setIsProductModalVisible(false)
      await refetchProducts()
      setSelectedProduct(updatedProduct)
    } catch (error) {
      message.error(
        'Falha ao atualizar o produto: ' +
          (error.message || 'Erro desconhecido'),
      )
    } finally {
      setIsUploading(false)
    }
  }

  const handlePreview = file => {
    if (!file.url && !file.preview) {
      file.preview = URL.createObjectURL(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  }

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
        imageUrl = url || '/path/to/placeholder.jpg'
      }
      if (generateMockup) {
        const { url } = await generateImage({
          prompt: `Generate a mockup for product: ${values.name}`
        })
        imageUrl = url
      }
      if (generateMockup) {
        const { url } = await generateImage({
          prompt: `Generate a mockup for product: ${values.name}`,
        })
        imageUrl = url
      }
      const { image, ...productData } = values
      const newProduct = await createProduct({
        data: { ...productData, imageUrl },
      })
      setProducts(prevProducts => [...prevProducts, newProduct])
      message.success('Produto adicionado com sucesso')
      setIsAddProductModalVisible(false)
    } catch (error) {
      message.error(
        'Falha ao adicionar o produto: ' +
          (error.message || 'Erro desconhecido'),
      )
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
      render: imageUrl => (
        <Image
          src={imageUrl || '/path/to/placeholder.jpg'}
          alt="Imagem do produto"
          width={100}
          preview={false}
          onError={e => {
            e.currentTarget.src = '/path/to/placeholder.jpg'
          }}
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
          <Form.Item
            name="name"
            label="Nome"
            rules={[
              {
                required: true,
                message: 'Por favor, insira o nome do produto',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Preço"
            rules={[
              {
                required: true,
                message: 'Por favor, insira o preço do produto',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Descrição">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Tipo de Imagem">
            <Select value={imageType} onChange={setImageType}>
              <Select.Option value="file">Arquivo</Select.Option>
              <Select.Option value="url">URL</Select.Option>
            </Select>
          </Form.Item>
          {imageType === 'file' ? (
            <Form.Item name="image" label="Arquivo">
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                onPreview={handlePreview}
                listType="picture-card"
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Carregar Arquivo</Button>
              </Upload>
            </Form.Item>
          ) : (
            <Form.Item
              name="imageUrl"
              label="URL da Imagem"
              rules={[
                { type: 'url', message: 'Por favor, insira uma URL válida' },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item>
            <Switch
              checked={generateMockup}
              onChange={setGenerateMockup}
              checkedChildren="Gerar Mockup"
              unCheckedChildren="Mockup Desativado"
            />
          </Form.Item>
          {selectedProduct?.imageUrl && (
            <Image
              src={selectedProduct.imageUrl}
              alt="Imagem atual do produto"
              width={100}
            />
          )}
          <Form.Item>
            <Switch
              checked={generateMockup}
              onChange={setGenerateMockup}
              checkedChildren="Gerar Mockup"
              unCheckedChildren="Mockup Desativado"
            />
          </Form.Item>
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
        <img
          alt="Pré-visualização"
          style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
          src={previewImage}
        />
      </Modal>

      <Modal
        title="Adicionar Produto"
        visible={isAddProductModalVisible}
        onCancel={() => setIsAddProductModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddProduct}>
          <Form.Item
            name="name"
            label="Nome"
            rules={[
              {
                required: true,
                message: 'Por favor, insira o nome do produto',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Preço"
            rules={[
              {
                required: true,
                message: 'Por favor, insira o preço do produto',
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="Descrição">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Tipo de Imagem">
            <Select value={imageType} onChange={setImageType}>
              <Select.Option value="file">Arquivo</Select.Option>
              <Select.Option value="url">URL</Select.Option>
            </Select>
          </Form.Item>
          {imageType === 'file' ? (
            <Form.Item name="image" label="Arquivo">
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                onPreview={handlePreview}
                listType="picture-card"
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Carregar Arquivo</Button>
              </Upload>
            </Form.Item>
          ) : (
            <Form.Item
              name="imageUrl"
              label="URL da Imagem"
              rules={[
                { type: 'url', message: 'Por favor, insira uma URL válida' },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item>
            <Switch
              checked={generateMockup}
              onChange={setGenerateMockup}
              checkedChildren="Gerar Mockup"
              unCheckedChildren="Mockup Desativado"
            />
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
        <img
          alt="Pré-visualização"
          style={{ width: '100%' }}
          src={previewImage}
        />
      </Modal>
    </PageLayout>
  )
}
