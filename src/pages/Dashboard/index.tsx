import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  Card,
  Flex,
  FormLabel,
  Input,
  Select,
  Text,
  useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
import { RModal } from '../../components'
import { PageWrap } from '../../layout'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

const Dashboard = () => {
  const toast = useToast()
  const [search, setSearch] = useState('')

  const [users, setUsers] = useState<any[]>([])
  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [gender, setGender] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [addressNumber, setAddressNumber] = useState('')
  const [addressStreet, setAddressStreet] = useState('')
  const [addressSuburb, setAddressSuburb] = useState('')
  const [addressPostalCode, setAddressPostalCode] = useState('')

  const [showAddUser, setShowAddUser] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const getUsers = async (offset: number) => {
    try {
      const { data } = await axios.get(`http://localhost:4000/get-users?offset=${offset}`)
      setUsers(data.users)
      setPages(data.pages)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error'
      })
    }
  }

  useEffect(() => {
    getUsers(0)
  }, [])

  const TABLE_HEADERS = ['User', 'ID Number', 'Date of Birth', 'Age', 'Gender']

  const onRowClick = (user: any) => {
    setUserId(user.id)
    setUserName(user.user)
    setContactNumber(user.contactNumber)
    setContactEmail(user.contactEmail)
    setAddressNumber(user.addressNumber)
    setAddressStreet(user.addressStreet)
    setAddressSuburb(user.addressSuburb)
    setAddressPostalCode(user.addressPostalCode)
  }

  const onUpdateUser = async () => {
    try {
      await axios.post('http://localhost:4000/update-user', {
        id: userId,
        contactNumber,
        contactEmail,
        addressNumber,
        addressStreet,
        addressSuburb,
        addressPostalCode
      })
      setIsAlertOpen(true)
      getUsers(0)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error'
      })
    }
  }

  const onCreateUser = async () => {
    try {
      await axios.post('http://localhost:4000/add-user', {
        userName,
        idNumber,
        gender
      })
      setUserName('')
      setIdNumber('')
      setGender('')
      setShowAddUser(false)
      toast({
        title: 'Success',
        description: 'User added successfully',
        status: 'success'
      })
      getUsers(0)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error'
      })
    }
  }

  const onSearch = async () => {
    try {
      const { data } = await axios.post('http://localhost:4000/search-users', {
        search
      })
      setUsers(data)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error'
      })
    }
  }

  const onGetNextPage = (page: number) => {
    let offset = 0
    if (page === 1) {
      offset = 0
    } else {
      offset = (page - 1) * 5
    }
    setCurrentPage(page)
    getUsers(offset)
  }

  return (
    <PageWrap title="Home" paddingTop={10}>
      <Flex marginBottom={5} justifyContent="space-between" width="100%">
        <Flex
          flexDirection="row"
          alignItems="center"
          alignSelf="flex-start"
          borderWidth={1}
          borderRadius={10}
          height="40px"
        >
          <Input
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            placeholder="Search..."
            borderWidth={0}
          />
          <Flex
            borderWidth={1}
            borderEndRadius={10}
            height="100%"
            alignItems="center"
            paddingLeft={1}
            paddingRight={1}
            onClick={onSearch}
            cursor="pointer"
          >
            <Text>Search</Text>
          </Flex>
        </Flex>
        <Button onClick={() => setShowAddUser(true)}>Add User</Button>
      </Flex>
      <Card width="100%" height={400}>
        <TableHeader columns={TABLE_HEADERS} />
        {users?.map((user) => (
          <TableRow
            selected={userId === user.id}
            key={user?.id}
            user={user}
            onClick={() => onRowClick(user)}
          />
        ))}
      </Card>
      <Flex>
        <Button leftIcon={<AiOutlineDoubleLeft />} />
        {Array.from(Array(pages).keys()).map((page) => (
          <Button
            backgroundColor={currentPage === page + 1 ? 'blue.700' : undefined}
            onClick={() => onGetNextPage(page + 1)}
            key={page}
          >
            {page + 1}
          </Button>
        ))}
        <Button leftIcon={<AiOutlineDoubleRight />} />
      </Flex>
      <Flex width="100%" justifyContent="space-between" paddingTop={10}>
        <Card width="45%" height={400}>
          <Flex
            backgroundColor="black"
            alignItems="center"
            height={10}
            paddingLeft={5}
            borderTopRadius={10}
          >
            <Text textAlign="center">Contact Details</Text>
          </Flex>
          <Flex paddingLeft={5} marginTop={5}>
            <Flex flexDirection="column" width="30%">
              <Flex height={45} alignItems="center" marginBottom={5}>
                <Text>Contact Number</Text>
              </Flex>
              <Flex height={45} alignItems="center">
                <Text>Email Address</Text>
              </Flex>
            </Flex>
            <Flex flexDirection="column" width="50%">
              <Input
                value={contactNumber}
                onChange={({ target }) => setContactNumber(target.value)}
                marginBottom={5}
                height={45}
              />
              <Input
                value={contactEmail}
                onChange={({ target }) => setContactEmail(target.value)}
                height={45}
              />
            </Flex>
          </Flex>
        </Card>
        <Flex width="45%" flexDirection="column">
          <Card width="100%" height={400}>
            <Flex
              backgroundColor="black"
              alignItems="center"
              height={10}
              paddingLeft={5}
              borderTopRadius={10}
            >
              <Text textAlign="center">Address Details</Text>
            </Flex>
            <Flex paddingLeft={5} marginTop={5}>
              <Flex flexDirection="column" width="35%">
                <Flex height={45} alignItems="center" marginBottom={5}>
                  <Text>Unit / Street Number</Text>
                </Flex>
                <Flex height={45} alignItems="center" marginBottom={5}>
                  <Text>Street Name</Text>
                </Flex>
                <Flex height={45} alignItems="center" marginBottom={5}>
                  <Text>Suburg</Text>
                </Flex>
                <Flex height={45} alignItems="center">
                  <Text>Postal Code</Text>
                </Flex>
              </Flex>
              <Flex flexDirection="column" width="50%">
                <Input
                  value={addressNumber}
                  onChange={({ target }) => setAddressNumber(target.value)}
                  marginBottom={5}
                  height={45}
                />
                <Input
                  value={addressStreet}
                  onChange={({ target }) => setAddressStreet(target.value)}
                  marginBottom={5}
                  height={45}
                />
                <Input
                  value={addressSuburb}
                  onChange={({ target }) => setAddressSuburb(target.value)}
                  marginBottom={5}
                  height={45}
                />
                <Input
                  value={addressPostalCode}
                  onChange={({ target }) => setAddressPostalCode(target.value)}
                  marginBottom={5}
                  height={45}
                />
              </Flex>
            </Flex>
          </Card>
          <Button
            onClick={() => {
              if (userId) {
                onUpdateUser()
              }
            }}
            marginTop={5}
            alignSelf="flex-end"
            width={120}
          >
            Save
          </Button>
        </Flex>
      </Flex>
      <RModal isOpen={showAddUser} onClose={() => setShowAddUser(true)}>
        <Flex flexDirection="column">
          <Text fontSize={25} textAlign="center">
            Add User
          </Text>
          <Flex flexDirection="column">
            <FormLabel>Full Name *</FormLabel>
            <Input
              value={userName}
              onChange={({ target }) => setUserName(target.value)}
              marginBottom={5}
            />
            <FormLabel>ID Number *</FormLabel>
            <Input
              type="number"
              value={idNumber}
              onChange={({ target }) => setIdNumber(target.value)}
              marginBottom={5}
            />
            <FormLabel>Gender *</FormLabel>
            <Select marginBottom={5} onChange={({ target }) => setGender(target.value)}>
              <option disabled>Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </Select>
          </Flex>
          <Flex justifyContent="space-between">
            <Button onClick={() => setShowAddUser(false)} width="150px">
              Close
            </Button>
            <Button onClick={onCreateUser} width="150px">
              Save
            </Button>
          </Flex>
        </Flex>
      </RModal>
      <AlertDialog
        isOpen={isAlertOpen}
        //@ts-expect-error
        leastDestructiveRef={console.log}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody marginTop="40px">
              {userName} details saved successfuly.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setIsAlertOpen(false)} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </PageWrap>
  )
}

export default Dashboard
