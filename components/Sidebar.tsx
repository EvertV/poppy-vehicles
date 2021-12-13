import { useEffect, useState, useMemo } from "react";
import { Checkbox, CheckboxGroup, HStack, Heading, Box, Button, Alert, AlertIcon, Text, AlertTitle, AlertDescription } from '@chakra-ui/react'
import Vehicle from '@/components/Vehicle';
import { useStore } from 'store';
import shallow from 'zustand/shallow';

const INITIAL_DISPLAY_AMOUNT = 10;

const Sidebar = () => {
  const { vehicles: filteredVehicles, selectedVehicle, setFilters, filters } = useStore(state => (state), shallow);

  const [displayVehicles, setDisplayVehicles] = useState<ServerVehicle[] | undefined>(filteredVehicles);
  const [displayAmount, setDisplayAmount] = useState<number>(INITIAL_DISPLAY_AMOUNT);
  const totalAmount = useMemo(() => filteredVehicles?.length || 0, [filteredVehicles]);

  useEffect(() => {
    setDisplayAmount(INITIAL_DISPLAY_AMOUNT);
  }, [filteredVehicles])

  useEffect(() => {
    const vehicles = filteredVehicles?.filter(v => selectedVehicle?.uuid !== v.uuid).slice(0, displayAmount);
    if (selectedVehicle) {
      vehicles?.unshift(selectedVehicle)
    }
    setDisplayVehicles(vehicles)
  }, [filteredVehicles, displayAmount, selectedVehicle])

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
        defaultValue={filters}
        onChange={value => setFilters(value.map(v => v.toString()))}>
        <HStack>
          {['car', 'step', 'scooter'].map((v: string) => (
            <Checkbox key={v} value={v}>
              <Text casing="capitalize">{v}</Text>
            </Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>
      <Heading as='h2' size='md' my={4}>
        Visible vehicle{filteredVehicles?.length !== 1 && 's'} ({filteredVehicles?.length})
      </Heading>
      {displayVehicles?.map((vehicle: ServerVehicle) => (
        <Vehicle
          key={vehicle.uuid}
          vehicle={vehicle}
          isSelected={selectedVehicle && (selectedVehicle.uuid === vehicle.uuid)}
        />
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
