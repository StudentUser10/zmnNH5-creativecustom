'use client'

import { useUserContext } from '@/core/context'
import { useUploadPublic } from '@/core/hooks/upload'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { EditOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  ColorPicker,
  Input,
  Row,
  Space,
  Typography,
} from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
const { Title, Text } = Typography

export default function DesignEditorPage() {
  const router = useRouter()
  const params = useParams<{ productId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync: upload } = useUploadPublic()

  const [customText, setCustomText] = useState('')
  const [customColor, setCustomColor] = useState('#000000')
  const [uploadedImage, setUploadedImage] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')

  const { data: product, isLoading } = Api.product.findUnique.useQuery({
    where: { id: params.productId },
  })

  const { data: existingCart, error: cartError, refetch: refetchCart } = Api.cart.findFirst.useQuery({
    where: { userId: user?.id },
  }, {
    enabled: !!user
  })

  const { mutateAsync: createCartItem } = Api.cartItem.create.useMutation()
  const { mutateAsync: createCart } = Api.cart.create.useMutation()

  useEffect(() => {
    if (product && typeof product.imageUrl === 'string') {
      setPreviewUrl(product.imageUrl)
    }
    if (cartError) {
      console.error('Error fetching cart:', cartError)
      enqueueSnackbar('Failed to fetch cart', { variant: 'error' })
    }
  }, [product, cartError])

  useEffect(() => {
    const ensureCartExists = async () => {
      if (user && !existingCart && !cartError) {
        try {
          await createCart({ data: { userId: user.id } })
          await refetchCart()
        } catch (error) {
          console.error('Error creating cart:', error)
          enqueueSnackbar('Failed to create cart', { variant: 'error' })
        }
      }
    }
    ensureCartExists()
  }, [user, existingCart, cartError, createCart, refetchCart])

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const { url } = await upload({ file })
        setUploadedImage(url)
        setPreviewUrl(url)
      enqueueSnackbar('Imagem carregada com sucesso', { variant: 'success' })
      } catch (error) {
        enqueueSnackbar('Falha ao carregar imagem', { variant: 'error' })
      }
    }
  }

  const handleSaveDesign = async () => {
    if (!user) {
      enqueueSnackbar('Por favor, faça login para salvar seu design', { variant: 'info' })
      return
    }

    try {
      let cart = existingCart
      if (!cart) {
        cart = await createCart({ data: { userId: user.id } })
        await refetchCart()
      }

      const customizationData = JSON.stringify({
        text: customText,
        color: customColor,
        image: uploadedImage,
      })

      await createCartItem({
        data: {
          quantity: 1,
          customizationData,
          productId: params.productId,
          cartId: cart.id,
        },
      })

      enqueueSnackbar('Design salvo no carrinho', { variant: 'success' })
      router.push('/cart')
    } catch (error) {
      console.error('Error saving design:', error)
      if (error instanceof Error) {
        enqueueSnackbar(`Falha ao salvar o design: ${error.message}`, { variant: 'error' })
      } else {
        enqueueSnackbar('Falha ao salvar o design', { variant: 'error' })
      }
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Text>Carregando...</Text>
      </PageLayout>
    )
  }

  if (!product) {
    return (
      <PageLayout layout="narrow">
        <Text>Produto não encontrado</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Personalize Seu Produto</Title>
        <Text>Personalize {product.name} com seu próprio design</Text>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="Opções de Personalização">
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                <Input
                  prefix={<EditOutlined />}
                  placeholder="Adicione texto personalizado"
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                />
                <ColorPicker
                  value={customColor}
                  onChange={color => setCustomColor(color.toHexString())}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <Button
                  icon={<UploadOutlined />}
                  onClick={() =>
                    document.getElementById('image-upload')?.click()
                  }
                >
                  Carregar Imagem
                </Button>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={handleSaveDesign}
                >
                  Salvar Design
                </Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Visualização">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '100%',
                }}
              >
                <img
                  src={previewUrl}
                  alt="Visualização do Produto"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: customColor,
                    fontSize: '20px',
                    textAlign: 'center',
                    maxWidth: '80%',
                    wordWrap: 'break-word',
                  }}
                >
                  {customText}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Space>
    </PageLayout>
  )
}
