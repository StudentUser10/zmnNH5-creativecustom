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

  const { data: existingCart, error: cartError } = Api.cart.findFirst.useQuery({
    where: { userId: user?.id },
  }, {
    enabled: !!user
  })

  const { mutateAsync: createCartItem } = Api.cartItem.create.useMutation()

  useEffect(() => {
    if (product && typeof product.imageUrl === 'string') {
      setPreviewUrl(product.imageUrl)
    }
    if (cartError) {
      console.error('Error fetching cart:', cartError)
      enqueueSnackbar('Failed to fetch cart', { variant: 'error' })
    }
  }, [product, cartError])

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const { url } = await upload({ file })
        setUploadedImage(url)
        setPreviewUrl(url)
        enqueueSnackbar('Image uploaded successfully', { variant: 'success' })
      } catch (error) {
        enqueueSnackbar('Failed to upload image', { variant: 'error' })
      }
    }
  }

  const handleSaveDesign = async () => {
    if (!user) {
      enqueueSnackbar('Please log in to save your design', { variant: 'info' })
      return
    }

    if (!existingCart) {
      enqueueSnackbar('Cart not found', { variant: 'error' })
      return
    }

    try {
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
          cartId: existingCart.id,
        },
      })

      enqueueSnackbar('Design saved to cart', { variant: 'success' })
      router.push('/cart')
    } catch (error) {
      console.error('Error saving design:', error)
      enqueueSnackbar('Failed to save design', { variant: 'error' })
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Text>Loading...</Text>
      </PageLayout>
    )
  }

  if (!product) {
    return (
      <PageLayout layout="narrow">
        <Text>Product not found</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Customize Your Product</Title>
        <Text>Personalize {product.name} with your own design</Text>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="Customization Options">
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                <Input
                  prefix={<EditOutlined />}
                  placeholder="Add custom text"
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
                  Upload Image
                </Button>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={handleSaveDesign}
                >
                  Save Design
                </Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Preview">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '100%',
                }}
              >
                <img
                  src={previewUrl}
                  alt="Product Preview"
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
