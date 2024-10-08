'use client'

import { Typography, Row, Col, Card } from 'antd'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: featuredProducts, isLoading: productsLoading } =
    Api.product.findMany.useQuery({
      take: 4,
      orderBy: { dateCreated: 'desc' },
    })

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={1}>Bem-vindo à Nossa Loja Online</Title>
      <Paragraph>Descubra produtos incríveis!</Paragraph>

      <Title level={2} style={{ marginTop: '32px' }}>
        Produtos em Destaque
      </Title>
      <Row gutter={[16, 16]}>
        {productsLoading ? (
          <Col span={24}>Carregando produtos...</Col>
        ) : (
          featuredProducts?.map(product => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                onClick={() => handleProductClick(product.id)}
                cover={
                  <img
                    alt={product.name}
                    src={product.imageUrl || 'https://via.placeholder.com/300'}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                }
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <>
                      <Paragraph ellipsis={{ rows: 2 }}>
                        {product.description}
                      </Paragraph>
                      <Paragraph strong>Preço: R${product.price}</Paragraph>
                    </>
                  }
                />
              </Card>
            </Col>
          ))
        )}
      </Row>
    </PageLayout>
  )
}
