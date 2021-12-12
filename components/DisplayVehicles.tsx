import { Checkbox, CheckboxGroup, HStack, Heading, Box, Button, Text, Badge, Flex, Spacer } from '@chakra-ui/react'

interface Props {
  filteredVehicles?: ServerVehicle[]
  setVehicleUUID: (uuid: string) => void
  setModelFilter: (model: string[]) => void
  modelFilter: string[]
  vehicleUUID?: string
}
const DisplayVehicles = ({ filteredVehicles, vehicleUUID, setVehicleUUID, modelFilter, setModelFilter }: Props) => (
  <>

    <Heading as='h2' size='md' mb={4}>
      Filter
    </Heading>
    <CheckboxGroup colorScheme='red' defaultValue={modelFilter} onChange={value => setModelFilter(value)}>
      <HStack>
        {['car', 'step', 'scooter'].map((v: string) => (
          <Checkbox key={v} value={v}>{v}</Checkbox>
        ))}
      </HStack>
    </CheckboxGroup>
    {vehicleUUID && (
      <Box maxW='sm' borderColor='red' borderWidth='2px' borderRadius='lg' overflow='hidden' mt={4} p={4}>
        <Text
          fontWeight='semibold'
          isTruncated>
          Vehicle {vehicleUUID}
        </Text>
        <Text as="i">
          Operational zone of this vehicle is now shown on the map.
        </Text>
        <Box mt={4}>
          <Button onClick={() => setVehicleUUID('')}>Reset vehicle</Button>
        </Box>
      </Box>
    )}
    <Heading as='h2' size='md' my={4}>
      List ({filteredVehicles?.length})
    </Heading>
    {filteredVehicles?.map(vehicle => {
      return (
        <Box key={vehicle.uuid} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' mb={4} p={4}>
          <Flex>
            <Box>
              <Heading as='h3' size='sm' mb={2}>
                {vehicle.model.type} {vehicle.name}
              </Heading>
            </Box>
            <Spacer />
            <Box>
              <Badge variant='solid' colorScheme={vehicle.status === 'free' ? 'green' : 'red'} >
                {vehicle.status === 'free' ? 'Available' : vehicle.status}
              </Badge>
            </Box>
          </Flex>
        </Box>
      )
    })}
  </>
);

export default DisplayVehicles;
