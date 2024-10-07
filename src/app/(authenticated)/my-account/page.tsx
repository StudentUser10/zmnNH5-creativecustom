'use client'

import { Typography, Spin, Card, List, Button, Row, Col } from 'antd'
import {
  UserOutlined,
  HistoryOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function MyAccountPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: orders, isLoading: ordersLoading } =
    Api.order.findMany.useQuery({
      where: { userId: user?.id },
      include: { orderItems: { include: { product: true } } },
    })

  const { mutateAsync: reorder } = Api.cart.create.useMutation()

  const handleReorder = async (orderId: string) => {
    try {
      const order = orders?.find(o => o.id === orderId)
      if (order) {
        await reorder({
          data: {
            userId: user?.id,
            cartItems: {
              create: order.orderItems.map(item => ({
                quantity: item.quantity,
                customizationData: item.customizationData,
                productId: item.productId,
              })),
            },
          },
        })
        enqueueSnackbar('Items added to cart successfully', {
          variant: 'success',
        })
        router.push('/cart')
      }
    } catch (error) {
      enqueueSnackbar('Failed to reorder items', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>My Account</Title>
      <Text>Manage your account information and view your order history.</Text>

      <Card style={{ marginTop: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Title level={4}>
              <UserOutlined /> Account Information
            </Title>
            {user ? (
              <>
                <Text strong>Name:</Text> <Text>{user.name}</Text>
                <br />
                <Text strong>Email:</Text> <Text>{user.email}</Text>
              </>
            ) : (
              <Spin />
            )}
          </Col>
          <Col xs={24} sm={12}>
            <Title level={4}>
              <HistoryOutlined /> Order History
            </Title>
            {ordersLoading ? (
              <Spin />
            ) : (
              <List
                dataSource={orders}
                renderItem={order => (
                  <List.Item
                    actions={[
                      <Button
                        key="reorder"
                        icon={<ReloadOutlined />}
                        onClick={() => handleReorder(order.id)}
                      >
                        Reorder
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`Order #${order.id}`}
                      description={
                        <>
                          <Text>
                            Date:{' '}
                            {dayjs(order.dateCreated).format('MMMM D, YYYY')}
                          </Text>
                          <br />
                          <Text>Total: ${order.totalAmount}</Text>
                          <br />
                          <Text>Status: {order.status}</Text>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </Col>
        </Row>
      </Card>
    </PageLayout>
  )
}
