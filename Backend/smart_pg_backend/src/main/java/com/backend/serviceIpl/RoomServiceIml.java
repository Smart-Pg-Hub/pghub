package com.backend.serviceIpl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.customException.ResourceNotFoundException;
import com.backend.dto.req.AddRoomReq;

import com.backend.dto.response.RoomResp;
import com.backend.entity.Property;
import com.backend.entity.Room;
import com.backend.repository.PropertyRepository;
import com.backend.repository.RoomRepository;
import com.backend.service.RoomService;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor 
@Service
@Transactional
public class RoomServiceIml implements RoomService {
	
	private final RoomRepository roomRepo;
	private final PropertyRepository propRepo;
	private final ModelMapper mapper;
	
	
	@Override
	public RoomResp addRoom(AddRoomReq request) {

	    // Find Property
	    Property prop = propRepo.findById(request.getPgId())
	            .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

	    // Map DTO to Entity
	    Room room = mapper.map(request, Room.class);

	    // Set relationship
	    room.setPgProperty(prop);

	    // Increase room count
	    prop.setTotalRooms(prop.getTotalRooms() + 1);

	    // Maintain both sides of the relationship
	    prop.getPgRooms().add(room);

	    // Save room
	    Room savedRoom = roomRepo.save(room);

	    // Return the saved room
	    return mapper.map(savedRoom, RoomResp.class);
	}

  
	@Override
	public RoomResp getById(Long id) {
		
		Room entity=roomRepo.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("RoomController not Found"));
		System.err.println(entity);
		
		return mapper.map(entity,RoomResp.class); 
	}


	@Override
	public List<RoomResp> getAll(Long pgid) {

	    List<Room> rooms = roomRepo.findAllByPgPropertyId(pgid);

	    if(rooms.isEmpty()) {
	        throw new ResourceNotFoundException("No rooms found for this PG");
	    }
	    


	    return rooms.stream().map(room -> mapper.map(room, RoomResp.class)).toList();

	}
} 
