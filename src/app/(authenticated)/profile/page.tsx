'use client'

import { Avatar, Button, Flex, Form, Input, Switch, Typography, Upload } from 'antd'

import { useUserContext } from '@/core/context'
import { Utility } from '@/core/helpers/utility'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useUploadPublic } from '@/core/hooks/upload'

export default function ProfilePage() {
  const { enqueueSnackbar } = useSnackbar()
  const { user, refetch: refetchUser } = useUserContext()

  const [form] = Form.useForm()

  const [isLoading, setLoading] = useState(false)
  const [isLoadingLogout, setLoadingLogout] = useState(false)
  const [imageUrl, setImageUrl] = useState(user.pictureUrl)

  const { mutateAsync: updateUser } = Api.user.update.useMutation()
  const { mutateAsync: upload } = useUploadPublic()

  useEffect(() => {
    form.setFieldsValue(user)
  }, [user])

  const handleSubmit = async (values: Partial<User>) => {
    setLoading(true)

    try {
      await updateUser({
        where: { id: user.id },
        data: {
          email: values.email,
          name: values.name,
          pictureUrl: imageUrl,
        },
      })

      refetchUser()
      enqueueSnackbar('Profile updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(`Could not save user: ${error.message}`, {
        variant: 'error',
      })
    }

    setLoading(false)
  }

  const handleImageUpload = async (info: any) => {
    const { status, originFileObj } = info.file
    if (status === 'done') {
      try {
        const { url } = await upload({ file: originFileObj })
        setImageUrl(url)
        enqueueSnackbar('Image uploaded successfully', { variant: 'success' })
      } catch (error) {
        enqueueSnackbar(`Failed to upload image: ${error.message}`, { variant: 'error' })
      }
    }
  }

  const handleClickLogout = async () => {
    setLoadingLogout(true)

    try {
      await signOut({ callbackUrl: '/login' })
    } catch (error) {
      enqueueSnackbar(`Could not logout: ${error.message}`, {
        variant: 'error',
      })

      setLoadingLogout(false)
    }
  }

  return (
    <PageLayout layout="super-narrow">
      <Flex justify="space-between" align="center">
        <Typography.Title level={1}>Profile</Typography.Title>
        <Button onClick={handleClickLogout} loading={isLoadingLogout}>
          Logout
        </Button>
      </Flex>

      <Flex justify="center" style={{ marginBottom: '30px' }}>
        <Avatar size={80} src={imageUrl}>
          {Utility.stringToInitials(user.name)}
        </Avatar>
      </Flex>

      <Form
        form={form}
        initialValues={user}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input type="email" placeholder="Your email" autoComplete="email" />
        </Form.Item>

        <Form.Item label="Profile picture" name="pictureUrl">
          <Upload
            accept="image/*"
            listType="picture-card"
            showUploadList={false}
            onChange={handleImageUpload}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <div>
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Flex justify="end">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Save
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
