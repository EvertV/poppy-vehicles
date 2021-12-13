import { useMemo } from 'react';
import { Text, Box, Badge, Avatar, Flex, Divider, CloseButton } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { useStore } from 'store';

interface Props {
  vehicle: ServerVehicle
  noBorder?: boolean
  mb?: number
  p?: number
  isSelected?: boolean
  clickable?: boolean
}

const Vehicle = ({ vehicle, noBorder, mb, p, isSelected, clickable }: Props) => {
  const setSelectedVehicle = useStore((state: Store) => state.setSelectedVehicle)

  const InnerVehicle = () => useMemo(() => (
    <Flex
      maxW='sm'
      bgColor={isSelected ? 'whitesmoke' : 'white'}
      borderWidth={noBorder ? '0' : isSelected ? '2px' : '1px'}
      borderRadius='lg'
      overflow='hidden'
      mb={mb}
      p={p}
      css={css`position: relative;`}
    >
      <Flex direction='column' align='center'>
        <Avatar
          bg={vehicle.model.type === 'car' ? 'red.500' : 'blue.500'}
          name={vehicle.model.type}
          src={`/icons/${vehicle.model.type}.svg`}
          p={3}
          mb={1} />
      </Flex>
      <Box ml={3}>
        <Text as="div" fontWeight='bold' fontSize='lg'>
          <span css={css`text-transform: capitalize;`}>{vehicle.model.energy}</span> {vehicle.model.type}
          <Badge ml='1' colorScheme={vehicle.model.type === 'car' ? 'red' : 'blue'}>{vehicle.name}</Badge>
        </Text>
        <Text as="div" fontSize='sm'>
          <span css={css`text-transform: capitalize;`}>{vehicle.model.gearbox}</span>,  {`${vehicle.autonomy} km left`}
        </Text>
        {(isSelected) && <CloseButton
          size='sm'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedVehicle(undefined);
          }}
          css={css`
            position: absolute;
            top: 0;
            right: 0;
            margin: 4px;
          `}
        />}
      </Box>
    </Flex>), []);

  return (
    <>
      {clickable ? (
        <Box onClick={() => setSelectedVehicle(vehicle)} cursor={!isSelected ? 'pointer' : 'default'}
          css={css`
          z-index: 1;
            &:hover > div {
              background-color: whitesmoke;
            }`}
        >
          <InnerVehicle />
        </Box>
      ) :
        <InnerVehicle />
      }
      {isSelected && <Divider mb={4} />}
    </>
  )
};

export default Vehicle;
