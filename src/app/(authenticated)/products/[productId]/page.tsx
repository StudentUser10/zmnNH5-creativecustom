'use client'

import { Typography, Card, Image, Button, Spin, Row, Col } from 'antd'
import { ShoppingCartOutlined, EditOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ProductDetailsPage() {
  const router = useRouter()
  const params = useParams<{ productId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: product, isLoading } = Api.product.findUnique.useQuery({
    where: { id: params.productId },
  })

  const { data: userCart } = Api.cart.findFirst.useQuery({
    where: { userId: user?.id },
  })

  const { mutateAsync: createCart } = Api.cart.create.useMutation()
  const { mutateAsync: createCartItem } = Api.cartItem.create.useMutation()

  const handleCustomize = () => {
    router.push(`/design/${params.productId}`)
  }

  const handleAddToCart = async () => {
    try {
      let cartId = userCart?.id

      if (!cartId) {
        const newCart = await createCart({ data: { userId: user?.id } })
        cartId = newCart.id
      }

      await createCartItem({
        data: {
          cartId,
          productId: params.productId,
          quantity: 1,
        },
      })

      enqueueSnackbar('Product added to cart successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to add product to cart', { variant: 'error' })
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!product) {
    return (
      <PageLayout layout="narrow">
        <Title level={2}>Product Not Found</Title>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Product Details</Title>
      <Paragraph>View detailed information about this product</Paragraph>

      <Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Image
              src={product.imageUrl || 'https://placehold.co/400'}
              alt={product.name || 'Product Image'}
              style={{ width: '100%', height: 'auto' }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Title level={3}>{product.name}</Title>
            <Paragraph>{product.description}</Paragraph>
            <Text strong>Price: ${product.price}</Text>
            <br />
            <br />
            <br />
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleCustomize}
              style={{ marginRight: '10px' }}
            >
              Customize
            </Button>
            <Button icon={<ShoppingCartOutlined />} onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Card>
    </PageLayout>
  )
}
