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

      enqueueSnackbar('Pedido realizado com sucesso!', { variant: 'success' })
      router.push(`/confirmacao-pedido/${order.id}`)
    } catch (error) {
      enqueueSnackbar('Falha ao realizar o pedido. Por favor, tente novamente.', {
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
    return <PageLayout layout="narrow">Carregando...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Finalizar Compra</Title>
      <Text>
        Complete seu pedido fornecendo informações de envio e pagamento.
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
              label="Endereço"
              rules={[{ required: true, message: 'Por favor, insira seu endereço' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="city"
              label="Cidade"
              rules={[{ required: true, message: 'Por favor, insira sua cidade' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="country"
              label="País"
              rules={[{ required: true, message: 'Por favor, insira seu país' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="zipCode"
              label="CEP"
              rules={[
                { required: true, message: 'Por favor, insira seu CEP' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Title level={4} style={{ marginTop: 24 }}>
          Informações de Pagamento
        </Title>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="cardNumber"
              label="Número do Cartão"
              rules={[
                { required: true, message: 'Por favor, insira o número do seu cartão' },
              ]}
            >
              <Input prefix={<CreditCardOutlined />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="cardName"
              label="Nome no Cartão"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira o nome no cartão',
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
              label="Data de Validade"
              rules={[
                { required: true, message: 'Por favor, insira a data de validade' },
              ]}
            >
              <Input placeholder="MM/AA" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="cvv"
              label="CVV"
              rules={[{ required: true, message: 'Por favor, insira o CVV' }]}
            >
              <Input prefix={<LockOutlined />} />
            </Form.Item>
          </Col>
        </Row>

        <Space direction="vertical" style={{ width: '100%', marginTop: 24 }}>
          <Text strong>Resumo do Pedido:</Text>
          {cart?.cartItems.map(item => (
            <Text key={item.id}>
              {item.product?.name} x {item.quantity} - R$
              {parseFloat(item.product?.price || '0') * (item.quantity || 0)}
            </Text>
          ))}
          <Text strong>Total: R$ {calculateTotal().toFixed(2)}</Text>
        </Space>

        <Form.Item style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Finalizar Pedido
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
