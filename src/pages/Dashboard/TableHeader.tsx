import { Flex } from '@chakra-ui/react'

type Props = {
  columns: string[]
}

const TableHeader = ({ columns }: Props) => {
  return (
    <Flex padding={5} backgroundColor="black">
      {columns.map((value, i) => (
        <Flex width={'20%'} key={i}>
          {value}
        </Flex>
      ))}
    </Flex>
  )
}

export default TableHeader
