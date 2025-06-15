import React from 'react'
import { Flex,Avatar } from '@radix-ui/themes'
import { getInitials } from '../constants/index'

export default function CustomAvatar({name}) {
  return (
  <Flex gap="2">
	<Avatar fallback={getInitials(name || '')}  size='5' variant='soft' color='indigo' radius='full'/>
  </Flex>

  )
}
