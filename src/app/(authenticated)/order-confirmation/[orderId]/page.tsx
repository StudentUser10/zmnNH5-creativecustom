'use client'

import { Typography, Spin, Card, Descriptions, List, Row, Col } from 'antd'
import { CheckCircleOutlined, ShoppingOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function OrderConfirmationPage() {
  const router = useRouter()
  const params = useParams<{ orderId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: order, isLoading } = Api.order.findUnique.useQuery({
    where: { id: params.orderId },
    include: { orderItems: { include: { product: true } } },
  })

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!order) {
    enqueueSnackbar('Order not found', { variant: 'error' })
    router.push('/home')
    return null
  }

  return (
    <PageLayout layout="narrow">
      <Card>
        <Title level={2}>
          <CheckCircleOutlined style={{ color: '#52c41a' }} /> Order
          Confirmation
        </Title>
        <Paragraph>
          Thank you for your purchase! An email confirmation has been sent to
          your registered email address.
        </Paragraph>

        <Descriptions title="Order Details" bordered column={1}>
          <Descriptions.Item label="Order ID">{order.id}</Descriptions.Item>
          <Descriptions.Item label="Date">
            {dayjs(order.dateCreated).format('MMMM D, YYYY h:mm A')}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{order.status}</Descriptions.Item>
          <Descriptions.Item label="Total Amount">
            ${order.totalAmount}
          </Descriptions.Item>
          <Descriptions.Item label="Shipping Address">
            {order.shippingAddress}
          </Descriptions.Item>
          <Descriptions.Item label="Payment Info">
            {order.paymentInfo}
          </Descriptions.Item>
        </Descriptions>

        <Title level={4} style={{ marginTop: '24px' }}>
          <ShoppingOutlined /> Ordered Items
        </Title>
        <List
          dataSource={order.orderItems}
          renderItem={item => (
            <List.Item>
              <Row style={{ width: '100%' }}>
                <Col span={12}>
                  <Text strong>{item.product?.name}</Text>
                </Col>
                <Col span={4}>
                  <Text>Quantity: {item.quantity?.toString()}</Text>
                </Col>
                <Col span={4}>
                  <Text>Price: ${item.price}</Text>
                </Col>
                <Col span={4}>
                  <Text strong>
                    Total: $
                    {(Number(item.price) * (item.quantity || 0)).toFixed(2)}
                  </Text>
                </Col>
              </Row>
            </List.Item>
          )}
        />

        <Paragraph style={{ marginTop: '24px' }}>
          If you have any questions about your order, please visit our{' '}
          <a onClick={() => router.push('/support')}>Support Page</a>.
        </Paragraph>
      </Card>
    </PageLayout>
  )
}
