import { Flex } from '@chakra-ui/react'
import { getAge, getDateOfBirth, returnGender } from '../../utils'

type Props = {
  user: any
  onClick: () => void
  selected?: boolean
}

const TableRow = ({ user, onClick, selected }: Props) => {
  return (
    <Flex
      padding={5}
      onClick={onClick}
      cursor="pointer"
      backgroundColor={selected ? 'blue.700' : undefined}
    >
      <Flex width="20%">{user.user}</Flex>
      <Flex width="20%">{user.idNumber}</Flex>
      <Flex width="20%">{getDateOfBirth(user.idNumber)}</Flex>
      <Flex width="20%">{getAge(user.idNumber)}</Flex>
      <Flex width="20%">{returnGender(user.gender)}</Flex>
    </Flex>
  )
}

export default TableRow
