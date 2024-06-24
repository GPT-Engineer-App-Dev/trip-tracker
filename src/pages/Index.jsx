import React, { useState, useEffect } from "react";
import { Box, Button, Container, Flex, Heading, Input, Text, VStack, Image, useToast, Spinner, SimpleGrid, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FaPlane, FaCalendarAlt, FaSearch } from "react-icons/fa";

const Index = () => {
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const handleSearch = () => {
    if (destination && departureDate) {
      setIsLoading(true);
      // Simulating API call
      setTimeout(() => {
        const mockFlights = [
          { id: 1, airline: "AirEase", departure: "10:00 AM", arrival: "12:00 PM", price: "$299" },
          { id: 2, airline: "SkyHigh", departure: "2:00 PM", arrival: "4:00 PM", price: "$349" },
          { id: 3, airline: "JetStream", departure: "6:00 PM", arrival: "8:00 PM", price: "$279" },
        ];
        setFlights(mockFlights);
        setIsLoading(false);
        toast({
          title: "Search completed",
          description: `Found ${mockFlights.length} flights to ${destination} on ${departureDate}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }, 2000);
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleBookingConfirmation = () => {
    toast({
      title: "Booking Confirmed",
      description: `Your flight to ${destination} with ${selectedFlight.airline} has been booked.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setIsModalOpen(false);
  };

  const FlightCard = ({ flight }) => (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Heading size="md">{flight.airline}</Heading>
      <Text>Departure: {flight.departure}</Text>
      <Text>Arrival: {flight.arrival}</Text>
      <Text fontWeight="bold">Price: {flight.price}</Text>
      <Button 
        mt={2} 
        colorScheme="green" 
        onClick={() => {
          setSelectedFlight(flight);
          setIsModalOpen(true);
        }}
      >
        Book Now
      </Button>
    </Box>
  );

  return (
    <Box bgGradient="linear(to-r, blue.400, purple.500)" minHeight="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading color="white" fontSize="4xl">TravelEase</Heading>
            <Image src="/logo.png" alt="TravelEase Logo" boxSize="50px" />
          </Flex>
          
          <Box bg="white" borderRadius="xl" p={8} shadow="2xl">
            <VStack spacing={6}>
              <Heading size="lg" color="gray.700">Find Your Perfect Flight</Heading>
              
              <Flex width="100%" gap={4} flexDirection={{ base: "column", md: "row" }}>
                <Flex flex={1} alignItems="center">
                  <FaPlane color="gray.500" size="20px" />
                  <Input 
                    ml={2} 
                    placeholder="Where to?" 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </Flex>
                
                <Flex flex={1} alignItems="center">
                  <FaCalendarAlt color="gray.500" size="20px" />
                  <Input 
                    ml={2} 
                    type="date" 
                    value={departureDate} 
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </Flex>
                
                <Button 
                  leftIcon={<FaSearch />} 
                  colorScheme="blue" 
                  size="lg" 
                  onClick={handleSearch}
                  width={{ base: "100%", md: "auto" }}
                >
                  Search Flights
                </Button>
              </Flex>
            </VStack>
          </Box>

          {isLoading ? (
            <Flex justify="center" mt={8}>
              <Spinner size="xl" />
            </Flex>
          ) : flights.length > 0 ? (
            <Box mt={8}>
              <Heading size="md" mb={4}>Flight Search Results</Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                {flights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </SimpleGrid>
            </Box>
          ) : null}
          
          <Box bg="white" borderRadius="xl" p={8} shadow="2xl">
            <Heading size="md" mb={4} color="gray.700">Popular Destinations</Heading>
            <Flex justifyContent="space-between" flexWrap="wrap">
              {["Paris", "Tokyo", "New York", "Sydney"].map((city) => (
                <Box 
                  key={city} 
                  width={{ base: "100%", sm: "48%", md: "23%" }} 
                  mb={4} 
                  borderRadius="lg" 
                  overflow="hidden" 
                  shadow="md"
                >
                  <Image src={`/${city.toLowerCase()}.jpg`} alt={city} width="100%" height="150px" objectFit="cover" />
                  <Box p={3} bg="gray.50">
                    <Text fontWeight="bold">{city}</Text>
                  </Box>
                </Box>
              ))}
            </Flex>
          </Box>
        </VStack>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Booking</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedFlight && (
                <>
                  <Text>Airline: {selectedFlight.airline}</Text>
                  <Text>Departure: {selectedFlight.departure}</Text>
                  <Text>Arrival: {selectedFlight.arrival}</Text>
                  <Text>Price: {selectedFlight.price}</Text>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleBookingConfirmation}>
                Confirm Booking
              </Button>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
};

export default Index;