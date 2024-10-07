'use client'

import { Typography, Form, Input, Select, Button, Space, Row, Col } from 'antd'
import { CreditCardOutlined, LockOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CheckoutPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const { data: cart, isLoading: isCartLoading } = Api.cart.findFirst.useQuery({
    where: { userId: user?.id },
    include: { cartItems: { include: { product: true } } },
  })

  const { mutateAsync: createOrder } = Api.order.create.useMutation()

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      const order = await createOrder({
        data: {
          userId: user?.id,
          status: 'PENDING',
          totalAmount: calculateTotal().toString(),
          shippingAddress: `${values.address}, ${values.city}, ${values.country}, ${values.zipCode}`,
          paymentInfo: `${values.cardNumber} - ${values.cardName}`,
          orderItems: {
            create: cart?.cartItems.map(item => ({
              quantity: item.quantity,
              price: item.product?.price,
              customizationData: item.customizationData,
              productId: item.productId,
            })),
          },
        },
      })

      enqueueSnackbar('Order placed successfully!', { variant: 'success' })
      router.push(`/order-confirmation/${order.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to place order. Please try again.', {
        variant: 'error',
      })
    }
    setLoading(false)
  }

  const calculateTotal = () => {
    return (
      cart?.cartItems.reduce((total, item) => {
        const price = parseFloat(item.product?.price || '0')
        return total + price * (item.quantity || 0)
      }, 0) || 0
    )
  }

  if (isCartLoading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Checkout</Title>
      <Text>
        Complete your order by providing shipping and payment information.
      </Text>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: 24 }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: 'Please enter your city' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true, message: 'Please enter your country' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="zipCode"
              label="Zip Code"
              rules={[
                { required: true, message: 'Please enter your zip code' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Title level={4} style={{ marginTop: 24 }}>
          Payment Information
        </Title>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="cardNumber"
              label="Card Number"
              rules={[
                { required: true, message: 'Please enter your card number' },
              ]}
            >
              <Input prefix={<CreditCardOutlined />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="cardName"
              label="Name on Card"
              rules={[
                {
                  required: true,
                  message: 'Please enter the name on your card',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="expiryDate"
              label="Expiry Date"
              rules={[
                { required: true, message: 'Please enter the expiry date' },
              ]}
            >
              <Input placeholder="MM/YY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="cvv"
              label="CVV"
              rules={[{ required: true, message: 'Please enter the CVV' }]}
            >
              <Input prefix={<LockOutlined />} />
            </Form.Item>
          </Col>
        </Row>

        <Space direction="vertical" style={{ width: '100%', marginTop: 24 }}>
          <Text strong>Order Summary:</Text>
          {cart?.cartItems.map(item => (
            <Text key={item.id}>
              {item.product?.name} x {item.quantity} - $
              {parseFloat(item.product?.price || '0') * (item.quantity || 0)}
            </Text>
          ))}
          <Text strong>Total: ${calculateTotal().toFixed(2)}</Text>
        </Space>

        <Form.Item style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Place Order
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
