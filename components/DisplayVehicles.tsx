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
}
const Sidebar = ({ filteredVehicles, vehicleUUID, modelFilter, setModelFilter }: Props) => {
  const [displayAmount, setDisplayAmount] = useState<number>(INITIAL_DISPLAY_AMOUNT);
  const totalAmount = useMemo(() => filteredVehicles?.length || 0, [filteredVehicles]);
  const selectedVehicle = useMemo(() => filteredVehicles?.find(v => v.uuid === vehicleUUID), [vehicleUUID, filteredVehicles]);
  useEffect(() => {
    setDisplayAmount(INITIAL_DISPLAY_AMOUNT);
  }, [filteredVehicles])

  return (
    <>
      {selectedVehicle && (
        <Alert status='info' borderRadius='lg' mb={4}>
          <AlertIcon />
          <Box flex='1'>
            <AlertTitle>Zones changed</AlertTitle>
            <AlertDescription display='block'>
              Only the operational area of this vehicle is shown.
            </AlertDescription>
          </Box>
        </Alert>
      )}
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
          <Vehicle p={4} vehicle={selectedVehicle} />
        </Box>
      )}
      <Heading as='h2' size='md' my={4}>
        Visible vehicle{filteredVehicles?.length !== 1 && 's'} ({filteredVehicles?.length})
      </Heading>
      {filteredVehicles?.slice(0, displayAmount).map((vehicle: ServerVehicle) => (
        <Vehicle key={vehicle.uuid} vehicle={vehicle} mb={4} p={4} onClick={(vehicle) => console.log(vehicle)} />
      ))}
      {totalAmount > displayAmount && (
        <Button onClick={() => setDisplayAmount(totalAmount)}>
          Show {totalAmount - INITIAL_DISPLAY_AMOUNT} more
        </Button>
      )}
    </>
  )
};

export default Sidebar;
