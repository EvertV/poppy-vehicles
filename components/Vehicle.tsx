import { Text, Box, Badge, Avatar, Flex, Code } from '@chakra-ui/react'
import { css } from '@emotion/react'

interface Props {
  vehicle: ServerVehicle
  noBorder?: boolean
  mb?: number
  p?: number
  onClick?: (vehicle: ServerVehicle) => void
}

const Vehicle = ({ vehicle, noBorder, mb, p, onClick }: Props) => {
  const innerVehicle = (<Flex maxW='sm' borderWidth={noBorder ? '0' : '1px'} borderRadius='lg' overflow='hidden' mb={mb} p={p}>
    <Flex direction='column' align='center'>
      <Avatar bg={vehicle.model.type === 'car' ? 'red.500' : 'blue.500'} name={vehicle.model.type} src={`/${vehicle.model.type}.svg`} p={3} mb={1} />
    </Flex>
    <Box ml={3}>
      <Text as="div" fontWeight='bold' fontSize='lg'>
        <span css={css`text-transform: capitalize;`}>{vehicle.model.energy}</span> {vehicle.model.type}
        {/* <Badge ml='1' variant='solid' colorScheme={vehicle.status === 'free' ? 'green' : 'red'} >
          {vehicle.status === 'free' ? 'Available' : vehicle.status}
        </Badge> */}
        <Badge ml='1' colorScheme={vehicle.model.type === 'car' ? 'red' : 'blue'}>{vehicle.name}</Badge>
      </Text>
      <Text as="div" fontSize='sm'>
        <span css={css`text-transform: capitalize;`}>{vehicle.model.gearbox}</span>,  {`${vehicle.autonomy} km left`}
      </Text>
    </Box>
  </Flex>);

  return (
    <>
      {!!onClick ? (
        <Box onClick={() => onClick(vehicle)} cursor='pointer'
          css={css`
          z-index: 1;
            &:hover > div {
              background-color: whitesmoke;
            }`}
        >
          {innerVehicle}
        </Box>) :
        (innerVehicle)}
    </>
  )
};

export default Vehicle;
