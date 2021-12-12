import { useEffect, useState, useMemo } from "react";
import { Checkbox, CheckboxGroup, HStack, Heading, Box, Button, Alert, AlertIcon, Text, AlertTitle, AlertDescription } from '@chakra-ui/react'
import Vehicle from '@/components/Vehicle';

const INITIAL_DISPLAY_AMOUNT = 10;
interface Props {
  filteredVehicles?: ServerVehicle[]
  setVehicleUUID: (uuid: string) => void
  setModelFilter: (model: string[]) => void
  modelFilter: string[]
  vehicleUUID?: string
  hasSelection?: boolean
}
const DisplayVehicles = ({ filteredVehicles, vehicleUUID, modelFilter, setModelFilter, hasSelection }: Props) => {
  const [displayAmount, setDisplayAmount] = useState<number>(INITIAL_DISPLAY_AMOUNT);
  const totalAmount = useMemo(() => filteredVehicles?.length || 0, [filteredVehicles]);
  const selectedVehicle = useMemo(() => filteredVehicles?.find(v => v.uuid === vehicleUUID), [vehicleUUID, filteredVehicles]);
  useEffect(() => {
    setDisplayAmount(INITIAL_DISPLAY_AMOUNT);
  }, [filteredVehicles])

  return (
    <>
      <Heading as='h2' size='md' mb={4}>
        Filter
      </Heading>
      <CheckboxGroup
        colorScheme='red'
        defaultValue={modelFilter}
        onChange={value => setModelFilter(value.map(v => v.toString()))}>
        <HStack>
          {['car', 'step', 'scooter'].map((v: string) => (
            <Checkbox key={v} value={v}>
              <Text casing="capitalize">{v}</Text>
            </Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>
      {selectedVehicle && (
        <Box maxW='sm' overflow='hidden' mt={4}>
          <Heading as='h2' size='md' mb={4}>
            Selected vehicle
          </Heading>
          <Vehicle p={4} vehicle={selectedVehicle} mb={4} />
          <Alert status='info' borderRadius='lg'>
            <AlertIcon />
            <Box flex='1'>
              <AlertTitle>Zones changed</AlertTitle>
              <AlertDescription display='block'>
                Only operational area of this vehicle is now shown.
              </AlertDescription>
            </Box>
          </Alert>
        </Box>
      )}
      <Heading as='h2' size='md' my={4}>
        {hasSelection ? 'Selected vehicles' : 'All vehicles'} ({filteredVehicles?.length})
      </Heading>
      {filteredVehicles?.slice(0, displayAmount).map((vehicle: ServerVehicle) => (
        <Vehicle key={vehicle.uuid} vehicle={vehicle} mb={4} p={4} />
      ))}
      {totalAmount > displayAmount && (
        <Button onClick={() => setDisplayAmount(totalAmount)}>
          Show {totalAmount - INITIAL_DISPLAY_AMOUNT} more
        </Button>
      )}
    </>
  )
};

export default DisplayVehicles;
