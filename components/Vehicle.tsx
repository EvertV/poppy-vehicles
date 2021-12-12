import { Text, Box, Badge, Avatar, Flex } from '@chakra-ui/react'
import { css } from '@emotion/react'

const Vehicle = ({ vehicle, noBorder, mb, p }: { vehicle: ServerVehicle, noBorder?: boolean, mb?: number, p?: number }) => (
  <Flex maxW='sm' borderWidth={noBorder ? '0' : '1px'} borderRadius='lg' overflow='hidden' mb={mb} p={p} cursor='default'>
    <Avatar bg={vehicle.model.type === 'car' ? 'red.500' : 'blue.500'} name={vehicle.model.type} src={`/${vehicle.model.type}.svg`} p={3} />
    <Box ml={3}>
      <Text as="div" fontWeight='bold' fontSize='lg'>
        <span css={css`text-transform: capitalize;`}>{vehicle.model.energy}</span> {vehicle.model.type}
        <Badge ml='1' variant='solid' colorScheme={vehicle.status === 'free' ? 'green' : 'red'} >
          {vehicle.status === 'free' ? 'Available' : vehicle.status}
        </Badge>
      </Text>
      <Text as="div" fontSize='sm'>
        <span css={css`text-transform: capitalize;`}>{vehicle.model.gearbox}</span>,  {`${vehicle.autonomy} km left`}
      </Text>
    </Box>
  </Flex>
);

export default Vehicle;
