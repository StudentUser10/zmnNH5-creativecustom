'use client'

import { useState, useEffect } from 'react'
import { Typography, Table, Button, Modal, Form, Input, Select, Upload, Image } from 'antd'
import {
  ShoppingCartOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
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
      alert('Order updated successfully')
      setIsOrderModalVisible(false)
      refetchOrders()
    } catch (error) {
      alert('Failed to update order')
    }
  }

  const handleProductUpdate = async values => {
    try {
      await updateProduct({ where: { id: selectedProduct.id }, data: values })
      alert('Product updated successfully')
      setIsProductModalVisible(false)
      refetchProducts()
    } catch (error) {
      alert('Failed to update product')
    }
  }

  const handleProductDelete = async productId => {
    try {
      await deleteProduct({ where: { id: productId } })
      alert('Product deleted successfully')
      refetchProducts()
    } catch (error) {
      alert('Failed to delete product')
    }
  }

  const handleAddProduct = async values => {
    try {
      await createProduct({ data: values })
      alert('Product added successfully')
      setIsAddProductModalVisible(false)
      refetchProducts()
    } catch (error) {
      alert('Failed to add product')
    }
  }

  const orderColumns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: ['user', 'name'], key: 'customer' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
    {
      title: 'Date',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: date => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          icon={<ShoppingCartOutlined />}
          onClick={() => {
            setSelectedOrder(record)
            setIsOrderModalVisible(true)
          }}
        >
          Process
        </Button>
      ),
    },
  ]

  const productColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Action',
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
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleProductDelete(record.id)}
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ]

  if (isOrdersLoading || isProductsLoading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Admin Dashboard</Title>
      <Text>Manage customer orders and products</Text>

      <Title level={3} style={{ marginTop: 24 }}>
        Customer Orders
      </Title>
      <Table dataSource={orders} columns={orderColumns} rowKey="id" />

      <Title level={3} style={{ marginTop: 24 }}>
        Manage Products
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddProductModalVisible(true)}
          style={{ marginLeft: 16 }}
        >
          Add Product
        </Button>
      </Title>
      <Table dataSource={products} columns={productColumns} rowKey="id" />

      <Modal
        title="Process Order"
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
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Processing">Processing</Select.Option>
              <Select.Option value="Shipped">Shipped</Select.Option>
              <Select.Option value="Delivered">Delivered</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Order
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Product"
        visible={isProductModalVisible}
        onCancel={() => setIsProductModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleProductUpdate} initialValues={selectedProduct}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          {selectedProduct?.imageUrl && (
            <Image src={selectedProduct.imageUrl} alt='Current product image' width={100} />
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Product"
        visible={isAddProductModalVisible}
        onCancel={() => setIsAddProductModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddProduct}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
